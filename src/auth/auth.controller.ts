import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from '../modules/users/presentation/dto/register-user.dto';
import { LoginUserDto } from '../modules/users/presentation/dto/login-user.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() loginUserDto: LoginUserDto) {
        return this.authService.signIn(loginUserDto);
    }

    @Post('register')
    register(@Body() registerUserDto: RegisterUserDto) {
        return this.authService.register(
            registerUserDto
        );
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() request) {
        return request.user;
    }
}