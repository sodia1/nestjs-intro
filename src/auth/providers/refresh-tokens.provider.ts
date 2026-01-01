import { forwardRef, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import * as config from "@nestjs/config";
import { RefreshTokenDto } from "../dtos/refresh-token.dto";
import { JwtService } from "@nestjs/jwt";
import jwtConfig from "../config/jwt.config";
import { GenerateTokensProvider } from "./generate-tokens.provider";
import { UsersService } from "src/users/providers/users.service";

@Injectable()
export class RefreshTokenProvider {
    constructor(
        @Inject(forwardRef(() => UsersService))
        private readonly usersService: UsersService,
        
        private readonly jwtService: JwtService,
        
        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: config.ConfigType<typeof jwtConfig>,

        private readonly generateTokensProvider: GenerateTokensProvider
    ){}

    public async refreshTokens(refreshToken: RefreshTokenDto){
        try{
            const {sub} = await this.jwtService.verifyAsync(refreshToken.refreshToken, {
            secret: this.jwtConfiguration.secret,
            audience: this.jwtConfiguration.audience,
            issuer: this.jwtConfiguration.issuer
             });

            const user = await this.usersService.findOneById(sub);

            return await this.generateTokensProvider.generateToken(user);
        }catch(error){
            throw new UnauthorizedException(error);
        }
    }
}