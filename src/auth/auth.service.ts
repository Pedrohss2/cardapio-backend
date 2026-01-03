import { HttpException, HttpStatus, Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterUserUseCase } from '../modules/users/application/usecases/register-user.usecase';
import { User } from '../modules/users/domain/entity/user.entity';
import { RegisterUserDto } from 'src/modules/users/presentation/dto/register-user.dto';
import { LoginUserDto } from 'src/modules/users/presentation/dto/login-user.dto';
import type { UserCompanyRepository } from 'src/modules/user-company/domain/repository/user-company.repository';


@Injectable()
export class AuthService {
    constructor(
        private readonly registerUserUseCase: RegisterUserUseCase,
        private readonly jwtService: JwtService,
        @Inject('IUserCompanyRepository')
        private readonly userCompanyRepository: UserCompanyRepository,
    ) { }

    async signIn(
        loginUserDto: LoginUserDto
    ): Promise<{ access_token: string }> {
        const { email, password, companyId } = loginUserDto;

        const user = await this.registerUserUseCase.findByEmail(email);

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new HttpException({
                status: HttpStatus.UNAUTHORIZED,
                error: 'Email ou senha inválidos',
                message: 'Email ou senha inválidos',
            }, HttpStatus.UNAUTHORIZED)
        }

        let activeCompanyId: string | null = null;

        if (companyId) {
            const linked = await this.userCompanyRepository.findByUserAndCompany(user.id, companyId);
            if (!linked) {
                throw new HttpException({ status: HttpStatus.FORBIDDEN, error: 'User not linked to company' }, HttpStatus.FORBIDDEN);
            }
            activeCompanyId = companyId;
        } else {
            const links = await this.userCompanyRepository.findByUserId(user.id);
            if (links && links.length > 0) activeCompanyId = (links[0] as any).companyId;
        }

        const payload = { sub: user.id, email: user.email, companyId: activeCompanyId };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async register(
        registerUserDto: RegisterUserDto
    ): Promise<{ access_token: string }> {
        const { name, email, password } = registerUserDto;

        const existingUser = await this.registerUserUseCase.findByEmail(email);

        if (existingUser) {
            throw new HttpException({
                status: HttpStatus.CONFLICT,
                error: 'Usuário já existe',
                message: 'Usuário já possui um login',
            }, HttpStatus.CONFLICT)
        }

        const hashedPassword = await bcrypt.hash(registerUserDto.password, 10);

        const user = await this.registerUserUseCase.execute(new User('', name, email, hashedPassword));

        const payload = { sub: user.id, email: user.email };

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}