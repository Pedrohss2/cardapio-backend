import { Body, Controller, Post, Get, Param, ParseIntPipe } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { RegisterUserUseCase } from '../application/register-user.usecase';
import { FindUserByIdUseCase } from '../application/find-user-by-id.usecase';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
  ) { }

  @Post('register')
  @ApiOperation({ summary: 'Register user' })
  @ApiBody({ type: RegisterUserDto })
  async register(@Body() registerUserDto: RegisterUserDto) {
    return this.registerUserUseCase.execute(
      registerUserDto
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  async findById(@Param('id') id: string) {
    return this.findUserByIdUseCase.execute(id);
  }
}