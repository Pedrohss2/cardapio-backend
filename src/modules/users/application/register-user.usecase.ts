import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import type { UserRepository } from '../domain/user.repository';
import { User } from '../domain/user.entity';
import { RegisterUserDto } from '../presentation/dto/register-user.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RegisterUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: UserRepository
  ) { }

  async execute(userDto: RegisterUserDto): Promise<User> {

    if (!userDto.password || userDto.password.trim() === '') {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'Invalid password',
        message: 'A senha informada é invalida ou não existe.',
      }, HttpStatus.BAD_REQUEST)
    }

    const existingUser = await this.userRepository.findByEmail(userDto.email);
    if (existingUser) throw new HttpException({ status: HttpStatus.CONFLICT, error: 'Usuário já existe!' }, HttpStatus.CONFLICT);

    const user = new User(
      uuidv4(),
      userDto.name,
      userDto.email,
      userDto.password,
    );

    return this.userRepository.create(user);
  }


  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }
}