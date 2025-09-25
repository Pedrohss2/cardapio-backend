import { IsString } from 'class-validator';

export class CreateCategorytDto {
    @IsString()
    name: string;
}