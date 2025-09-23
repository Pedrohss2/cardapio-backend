import { IsString, IsInt, IsOptional, Min, IsDecimal } from 'class-validator';

export class CreateCategorytDto {
    @IsString()
    name: string;
}
