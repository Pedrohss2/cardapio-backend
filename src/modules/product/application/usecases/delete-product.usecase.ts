import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import type { IProductRepository } from "../../domain/repository/product.repository";

@Injectable()
export class DeleteProductUseCase {
    constructor(
        @Inject('IProductRepository')
        private readonly repository: IProductRepository,
    ) { }

    async execute(id: string): Promise<void> {
        if (!id) throw new BadRequestException('Id is required');

        await this.repository.delete(id);
    }
}