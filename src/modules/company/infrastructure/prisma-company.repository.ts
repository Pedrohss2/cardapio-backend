import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Company } from '../domain/company.entity';
import { CompanyRepository } from '../domain/company.repository';

@Injectable()
export class PrismaCompanyRepository implements CompanyRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(company: Company): Promise<Company> {
    return await this.prisma.company.create({ data: company });
  }

  async findAll(): Promise<Company[]> {
    return await this.prisma.company.findMany();
  }

  async findById(id: string): Promise<Company | null> {
    return await this.prisma.company.findUnique({ where: { id } });
  }

  async update(id: string, company: Company): Promise<Company> {
    return await this.prisma.company.update({ where: { id }, data: company });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.company.delete({ where: { id } });
  }
}
