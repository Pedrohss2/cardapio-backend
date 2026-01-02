import { Product } from "./product.entity";

export interface IProductRepository {
    save(product: Product): Promise<void>;

    findById(id: string): Promise<Product | null>;

    findAll(): Promise<Product[]>;

    update(id: string, product: Partial<Product>): Promise<Product | null>;

    delete(id: string): Promise<any>;

}