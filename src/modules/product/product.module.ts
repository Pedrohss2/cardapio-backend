import { Module } from '@nestjs/common';
import { ProductController } from './presentation/product.controller';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateProductUseCase } from './application/usecases/create-product.usecase';
import { FindAllProductUseCase } from './application/usecases/find-all-product.usecase';
import { UpdateProductUseCase } from './application/usecases/update-product.usecase';
import { DeleteProductUseCase } from './application/usecases/delete-product.usecase';
import { PrismaProductRepository } from './infrastructure/prisma-product.repository';
import { PrismaCompanyRepository } from '../company/infrastructure/prisma-company.repository';
import { ImageService } from './infrastructure/image.service';
import { RedisCache } from './infrastructure/cache/redis.cache';


@Module({
  controllers: [ProductController],
  providers: [
    PrismaService,
    CreateProductUseCase,
    FindAllProductUseCase,
    UpdateProductUseCase,
    DeleteProductUseCase,
    ImageService,
    RedisCache,
    PrismaProductRepository,
    PrismaCompanyRepository,
    { provide: 'IProductRepository', useClass: PrismaProductRepository },
    { provide: 'ICompanyRepository', useClass: PrismaCompanyRepository },
    { provide: 'CachePort', useClass: RedisCache },
  ],
})
export class ProductModule { }
