import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { get } from 'http';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateProductUseCase } from '../application/create-product.usecase';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {

    constructor(private readonly product: CreateProductUseCase) { }

    @Post()
    async createProduct(@Body() data: CreateProductDto) {
        return this.product.execute(data);
    }

    @Get()
    async getProducts() {
        const products = await this.product.executeFindAll();
        return products;
    }

    @Get("/products/:id")
    async getProduct(@Param("id") id: number) {
        const product = await this.product.executeFindById(id);

        return product;
    }

    @Put("/products/:id")
    async updateProduct(@Param("id") id: number, @Body() data: UpdateProductDto) {
        const product = await this.product.executeUpdate(id, data);
        return product;
    }

    @Delete("/products/:id")
    async deleteProduct(@Param("id") id: number) {
        const product = await this.product.executeDelete(id);
        return product;
    }

}
