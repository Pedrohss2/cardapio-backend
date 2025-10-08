import { IsString, IsInt, IsOptional, Min, IsDecimal } from 'class-validator';

export class CreateProductDto {
    @IsString()
    name: string;

    @IsDecimal()
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
}
