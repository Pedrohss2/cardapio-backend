import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import type { IProductRepository } from "../domain/product.repository";
import { CreateProductDto } from "../presentation/dto/create-product.dto";
import { Product } from "../domain/product.entity";

@Injectable()
export class CreateProductUseCase {
    constructor(
        @Inject('IProductRepository')
        private readonly repository: IProductRepository,
    ) { }

    async execute(data: any): Promise<void> {
        const product = await this.repository.save(data);
        return product;
    }

    async executeUpdate(id: number, data: any) {
        if (!id) throw new BadRequestException('Id is required');

        const product = await this.repository.update(id, data);
        return product;
    }

    async executeFindAll() {
        const products = await this.repository.findAll();
        return products;
    }

    async executeFindById(id: number) {
        const product = await this.repository.findById(id);
        return product;
    }

    async executeDelete(id: number) {
        const product = await this.repository.delete(id);
        return product;
    }
}