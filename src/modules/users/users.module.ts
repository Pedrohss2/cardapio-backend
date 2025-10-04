import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserController } from './presentation/user.controller';
import { PrismaUserRepository } from './infrastructure/prisma-user.repository';
import { UserRepository } from './domain/user.repository';
import { RegisterUserUseCase } from './application/register-user.usecase';
import { FindUserByIdUseCase } from './application/find-user-by-id.usecase';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Module({
  controllers: [UserController],
  providers: [
    UsersService,
    RegisterUserUseCase,
    FindUserByIdUseCase,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    PrismaService,
  ],
  exports: [UsersService, UserRepository],
})
export class UsersModule { }