import { BadRequestException, HttpException, Inject, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { UserCompany } from '../domain/user-company.entity';
import type { UserCompanyRepository } from '../domain/user-company.repository';

@Injectable()
export class UserCompanyUseCase {
  constructor(
    @Inject('IUserCompanyRepository')
    private readonly repository: UserCompanyRepository,
  ) { }

  async execute(data: any): Promise<UserCompany> {
    if (!data) throw new HttpException(
      'Invalid data on create user-company',
      400,
    );

    const userCompany = new UserCompany(uuidv4(), data.userId, data.companyId);
    return this.repository.create(userCompany);
  }

  async executeFindByUser(userId: string) {
    return this.repository.findByUserId(userId);
  }

  async executeDelete(userId: string, companyId: string) {
    return this.repository.deleteByUserAndCompany(userId, companyId);
  }
}
