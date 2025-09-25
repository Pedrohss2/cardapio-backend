import { PrismaService } from "src/common/prisma/prisma.service";
import { IProductRepository } from "../domain/product.repository";
import { Product } from "../domain/product.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaProductRepository implements IProductRepository {
    constructor(private prisma: PrismaService) { }

    async save(product: Product) {
        await this.prisma.product.create({
            data: product
        });
    }

    async findAll(): Promise<any> {
        return await this.prisma.product.findMany();
    }

    async findById(id: number): Promise<any> {
        return await this.prisma.product.findUnique({
            where: {
                id
            }
        });
    }

    async update(id: number, product: Product): Promise<any> {
        await this.prisma.product.update({
            where: {
                id
            },
            data: product
        });
    }

    async delete(id: number): Promise<any> {
        await this.prisma.product.delete({
            where: {
                id
            }
        });
    }

}