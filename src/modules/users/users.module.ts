import { Module } from '@nestjs/common';
import { UserController } from './presentation/user.controller';
import { PrismaUserRepository } from './infrastructure/prisma-user.repository';
import { UserRepository } from './domain/user.repository';
import { RegisterUserUseCase } from './application/register-user.usecase';
import { FindUserByIdUseCase } from './application/find-user-by-id.usecase';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Module({
  controllers: [UserController],
  providers: [
    RegisterUserUseCase,
    FindUserByIdUseCase,

    { provide: 'IUserRepository', useClass: PrismaUserRepository },
    PrismaService,
  ],
  exports: ['IUserRepository', RegisterUserUseCase],
})
export class UsersModule { }
