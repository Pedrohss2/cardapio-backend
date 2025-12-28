import { Module } from '@nestjs/common';
import { ProductController } from './presentation/product.controller';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateProductUseCase } from './application/create-product.usecase';
import { PrismaProductRepository } from './infrastructure/prisma-product.repository';
import { PrismaCompanyRepository } from '../company/infrastructure/prisma-company.repository';


@Module({
  controllers: [ProductController],
  providers: [
    PrismaService,
    CreateProductUseCase,
    PrismaProductRepository,
    PrismaCompanyRepository,
    { provide: 'IProductRepository', useClass: PrismaProductRepository },
    { provide: 'ICompanyRepository', useClass: PrismaCompanyRepository },
  ],
})
export class ProductModule { }
