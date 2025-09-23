import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateCategorytDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {

    constructor(private prisma: PrismaService) { }

    async create(data: CreateCategorytDto) {
        return await this.prisma.category.create({ data });
    }

    async findAll() {
        return await this.prisma.category.findMany();
    }

    async findOne(id: number) {
        return await this.prisma.category.findUnique({
            where: { id },
        });
    }

    async update(id: number, data: any) {
        return await this.prisma.category.update({
            where: { id },
            data,
        });
    }

    async remove(id: number) {
        return await this.prisma.category.delete({
            where: { id },
        });
    }
}
