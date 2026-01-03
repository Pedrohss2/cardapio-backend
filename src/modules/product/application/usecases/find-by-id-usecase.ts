import type { IProductRepository } from "../../domain/repository/product.repository";
import { Inject } from "@nestjs/common";

export default class FindByIdUseCase {
    constructor(
        @Inject('IProductRepository')
        private readonly repository: IProductRepository,
    ) { }


    async executeFindById(id: string) {
        const product = await this.repository.findById(id);
        return product;
    }
}