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
  @ApiOperation({ summary: 'Create company' })
  @ApiResponse({ status: 201, description: 'Create company' })
  create(@Body() body: CreateCompanyDto) {
    return this.useCase.execute(body);
  }

  @Get()
  @ApiOperation({ summary: 'Get all company' })
  @ApiResponse({ status: 200, description: 'Get all company' })
  findAll() {
    return this.useCase.executeFindAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get company by id' })
  @ApiResponse({ status: 200, description: 'Get company by id' })
  findOne(@Param('id') id: string) {
    return this.useCase.executeFindById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update company ' })
  @ApiResponse({ status: 200, description: 'Update company' })
  update(@Param('id') id: string, @Body() body: UpdateCompanyDto) {
    return this.useCase.executeUpdate(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete company' })
  @ApiResponse({ status: 200, description: 'Delete company' })
  remove(@Param('id') id: string) {
    return this.useCase.executeDelete(id);
  }
}
