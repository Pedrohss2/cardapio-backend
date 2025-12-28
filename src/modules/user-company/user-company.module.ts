import { Module } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { UserCompanyController } from './presentation/user-company.controller';
import { UserCompanyUseCase } from './application/user-company.usecase';
import { PrismaUserCompanyRepository } from './infrastructure/prisma-user-company.repository';

@Module({
  controllers: [UserCompanyController],
  providers: [PrismaService, UserCompanyUseCase, PrismaUserCompanyRepository, { provide: 'IUserCompanyRepository', useClass: PrismaUserCompanyRepository }],
  exports: [UserCompanyUseCase, 'IUserCompanyRepository'],
})
export class UserCompanyModule {}
