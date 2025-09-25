import { Module } from '@nestjs/common';
import { CategoryController } from './presentation/category.controller';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateCategoryUseCase } from './application/create-category.usecase';
import { PrismaCategoryRepository } from './infrastructure/prisma-category.repository';

@Module({
  controllers: [CategoryController],
  providers: [
    PrismaService,
    CreateCategoryUseCase,
    PrismaCategoryRepository,
    { provide: 'ICategoryRepository', useClass: PrismaCategoryRepository },
  ],
  exports: [CreateCategoryUseCase]
})
export class CategoryModule { }
