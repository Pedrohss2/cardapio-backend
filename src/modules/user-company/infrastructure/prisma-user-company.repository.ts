import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { UserCompany } from '../domain/entity/user-company.entity';
import { UserCompanyRepository } from '../domain/repository/user-company.repository';

@Injectable()
export class PrismaUserCompanyRepository implements UserCompanyRepository {
    constructor(private readonly prisma: PrismaService) { }

    async create(userCompany: UserCompany): Promise<UserCompany> {
        return await this.prisma.userCompany.create(
            {
                data: userCompany
            });
    }

    async deleteByUserAndCompany(userId: string, companyId: string): Promise<void> {
        await this.prisma.userCompany.deleteMany(
            {
                where: { userId, companyId }
            });
    }

    async findByUserId(userId: string): Promise<UserCompany[]> {
        return await this.prisma.userCompany.findMany(
            {
                where: { userId },
                include: { company: true }
            });
    }

    async findByUserAndCompany(userId: string, companyId: string): Promise<UserCompany | null> {
        return await this.prisma.userCompany.findFirst(
            {
                where: { userId, companyId }
            });
    }

    async findAll(): Promise<UserCompany[]> {
        return await this.prisma.userCompany.findMany(
            {
                include:
                {
                    user: true,
                    company: true
                }
            });
    }
}
