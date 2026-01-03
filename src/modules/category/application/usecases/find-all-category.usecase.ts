import { Inject, Injectable } from "@nestjs/common";
import type { ICategoryRepository } from "../../domain/repository/category.repository";
import type { Category } from "../../domain/entity/category.entity";

@Injectable()
export class FindAllCategoryUseCase {
    constructor(
        @Inject('ICategoryRepository')
        private readonly repository: ICategoryRepository,
    ) { }

    async execute(): Promise<Category[]> {
        const categories = await this.repository.findAll();
        return categories;
    }
}
