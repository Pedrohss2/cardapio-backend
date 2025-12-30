import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateProductUseCase } from '../application/create-product.usecase';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes, ApiBody } from '@nestjs/swagger';

import { memoryStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path'

@ApiTags('Product')
@Controller('product')
export class ProductController {

    constructor(private readonly product: CreateProductUseCase) { }

    @Post()
    @ApiOperation({ summary: 'Create product' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                image: { type: 'string', format: 'binary' },
                name: { type: 'string' },
                price: { type: 'number' },
                description: { type: 'string' },
                categoryId: { type: 'string' },
                companyId: { type: 'string' },
            },
        },
    })

    @UseInterceptors(FileInterceptor('image', {
        storage: memoryStorage(),
    }))
    async createProduct(
        @UploadedFile() file: Express.Multer.File,
        @Body() data: CreateProductDto
    ) {
        await this.product.execute(data, file);
        return { message: 'Product created successfully' };
    }

    @Get()
    @ApiOperation({ summary: 'List products' })
    async getProducts() {
        const products = await this.product.executeFindAll();
        return products;
    }

    @Get('/products/:id')
    @ApiOperation({ summary: 'Get product by id' })
    async getProduct(@Param('id') id: string) {
        const product = await this.product.executeFindById(id);

        return product;
    }


    @Put('/products/:id')
    @ApiOperation({ summary: 'Update product' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                image: { type: 'string', format: 'binary' },
                name: { type: 'string' },
                price: { type: 'number' },
                description: { type: 'string' },
                categoryId: { type: 'string' },
                companyId: { type: 'string' },
            },
        },
    })
    @UseInterceptors(FileInterceptor('image', {
        storage: memoryStorage(),
    }))
    async updateProduct(
        @UploadedFile() file: Express.Multer.File,
        @Param('id') id: string,
        @Body() data: UpdateProductDto
    ) {
        await this.product.executeUpdate(id, data, file);
        return { message: 'Product updated successfully' };
    }

    @Delete('/products/:id')
    @ApiOperation({ summary: 'Delete product' })
    async deleteProduct(@Param('id') id: string) {
        const product = await this.product.executeDelete(id);
        return product;
    }

}
