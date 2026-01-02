import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { ImageService } from '../../infrastructure/image.service';
import type { IProductRepository } from "../../domain/product.repository";
import type { CompanyRepository } from '../../../company/domain/company.repository';
import { Product } from "../../domain/product.entity";

@Injectable()
export class CreateProductUseCase {
    constructor(
        @Inject('IProductRepository')
        private readonly repository: IProductRepository,
        @Inject('ICompanyRepository')
        private readonly companyRepository: CompanyRepository,
        private readonly imageService: ImageService,
    ) { }

    async execute(data: any, file?: Express.Multer.File): Promise<void> {

        data.price = Number(data.price);

        const company = await this.companyRepository.findById(data.companyId);
        if (!company) {
            throw new BadRequestException('Company not found');
        }

        if (file) {
            const filename = await this.imageService.saveFile(file);
            data.image = filename;
        }

        const product = await this.repository.save(data);
    }

    async executeUpdate(id: string, data: any, file?: Express.Multer.File) {
        if (!id) throw new BadRequestException('Id is required');

        if (data.price) {
            data.price = Number(data.price);
        }

        if (data.companyId) {
            const company = await this.companyRepository.findById(data.companyId);
            if (!company) throw new BadRequestException('Company not found');
        }

        if (file) {
            const filename = await this.imageService.saveFile(file);
            data.image = filename;
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
        if (!id) throw new BadRequestException('Id is required');

        const product = await this.repository.delete(id);
    }
}