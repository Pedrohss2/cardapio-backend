import { Module } from '@nestjs/common';
import { ProductController } from './presentation/product.controller';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateProductUseCase } from './application/create-product.usecase';
import { PrismaProductRepository } from './infrastructure/prisma-product.repository';


@Module({
  controllers: [ProductController],
  providers: [
    PrismaService,
    CreateProductUseCase,
    PrismaProductRepository,
    { provide: 'IProductRepository', useClass: PrismaProductRepository },
  ],
})
export class ProductModule { }
