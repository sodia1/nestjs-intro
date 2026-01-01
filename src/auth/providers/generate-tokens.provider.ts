import { Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import jwtConfig from "../config/jwt.config";
import * as config from "@nestjs/config";
import { User } from "src/users/user.entity";
import { email } from "@angular/forms/signals";
import { ActiveUserData } from "../interfaces/active-user-data.interface";

@Injectable()
export class GenerateTokensProvider{
    constructor(

        private readonly jwtService: JwtService,

        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: config.ConfigType<typeof jwtConfig>
    ){}

    public async signToken<T>(userId: number, expiresIn: number, payload?: T){
        await this.jwtService.signAsync(
            {
                sub: userId,
                ...payload
            },{
                audience: this.jwtConfiguration.audience,
                issuer: this.jwtConfiguration.issuer,
                secret: this.jwtConfiguration.secret,
                expiresIn,
            }
        )
    }

    public async generateToken(user: User){
        const [accessToken, refreshToken]= await Promise.all([
            //Generate access token
            await this.signToken<Partial<ActiveUserData>>(
            user.id,
            this.jwtConfiguration.accessTokenTtl,
            {
                email: user.email
            }),
            //Generate refresh token
            await this.signToken(
                user.id,
                this.jwtConfiguration.refreshTokenTtl
            )   
        ])

        return {accessToken, refreshToken};
        
    }
}