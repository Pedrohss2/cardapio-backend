import { Inject, Injectable } from '@nestjs/common';
import type { CompanyRepository } from '../../domain/company.repository';
import type { Company } from '../../domain/company.entity';

@Injectable()
export class FindAllCompanyUseCase {
    constructor(
        @Inject('ICompanyRepository')
        private readonly repository: CompanyRepository,
    ) { }

    async execute(): Promise<Company[]> {
        return this.repository.findAll();
    }
}
