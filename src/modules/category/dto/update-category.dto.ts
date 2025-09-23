import { IsString, IsInt, IsOptional, Min, IsDecimal } from 'class-validator';

export class UpdateCategorytDto {
    @IsString()
    name: string;
}
