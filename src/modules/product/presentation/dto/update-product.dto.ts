import { IsString, IsInt, IsOptional, Min, IsDecimal } from 'class-validator';

export class UpdateProductDto {
    @IsString()
    name: string;

    @IsDecimal()
    @Min(0)
    price: number;

    @IsString()
    @IsOptional()
    image?: string;

    @IsString()
    description: string;

    @IsInt()
    @IsOptional()
    categoryId?: number;
}
