import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Company } from '../domain/company.entity';
import type { CompanyRepository } from '../domain/company.repository';

@Injectable()
export class CompanyUseCase {
  constructor(
    @Inject('ICompanyRepository')
    private readonly repository: CompanyRepository,
  ) { }

  async execute(data: any): Promise<Company> {
    if (!data) throw new BadRequestException('Invalid data');

    const company = new Company(uuidv4(), data.name, data.address, data.phone, data.email);
    return this.repository.create(company);
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
