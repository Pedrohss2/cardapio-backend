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

import { CreateCategoryUseCase } from '../application/create-category.usecase';
import { CreateCategorytDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AuthGuard } from 'src/auth/auth.guard';

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
    @UseGuards(AuthGuard)
    findOne(@Param('id') id: string) {
        return this.createCategoryUseCase.executeFindById(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() body: UpdateCategoryDto) {
        return this.createCategoryUseCase.executeUpdate(id, body);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.createCategoryUseCase.executeDelete(id);
    }
}