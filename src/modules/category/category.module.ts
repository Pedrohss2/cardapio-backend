import { Module } from '@nestjs/common';
import { CategoryController } from './presentation/category.controller';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateCategoryUseCase } from './application/usecases/create-category.usecase';
import { FindAllCategoryUseCase } from './application/usecases/find-all-category.usecase';
import { FindByIdCategoryUseCase } from './application/usecases/find-by-id-category.usecase';
import { UpdateCategoryUseCase } from './application/usecases/update-category.usecase';
import { DeleteCategoryUseCase } from './application/usecases/delete-category.usecase';
import { PrismaCategoryRepository } from './infrastructure/prisma-category.repository';

@Module({
  controllers: [CategoryController],
  providers: [
    PrismaService,
    CreateCategoryUseCase,
    FindAllCategoryUseCase,
    FindByIdCategoryUseCase,
    UpdateCategoryUseCase,
    DeleteCategoryUseCase,
    PrismaCategoryRepository,
    { provide: 'ICategoryRepository', useClass: PrismaCategoryRepository },
  ],
  exports: ['ICategoryRepository'],
})
export class CategoryModule { }
