import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, Max, MaxLength, MinLength } from "class-validator";

export class CreateUserDto{
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(20)
    firstName: string;

    @IsString()
    @IsOptional()
    @MinLength(3)
    @MaxLength(20)
    lastName?: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @Matches(/(?:(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*)/, {message: 'password too weak'})
    password: string;
}