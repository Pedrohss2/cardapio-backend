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
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@Controller('category')
export class CategoryController {
    constructor(private readonly createCategoryUseCase: CreateCategoryUseCase) { }

    @Post()
    @ApiOperation({ summary: 'Create category' })
    create(@Body() body: CreateCategorytDto) {
        return this.createCategoryUseCase.execute(body);
    }

    @Get()
    @ApiOperation({ summary: 'List categories' })
    findAll() {
        return this.createCategoryUseCase.executeFindAll();
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Get category by id' })
    findOne(@Param('id') id: string) {
        return this.createCategoryUseCase.executeFindById(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update category' })
    update(@Param('id') id: string, @Body() body: UpdateCategoryDto) {
        return this.createCategoryUseCase.executeUpdate(id, body);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete category' })
    remove(@Param('id') id: string) {
        return this.createCategoryUseCase.executeDelete(id);
    }
}