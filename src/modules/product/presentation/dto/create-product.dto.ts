import { IsString, IsOptional, Min, IsNumberString, IsEmail } from 'class-validator';

export class CreateProductDto {
    @IsString()
    name: string;

    @IsNumberString()
    @Min(0)
    price: number;

    @IsString()
    description: string;

    @IsString()
    @IsOptional()
    image?: string;

    @IsString()
    @IsOptional()
    categoryId?: string;

    @IsString()
    companyId: string;
}
