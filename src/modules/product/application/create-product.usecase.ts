import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import type { IProductRepository } from "../domain/product.repository";
import type { CompanyRepository } from '../../company/domain/company.repository';

@Injectable()
export class CreateProductUseCase {
    constructor(
        @Inject('IProductRepository')
        private readonly repository: IProductRepository,
        @Inject('ICompanyRepository')
        private readonly companyRepository: CompanyRepository,
    ) { }

    async execute(data: any): Promise<void> {
        data.price = parseFloat(data.price as any);

        if (!data.companyId) throw new BadRequestException('companyId is required');

        const company = await this.companyRepository.findById(data.companyId);
        if (!company) throw new BadRequestException('Company not found');

        const product = await this.repository.save(data);
        return product;
    }

    async executeUpdate(id: string, data: any) {
        if (!id) throw new BadRequestException('Id is required');
        data.price = parseFloat(data.price as any);

        if (data.companyId) {
            const company = await this.companyRepository.findById(data.companyId);
            if (!company) throw new BadRequestException('Company not found');
        }

        const product = await this.repository.update(id, data);
        return product;
    }

    async executeFindAll() {
        const products = await this.repository.findAll();
        return products;
    }

    async executeFindById(id: string) {
        const product = await this.repository.findById(id);
        return product;
    }

    async executeDelete(id: string) {
        const product = await this.repository.delete(id);
        return product;
    }
}