import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './common/prisma/prisma.service';
import { ProductModule } from './modules/product/product.module';
import { CategoryModule } from './modules/category/category.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { CompanyModule } from './modules/company/company.module';
import { UserCompanyModule } from './modules/user-company/user-company.module';

@Module({
  imports: [ProductModule, CategoryModule, AuthModule, UsersModule, CompanyModule, UserCompanyModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule { }