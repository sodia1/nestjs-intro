import { Inject, Injectable ,RequestTimeoutException,UnauthorizedException,forwardRef} from "@nestjs/common";
import { SignInDto } from "../dtos/signin.dto";
import { UsersService } from "src/users/providers/users.service";
import { BcryptProvider } from "./bcrypt.provider";
import { HashingProvider } from "./hashing.provider";


@Injectable()
export class SignInProvider{
    constructor(
        @Inject(forwardRef(()=>UsersService))
        private readonly userService: UsersService,

        private readonly hashingProvider : HashingProvider,
    ){}

    public async signIn(signInDto: SignInDto){
        //Find the user using emailId
        //Throw an exception user not found
        let user = await this.userService.findOneByEmail(signInDto.email);
        //compare password to hash
        console.log("password:: ", signInDto.password);
        console.log("encrypt::: ", user.password);

        let isMatch: boolean = false;
        try{
            isMatch  = await this.hashingProvider.comparePassword(signInDto.password, user.password);
        }catch(error){
            throw new RequestTimeoutException(error, {
                description: "Could not match password"
            })
        }

        if(!isMatch){
            throw new UnauthorizedException("Incorrect Password");
        }
        
        
        //send confirmation
        return true;
    }
}