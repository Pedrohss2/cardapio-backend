import { Inject, Injectable } from "@nestjs/common";
import type { ICategoryRepository } from "../../domain/repository/category.repository";

@Injectable()
export class CreateCategoryUseCase {
    constructor(
        @Inject('ICategoryRepository')
        private readonly repository: ICategoryRepository,
    ) { }

    async execute(data: any): Promise<void> {
        await this.repository.save(data);
    }
}

