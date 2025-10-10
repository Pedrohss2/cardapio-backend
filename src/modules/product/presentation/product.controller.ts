import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { get } from 'http';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateProductUseCase } from '../application/create-product.usecase';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from 'src/auth/auth.guard';

import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path'

@Controller('product')
export class ProductController {

    constructor(private readonly product: CreateProductUseCase) { }

    @Post()
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
            },
        }),
    }))
    async createProduct(
        @UploadedFile() file: Express.Multer.File,
        @Body() data: CreateProductDto
    ) {

        if (file) data.image = file.filename;

        await this.product.execute(data);
        return { message: 'Product created successfully' };
    }

    @Get()
    async getProducts() {
        const products = await this.product.executeFindAll();
        return products;
    }

    @Get("/products/:id")
    async getProduct(@Param("id") id: string) {
        const product = await this.product.executeFindById(id);

        return product;
    }

    @Put("/products/:id")
    async updateProduct(@Param("id") id: string, @Body() data: UpdateProductDto) {
        const product = await this.product.executeUpdate(id, data);
        return product;
    }

    @Delete("/products/:id")
    async deleteProduct(@Param("id") id: string) {
        const product = await this.product.executeDelete(id);
        return product;
    }

}
