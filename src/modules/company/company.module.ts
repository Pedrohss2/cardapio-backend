import { Module } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CompanyController } from './presentation/company.controller';
import { CompanyUseCase } from './application/company.usecase';
import { PrismaCompanyRepository } from './infrastructure/prisma-company.repository';
import { UsersModule } from '../users/users.module';
import { UserCompanyModule } from '../user-company/user-company.module';

@Module({
  imports: [UsersModule, UserCompanyModule],
  controllers: [CompanyController],
  providers: [PrismaService, CompanyUseCase, PrismaCompanyRepository, { provide: 'ICompanyRepository', useClass: PrismaCompanyRepository }],
  exports: [CompanyUseCase, 'ICompanyRepository'],
})
export class CompanyModule { }
