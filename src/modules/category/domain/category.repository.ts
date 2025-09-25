import { Category } from "./category.entity";

export interface ICategoryRepository {
    save(category: Category): Promise<void>;

    findById(id: number): Promise<Category | null>;

    findAll(): Promise<Category[]>;

    update(id: number, category: Category): Promise<Category | null>;

    delete(id: number): Promise<any>;
}