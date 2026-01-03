import { Inject, Injectable } from '@nestjs/common';
import type { CompanyRepository } from '../../domain/company.repository';
import type { Company } from '../../domain/company.entity';

@Injectable()
export class FindByIdCompanyUseCase {
    constructor(
        @Inject('ICompanyRepository')
        private readonly repository: CompanyRepository,
    ) { }

    async execute(id: string): Promise<Company | null> {
        return this.repository.findById(id);
    }
}
