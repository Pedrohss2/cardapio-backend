import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import type { ICategoryRepository } from "../../domain/repository/category.repository";
import type { Category } from "../../domain/entity/category.entity";

@Injectable()
export class UpdateCategoryUseCase {
    constructor(
        @Inject('ICategoryRepository')
        private readonly repository: ICategoryRepository,
    ) { }

    async execute(id: string, data: any): Promise<Category> {
        if (!id) throw new BadRequestException('Id is required');

        const category = await this.repository.update(id, data);
        if (!category) throw new BadRequestException('Category not found');

        return category;
    }
}
