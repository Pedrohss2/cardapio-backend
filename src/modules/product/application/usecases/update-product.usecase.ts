import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { ImageService } from "../../infrastructure/image.service";
import type { UpdateProductDto } from "../../presentation/dto/update-product.dto";
import type { IProductRepository } from "../../domain/repository/product.repository";
import type { CompanyRepository } from '../../../company/domain/company.repository';
import type { Product } from "../../domain/entity/product.entity";

@Injectable()
export class UpdateProductUseCase {

    constructor(
        @Inject('IProductRepository')
        private readonly repository: IProductRepository,
        @Inject('ICompanyRepository')
        private readonly companyRepository: CompanyRepository,
        private readonly imageService: ImageService,
    ) { }

    async execute(id: string, data: UpdateProductDto, file?: Express.Multer.File): Promise<Product> {
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
        if (!product) throw new BadRequestException('Product not found');

        return product;
    }

}