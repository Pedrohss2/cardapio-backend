import { Inject, Injectable } from '@nestjs/common';
import type { CompanyRepository } from '../../domain/company.repository';

@Injectable()
export class DeleteCompanyUseCase {
    constructor(
        @Inject('ICompanyRepository')
        private readonly repository: CompanyRepository,
    ) { }

    async execute(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}
