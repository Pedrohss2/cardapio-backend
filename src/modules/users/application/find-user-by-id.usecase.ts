import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import type { UserRepository } from '../domain/user.repository';
import { User } from '../domain/user.entity';
import { RegisterUserDto } from '../presentation/dto/register-user.dto';

@Injectable()
export class FindUserByIdUseCase {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: UserRepository
  ) { }

  async execute(id: string): Promise<RegisterUserDto | null> {

    if (!id) throw new HttpException({
      status: HttpStatus.BAD_REQUEST,
      error: 'Invalid id',
      message: 'O id informado é invalido.',
    }, HttpStatus.BAD_REQUEST);

    return this.userRepository.findById(id);
  }
}