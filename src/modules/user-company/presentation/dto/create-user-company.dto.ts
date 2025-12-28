import { IsString } from 'class-validator';

export class CreateUserCompanyDto {
  @IsString()
  userId: string;

  @IsString()
  companyId: string;
}
