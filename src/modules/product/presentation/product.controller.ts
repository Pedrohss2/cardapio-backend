import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateProductUseCase } from '../application/usecases/create-product.usecase';
import { FindAllProductUseCase } from '../application/usecases/find-all-product.usecase';
import { UpdateProductUseCase } from '../application/usecases/update-product.usecase';
import { DeleteProductUseCase } from '../application/usecases/delete-product.usecase';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { memoryStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';

@ApiTags('Product')
@Controller('product')
export class ProductController {

    constructor(
        private readonly createProduct: CreateProductUseCase,
        private readonly findAllProduct: FindAllProductUseCase,
        private readonly updateProduct: UpdateProductUseCase,
        private readonly deleteProduct: DeleteProductUseCase,
    ) { }

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
    async create(
        @UploadedFile() file: Express.Multer.File,
        @Body() data: CreateProductDto
    ) {
        await this.createProduct.execute(data, file);
        return { message: 'Product created successfully' };
    }

    @Get()
    @ApiOperation({ summary: 'List products' })
    async findAll() {
        const products = await this.findAllProduct.execute();
        return products;
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
    async update(
        @UploadedFile() file: Express.Multer.File,
        @Param('id') id: string,
        @Body() data: UpdateProductDto
    ) {
        await this.updateProduct.execute(id, data, file);
        return { message: 'Product updated successfully' };
    }

    @Delete('/products/:id')
    @ApiOperation({ summary: 'Delete product' })
    async delete(@Param('id') id: string) {
        await this.deleteProduct.execute(id);
        return { message: 'Product deleted successfully' };
    }

}
