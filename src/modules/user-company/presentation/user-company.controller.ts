import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateUserCompanyUseCase } from '../application/usecases/create-user-company.usecase';
import { FindAllUserCompanyUseCase } from '../application/usecases/find-all-user-company.usecase';
import { FindByUserIdUserCompanyUseCase } from '../application/usecases/find-by-user-id-user-company.usecase';
import { DeleteUserCompanyUseCase } from '../application/usecases/delete-user-company.usecase';
import { CreateUserCompanyDto } from './dto/create-user-company.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('UserCompany')
@Controller('user-company')
export class UserCompanyController {
  constructor(
    private readonly createUserCompany: CreateUserCompanyUseCase,
    private readonly findAllUserCompany: FindAllUserCompanyUseCase,
    private readonly findByUserIdUserCompany: FindByUserIdUserCompanyUseCase,
    private readonly deleteUserCompany: DeleteUserCompanyUseCase,
  ) { }

  @Post()
  @ApiOperation({ summary: 'Assign user to company' })
  create(@Body() body: CreateUserCompanyDto) {
    return this.createUserCompany.execute(body);
  }

  @Get()
  @ApiOperation({ summary: 'List all user-company associations' })
  findAll() {
    return this.findAllUserCompany.execute();
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'List companies for user' })
  findByUser(@Param('userId') userId: string) {
    return this.findByUserIdUserCompany.execute(userId);
  }

  @Delete(':userId/:companyId')
  @ApiOperation({ summary: 'Remove user from company' })
  remove(@Param('userId') userId: string, @Param('companyId') companyId: string) {
    return this.deleteUserCompany.execute(userId, companyId);
  }
}
