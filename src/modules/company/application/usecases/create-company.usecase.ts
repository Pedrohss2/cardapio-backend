import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Company } from '../../domain/company.entity';
import type { CompanyRepository } from '../../domain/company.repository';
import { RegisterUserUseCase } from 'src/modules/users/application/usecases/register-user.usecase';
import type { UserCompanyRepository } from 'src/modules/user-company/domain/repository/user-company.repository';
import { UserCompany } from 'src/modules/user-company/domain/entity/user-company.entity';

@Injectable()
export class CreateCompanyUseCase {
    constructor(
        @Inject('ICompanyRepository')
        private readonly repository: CompanyRepository,
        private readonly registerUserUseCase: RegisterUserUseCase,
        @Inject('IUserCompanyRepository')
        private readonly userCompanyRepository: UserCompanyRepository,
    ) { }

    async execute(data: any): Promise<any> {
        if (!data) throw new BadRequestException('Invalid data');

        const company = new Company(uuidv4(), data.name, data.address, data.phone, data.email);
        const createdCompany = await this.repository.create(company);

        const ownerName = data.ownerName ?? data.name ?? 'admin';
        const ownerPassword = data.ownerPassword ?? Math.random().toString(36).slice(-10);

        const userPayload: any = { name: ownerName, email: createdCompany.email, password: ownerPassword };
        const createdUser = await this.registerUserUseCase.execute(userPayload as any);

        const userCompany = new UserCompany(uuidv4(), createdUser.id, createdCompany.id);
        await this.userCompanyRepository.create(userCompany);

        return { company: createdCompany, user: createdUser };
    }
}
