import { Company } from './company.entity';

export interface CompanyRepository {
    create(company: Company): Promise<Company>;
    findAll(): Promise<Company[]>;
    findById(id: string): Promise<Company | null>;
    update(id: string, company: Company): Promise<Company>;
    delete(id: string): Promise<void>;
}
