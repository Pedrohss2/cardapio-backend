import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import type { ICategoryRepository } from "../domain/category.repository";
import { CreateCategorytDto } from "../presentation/dto/create-category.dto";
import { Category } from "../domain/category.entity";

@Injectable()
export class CreateCategoryUseCase {
    constructor(
        @Inject('ICategoryRepository')
        private readonly repository: ICategoryRepository,
    ) { }

    async execute(data: any): Promise<void> {
        const category = await this.repository.save(data);
        return category;
    }

    async executeUpdate(id: number, data: any) {
        if (!id) throw new BadRequestException('Id is required');

        const category = await this.repository.update(id, data);
        return category;
    }

    async executeFindAll() {
        const categories = await this.repository.findAll();
        return categories;
    }

    async executeFindById(id: number) {
        const category = await this.repository.findById(id);
        return category;
    }

    async executeDelete(id: number) {
        const category = await this.repository.delete(id);
        return category;
    }
}