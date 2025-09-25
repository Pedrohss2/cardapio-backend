import { PrismaService } from "src/common/prisma/prisma.service";
import { ICategoryRepository } from "../domain/category.repository";
import { Category } from "../domain/category.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaCategoryRepository implements ICategoryRepository {
    constructor(private prisma: PrismaService) { }

    async save(category: Category) {
        await this.prisma.category.create({
            data: category
        });
    }

    async findAll(): Promise<any> {
        return await this.prisma.category.findMany();
    }

    async findById(id: number): Promise<any> {
        return await this.prisma.category.findUnique({
            where: {
                id
            }
        });
    }

    async update(id: number, category: Category): Promise<any> {
        await this.prisma.category.update({
            where: {
                id
            },
            data: category
        });
    }

    async delete(id: number): Promise<any> {
        await this.prisma.category.delete({
            where: {
                id
            }
        });
    }
}