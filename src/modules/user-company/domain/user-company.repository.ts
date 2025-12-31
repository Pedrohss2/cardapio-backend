import { UserCompany } from './user-company.entity';

export interface UserCompanyRepository {
  create(userCompany: UserCompany): Promise<UserCompany>;
  deleteByUserAndCompany(userId: string, companyId: string): Promise<void>;
  findByUserId(userId: string): Promise<UserCompany[]>;
  findByUserAndCompany(userId: string, companyId: string): Promise<UserCompany | null>;
  findAll(): Promise<UserCompany[]>;
}
