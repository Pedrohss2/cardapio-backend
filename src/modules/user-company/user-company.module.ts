import { Module } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { UserCompanyController } from './presentation/user-company.controller';
import { CreateUserCompanyUseCase } from './application/usecases/create-user-company.usecase';
import { FindAllUserCompanyUseCase } from './application/usecases/find-all-user-company.usecase';
import { FindByUserIdUserCompanyUseCase } from './application/usecases/find-by-user-id-user-company.usecase';
import { DeleteUserCompanyUseCase } from './application/usecases/delete-user-company.usecase';
import { PrismaUserCompanyRepository } from './infrastructure/prisma-user-company.repository';

@Module({
  controllers: [UserCompanyController],
  providers: [
    PrismaService,
    CreateUserCompanyUseCase,
    FindAllUserCompanyUseCase,
    FindByUserIdUserCompanyUseCase,
    DeleteUserCompanyUseCase,
    PrismaUserCompanyRepository,
    { provide: 'IUserCompanyRepository', useClass: PrismaUserCompanyRepository },
  ],
  exports: ['IUserCompanyRepository'],
})
export class UserCompanyModule { }
