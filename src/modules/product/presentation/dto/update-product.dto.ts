import { IsString, IsOptional, Min, IsNumberString } from 'class-validator';

export class UpdateProductDto {
    @IsString()
    name: string;

    @IsNumberString()
    @Min(0)
    price: number;


    @IsString()
    description: string;

    @IsNumberString()
    @Min(0)
    status?: number;

    @IsString()
    @IsOptional()
    image?: string;

    @IsOptional()
    @IsString()
    categoryId?: string;

    @IsOptional()
    @IsString()
    companyId?: string;
}
