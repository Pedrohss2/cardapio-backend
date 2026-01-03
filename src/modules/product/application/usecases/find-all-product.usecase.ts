import { Inject, Injectable } from "@nestjs/common";
import type { IProductRepository } from "../../domain/repository/product.repository";
import type { Product } from "../../domain/entity/product.entity";

@Injectable()
export class FindAllProductUseCase {
    constructor(
        @Inject('IProductRepository')
        private readonly repository: IProductRepository,
    ) { }

    async execute(): Promise<Product[]> {
        const products = await this.repository.findAll();
        return products;
    }
}