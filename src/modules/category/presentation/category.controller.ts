import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Put,
    Delete,
    ParseIntPipe,
    UseGuards,
} from '@nestjs/common';

import { CreateCategoryUseCase } from '../application/usecases/create-category.usecase';
import { FindAllCategoryUseCase } from '../application/usecases/find-all-category.usecase';
import { FindByIdCategoryUseCase } from '../application/usecases/find-by-id-category.usecase';
import { UpdateCategoryUseCase } from '../application/usecases/update-category.usecase';
import { DeleteCategoryUseCase } from '../application/usecases/delete-category.usecase';
import { CreateCategorytDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@Controller('category')
export class CategoryController {
    constructor(
        private readonly createCategory: CreateCategoryUseCase,
        private readonly findAllCategory: FindAllCategoryUseCase,
        private readonly findByIdCategory: FindByIdCategoryUseCase,
        private readonly updateCategory: UpdateCategoryUseCase,
        private readonly deleteCategory: DeleteCategoryUseCase,
    ) { }

    @Post()
    @ApiOperation({ summary: 'Create category' })
    create(@Body() body: CreateCategorytDto) {
        return this.createCategory.execute(body);
    }

    @Get()
    @ApiOperation({ summary: 'List categories' })
    findAll() {
        return this.findAllCategory.execute();
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Get category by id' })
    findOne(@Param('id') id: string) {
        return this.findByIdCategory.execute(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update category' })
    update(@Param('id') id: string, @Body() body: UpdateCategoryDto) {
        return this.updateCategory.execute(id, body);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete category' })
    remove(@Param('id') id: string) {
        return this.deleteCategory.execute(id);
    }
}
