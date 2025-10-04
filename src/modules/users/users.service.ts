import { Injectable } from '@nestjs/common';
import { UserRepository } from './domain/user.repository';
import { User } from './domain/user.entity';

@Injectable()
export class UsersService {
    constructor(private readonly userRepository: UserRepository) { }

    async findOne(id: string): Promise<User | null> {
        return this.userRepository.findById(id);
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.userRepository.findByEmail(email);
    }

    async create(user: User): Promise<User> {
        return this.userRepository.create(user);
    }
}