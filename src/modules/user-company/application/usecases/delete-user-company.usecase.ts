import { Inject, Injectable } from '@nestjs/common';
import type { UserCompanyRepository } from '../../domain/repository/user-company.repository';

@Injectable()
export class DeleteUserCompanyUseCase {
    constructor(
        @Inject('IUserCompanyRepository')
        private readonly repository: UserCompanyRepository,
    ) { }

    async execute(userId: string, companyId: string): Promise<void> {
        await this.repository.deleteByUserAndCompany(userId, companyId);
    }
}
