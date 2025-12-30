import { IsString, IsEmail, IsOptional } from 'class-validator';

export class LoginUserDto {
    constructor() { }
    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsOptional()
    @IsString()
    companyId: string;
}