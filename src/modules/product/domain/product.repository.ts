import { Product } from "./product.entity";

export interface IProductRepository {
    save(product: Product): Promise<void>;

    findById(id: number): Promise<Product | null>;

    findAll(): Promise<Product[]>;

    update(id: number, product: Product): Promise<Product | null>;

    delete(id: number): Promise<any>;

}