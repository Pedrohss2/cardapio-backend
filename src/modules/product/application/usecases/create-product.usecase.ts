import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { ImageService } from '../../infrastructure/image.service';
import type { IProductRepository } from "../../domain/repository/product.repository";
import type { CompanyRepository } from '../../../company/domain/company.repository';


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
}