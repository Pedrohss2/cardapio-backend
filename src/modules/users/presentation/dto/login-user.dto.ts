import { IsString, IsEmail } from 'class-validator';

export class LoginUserDto {
    constructor() { }
    @IsEmail()
    email: string;

    @IsString()
    password: string;
}