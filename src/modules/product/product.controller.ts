import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { get } from 'http';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {

    constructor(private productService: ProductService) { }

    @Post()
    async createProduct(@Body() data: any) {
        const product = await this.productService.create(data);
        return product;
    }

    @Get()
    async getProducts() {
        const products = await this.productService.findAll();
        return products;
    }

    @Get("/products/:id")
    async getProduct(@Param("id") id: number) {
        const product = await this.productService.findOne(id);

        return product;
    }

    @Put("/products/:id")
    async updateProduct(@Param("id") id: number, @Body() data: any) {
        const product = await this.productService.update(id, data);
        return product;
    }

    @Delete("/products/:id")
    async deleteProduct(@Param("id") id: number) {
        const product = await this.productService.remove(id);
        return product;
    }

}
