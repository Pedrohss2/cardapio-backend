import { Inject, Injectable } from "@nestjs/common";
import type { ICategoryRepository } from "../../domain/repository/category.repository";
import type { Category } from "../../domain/entity/category.entity";

@Injectable()
export class FindByIdCategoryUseCase {
    constructor(
        @Inject('ICategoryRepository')
        private readonly repository: ICategoryRepository,
    ) { }

    async execute(id: string): Promise<Category | null> {
        const category = await this.repository.findById(id);
        return category;
    }
}
