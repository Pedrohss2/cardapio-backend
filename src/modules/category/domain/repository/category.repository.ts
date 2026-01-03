import { Category } from "../entity/category.entity";

export interface ICategoryRepository {
    save(category: Category): Promise<void>;

    findById(id: string): Promise<Category | null>;

    findAll(): Promise<Category[]>;

    update(id: string, category: Category): Promise<Category | null>;

    delete(id: string): Promise<any>;
}