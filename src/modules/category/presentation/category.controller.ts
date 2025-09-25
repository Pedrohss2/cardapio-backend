import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Put,
    Delete,
    ParseIntPipe,
} from '@nestjs/common';

import { CreateCategoryUseCase } from '../application/create-category.usecase';
import { CreateCategorytDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
    constructor(private readonly createCategoryUseCase: CreateCategoryUseCase) { }

    @Post()
    create(@Body() body: CreateCategorytDto) {
        return this.createCategoryUseCase.execute(body);
    }

    @Get()
    findAll() {
        return this.createCategoryUseCase.executeFindAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.createCategoryUseCase.executeFindById(id);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() body: UpdateCategoryDto) {
        return this.createCategoryUseCase.executeUpdate(id, body);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.createCategoryUseCase.executeDelete(id);
    }
}