import { Module } from '@nestjs/common';
import { UserController } from './presentation/user.controller';
import { PrismaUserRepository } from './infrastructure/prisma-user.repository';
import { FindUserByIdUseCase } from './application/usecases/find-user-by-id.usecase';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { RegisterUserUseCase } from './application/usecases/register-user.usecase';

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
