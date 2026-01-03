import { Inject, Injectable } from '@nestjs/common';
import type { UserCompanyRepository } from '../../domain/repository/user-company.repository';
import type { UserCompany } from '../../domain/entity/user-company.entity';

@Injectable()
export class FindAllUserCompanyUseCase {
    constructor(
        @Inject('IUserCompanyRepository')
        private readonly repository: UserCompanyRepository,
    ) { }

    async execute(): Promise<UserCompany[]> {
        return this.repository.findAll();
    }
}
