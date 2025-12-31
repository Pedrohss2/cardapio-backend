import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserCompanyUseCase } from '../application/user-company.usecase';
import { CreateUserCompanyDto } from './dto/create-user-company.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('UserCompany')
@Controller('user-company')
export class UserCompanyController {
  constructor(private readonly useCase: UserCompanyUseCase) { }

  @Post()
  @ApiOperation({ summary: 'Assign user to company' })
  create(@Body() body: CreateUserCompanyDto) {
    return this.useCase.execute(body);
  }

  @Get()
  @ApiOperation({ summary: 'List all user-company associations' })
  findAll() {
    return this.useCase.executeFindAll();
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'List companies for user' })
  findByUser(@Param('userId') userId: string) {
    return this.useCase.executeFindByUser(userId);
  }

  @Delete(':userId/:companyId')
  @ApiOperation({ summary: 'Remove user from company' })
  remove(@Param('userId') userId: string, @Param('companyId') companyId: string) {
    return this.useCase.executeDelete(userId, companyId);
  }
}
