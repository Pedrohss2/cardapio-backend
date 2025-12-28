import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CompanyUseCase } from '../application/company.usecase';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Company')
@Controller('company')
export class CompanyController {
  constructor(private readonly useCase: CompanyUseCase) { }

  @Post()
  @ApiOperation({ summary: 'Criar empresa' })
  @ApiResponse({ status: 201, description: 'Criar empresas' })
  create(@Body() body: CreateCompanyDto) {
    return this.useCase.execute(body);
  }

  @Get()
  @ApiOperation({ summary: 'Listar usuários' })
  @ApiResponse({ status: 200, description: 'Lista de usuários' })
  findAll() {
    return this.useCase.executeFindAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.useCase.executeFindById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdateCompanyDto) {
    return this.useCase.executeUpdate(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.useCase.executeDelete(id);
  }
}
