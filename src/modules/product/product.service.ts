import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
    constructor(private prisma: PrismaService) { }

    async create(data: CreateProductDto) {
        return await this.prisma.product.create({ data });
    }

    async findAll() {
        return await this.prisma.product.findMany({
            include: {
                category: {
                    select: {
                        name: true,
                    }
                },
            },
        });
    }

    async findOne(id: number) {
        return await this.prisma.product.findUnique({
            where: { id },
            include: {
                category: {
                    select: {
                        name: true,
                    }
                },
            },
        });
    }

    async update(id: number, data: UpdateProductDto) {
        return await this.prisma.product.update({
            where: { id },
            data,
        });
    }

    async remove(id: number) {
        return await this.prisma.product.delete({
            where: { id },
        });
    }
}
