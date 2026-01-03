import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { UserCompany } from '../../domain/entity/user-company.entity';
import type { UserCompanyRepository } from '../../domain/repository/user-company.repository';

@Injectable()
export class CreateUserCompanyUseCase {
    constructor(
        @Inject('IUserCompanyRepository')
        private readonly repository: UserCompanyRepository,
    ) { }

    async execute(data: any): Promise<UserCompany> {
        if (!data) throw new BadRequestException('Invalid data on create user-company');

        const userCompany = new UserCompany(uuidv4(), data.userId, data.companyId);
        return this.repository.create(userCompany);
    }
}
