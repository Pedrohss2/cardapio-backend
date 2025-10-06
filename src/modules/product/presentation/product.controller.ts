import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { get } from 'http';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateProductUseCase } from '../application/create-product.usecase';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('product')
export class ProductController {

    constructor(private readonly product: CreateProductUseCase) { }

    @Post()
    @UseGuards(AuthGuard)
    async createProduct(@Body() data: CreateProductDto) {
        return this.product.execute(data);
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
    @UseGuards(AuthGuard)
    async updateProduct(@Param("id") id: string, @Body() data: UpdateProductDto) {
        const product = await this.product.executeUpdate(id, data);
        return product;
    }

    @Delete("/products/:id")
    @UseGuards(AuthGuard)
    async deleteProduct(@Param("id") id: string) {
        const product = await this.product.executeDelete(id);
        return product;
    }

}
