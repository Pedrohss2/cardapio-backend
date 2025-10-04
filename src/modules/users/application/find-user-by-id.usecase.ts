import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from '../domain/user.repository';
import { User } from '../domain/user.entity';

@Injectable()
export class FindUserByIdUseCase {
  constructor(private readonly userRepository: UserRepository) { }

  async execute(id: string): Promise<User | null> {

    if (!id) throw new HttpException({
      status: HttpStatus.BAD_REQUEST,
      error: 'Invalid id',
      message: 'O id informado é invalid.',
    }, HttpStatus.BAD_REQUEST);

    return this.userRepository.findById(id);
  }
}