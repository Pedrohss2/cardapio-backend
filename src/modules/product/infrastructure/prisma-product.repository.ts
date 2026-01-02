import { PrismaService } from "src/common/prisma/prisma.service";
import { IProductRepository } from "../domain/product.repository";
import { Product } from "../domain/product.entity";
import { Inject, Injectable, Logger } from "@nestjs/common";
import type { CachePort } from '../application/ports/cache.port';

@Injectable()
export class PrismaProductRepository implements IProductRepository {
    constructor(
        private prisma: PrismaService,
        @Inject('CachePort')
        private cache: CachePort,
    ) { }

    async save(product: any): Promise<void> {
        const created = await this.prisma.product.create({
            data: product
        });

        await this.cache.del('products:all');
    }

    async findAll(): Promise<any> {
        const cached = await this.cache.get('products:all');
        if (cached) {
            Logger.log('Products found in cache, HIT');
            return cached;
        }

        const products = await this.prisma.product.findMany({
            include: {
                category: true
            }
        });

        await this.cache.set('products:all', products, 300);
        return products;
    }

    async findById(id: string): Promise<any> {
        const cached = await this.cache.get(`product:${id}`);
        if (cached) {
            Logger.log('Product found in cache, HIT');
            return cached;
        }

        const product = await this.prisma.product.findUnique({
            where: {
                id
            }
        });

        await this.cache.set(`product:${id}`, product, 300);
        return product;
    }

    async update(id: string, product: Product): Promise<any> {
        const updated = await this.prisma.product.update({
            where: { id },
            data: product
        });

        await this.cache.del(`product:${id}`);
        await this.cache.del('products:all');

        return updated;
    }

    async delete(id: string): Promise<any> {
        const deleted = await this.prisma.product.delete({
            where: { id }
        });

        await this.cache.del(`product:${id}`);
        await this.cache.del('products:all');

        return deleted;
    }

}