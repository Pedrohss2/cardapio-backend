import { Module } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CompanyController } from './presentation/company.controller';
import { CreateCompanyUseCase } from './application/usecases/create-company.usecase';
import { FindAllCompanyUseCase } from './application/usecases/find-all-company.usecase';
import { FindByIdCompanyUseCase } from './application/usecases/find-by-id-company.usecase';
import { UpdateCompanyUseCase } from './application/usecases/update-company.usecase';
import { DeleteCompanyUseCase } from './application/usecases/delete-company.usecase';
import { PrismaCompanyRepository } from './infrastructure/prisma-company.repository';
import { UsersModule } from '../users/users.module';
import { UserCompanyModule } from '../user-company/user-company.module';

@Module({
  imports: [UsersModule, UserCompanyModule],
  controllers: [CompanyController],
  providers: [
    PrismaService,
    CreateCompanyUseCase,
    FindAllCompanyUseCase,
    FindByIdCompanyUseCase,
    UpdateCompanyUseCase,
    DeleteCompanyUseCase,
    PrismaCompanyRepository,
    { provide: 'ICompanyRepository', useClass: PrismaCompanyRepository },
  ],
  exports: ['ICompanyRepository'],
})
export class CompanyModule { }
