import { Inject, Injectable } from "@nestjs/common";
import type { ICategoryRepository } from "../../domain/repository/category.repository";

@Injectable()
export class DeleteCategoryUseCase {
    constructor(
        @Inject('ICategoryRepository')
        private readonly repository: ICategoryRepository,
    ) { }

    async execute(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}
