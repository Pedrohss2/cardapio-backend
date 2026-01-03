import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Company } from '../../domain/company.entity';
import type { CompanyRepository } from '../../domain/company.repository';

@Injectable()
export class UpdateCompanyUseCase {
    constructor(
        @Inject('ICompanyRepository')
        private readonly repository: CompanyRepository,
    ) { }

    async execute(id: string, data: any): Promise<Company> {
        if (!id) throw new BadRequestException('Id is required');

        const company = new Company(id, data.name, data.address, data.phone, data.email);
        const updatedCompany = await this.repository.update(id, company);

        if (!updatedCompany) throw new BadRequestException('Company not found');

        return updatedCompany;
    }
}
