import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateCompanyUseCase } from '../application/usecases/create-company.usecase';
import { FindAllCompanyUseCase } from '../application/usecases/find-all-company.usecase';
import { FindByIdCompanyUseCase } from '../application/usecases/find-by-id-company.usecase';
import { UpdateCompanyUseCase } from '../application/usecases/update-company.usecase';
import { DeleteCompanyUseCase } from '../application/usecases/delete-company.usecase';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Company')
@Controller('company')
export class CompanyController {
  constructor(
    private readonly createCompany: CreateCompanyUseCase,
    private readonly findAllCompany: FindAllCompanyUseCase,
    private readonly findByIdCompany: FindByIdCompanyUseCase,
    private readonly updateCompany: UpdateCompanyUseCase,
    private readonly deleteCompany: DeleteCompanyUseCase,
  ) { }

  @Post()
  @ApiOperation({ summary: 'Create company' })
  @ApiResponse({ status: 201, description: 'Create company' })
  create(@Body() body: CreateCompanyDto) {
    return this.createCompany.execute(body);
  }

  @Get()
  @ApiOperation({ summary: 'Get all company' })
  @ApiResponse({ status: 200, description: 'Get all company' })
  findAll() {
    return this.findAllCompany.execute();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get company by id' })
  @ApiResponse({ status: 200, description: 'Get company by id' })
  findOne(@Param('id') id: string) {
    return this.findByIdCompany.execute(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update company ' })
  @ApiResponse({ status: 200, description: 'Update company' })
  update(@Param('id') id: string, @Body() body: UpdateCompanyDto) {
    return this.updateCompany.execute(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete company' })
  @ApiResponse({ status: 200, description: 'Delete company' })
  remove(@Param('id') id: string) {
    return this.deleteCompany.execute(id);
  }
}
