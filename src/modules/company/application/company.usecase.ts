import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Company } from '../domain/company.entity';
import type { CompanyRepository } from '../domain/company.repository';
import { RegisterUserUseCase } from 'src/modules/users/application/register-user.usecase';
import { User } from 'src/modules/users/domain/user.entity';
import { UserCompany } from 'src/modules/user-company/domain/user-company.entity';
import type { UserCompanyRepository } from 'src/modules/user-company/domain/user-company.repository';

@Injectable()
export class CompanyUseCase {
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

  async executeFindAll() {
    return this.repository.findAll();
  }

  async executeFindById(id: string) {
    return this.repository.findById(id);
  }

  async executeUpdate(id: string, data: any) {
    if (!id) throw new BadRequestException('Id is required');

    const company = new Company(id, data.name, data.address, data.phone, data.email);

    return this.repository.update(id, company);
  }

  async executeDelete(id: string) {
    return this.repository.delete(id);
  }
}
