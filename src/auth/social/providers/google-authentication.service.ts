import {  forwardRef, Inject, Injectable, OnModuleInit } from "@nestjs/common";
import * as config from "@nestjs/config";
import { IdTokenClient, OAuth2Client } from "google-auth-library";
import jwtConfig from "src/auth/config/jwt.config";
import { GoogleTokenDto } from "../dtos/google-token.dto";
import { UsersService } from "src/users/providers/users.service";
import { GenerateTokensProvider } from "src/auth/providers/generate-tokens.provider";

@Injectable()
export class GoogleAuthenticationService implements OnModuleInit{
    private oauthClient: OAuth2Client;

    constructor(
        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: config.ConfigType<typeof jwtConfig>,

        @Inject(forwardRef(() => UsersService))
        private readonly usersService: UsersService,

        private readonly generateTokenProvider: GenerateTokensProvider,
    ){}


    onModuleInit() {
        const clientId = this.jwtConfiguration.googleClientId;
        const clientSecret = this.jwtConfiguration.googleClientSecret;

        this.oauthClient = new OAuth2Client(clientId, clientSecret);
    }

    public async authentication(googleTokenDto: GoogleTokenDto){
        
        const loginTicket  = await this.oauthClient.verifyIdToken(
            {idToken: googleTokenDto.token}
        );

        const payload = loginTicket.getPayload();
        if (!payload) {
            throw new Error('Invalid token payload');
        }

        const { email, sub: googleId, given_name: firstName, family_name: lastName} = payload;

        if (!email || !googleId || !firstName || !lastName) {
            throw new Error('Invalid token payload: missing required fields');
        }

        const user = await this.usersService.findOneByGoogleId(googleId)

        if(user){
            return this.generateTokenProvider.generateToken(user);
        }

        const newUser = await this.usersService.createGoogleUser({
            email: email,
            firstName: firstName,
            lastName: lastName,
            googleId: googleId
        })

        return newUser;
    }
    
}