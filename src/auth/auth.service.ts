import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/modules/users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/modules/users/domain/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async signIn(
        email: string,
        pass: string,
    ): Promise<{ access_token: string }> {
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(pass, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { sub: user.id, email: user.email };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async register(
        name: string,
        email: string,
        password: string,
    ): Promise<{ access_token: string }> {
        const existingUser = await this.usersService.findByEmail(email);
        if (existingUser) {
            throw new HttpException({
                status: HttpStatus.CONFLICT,
                error: 'Usuário já existe',
                message: 'Usuário já existe.',
            }, HttpStatus.CONFLICT)
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await this.usersService.create(new User('', name, email, hashedPassword));

        const payload = { sub: user.id, email: user.email };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}