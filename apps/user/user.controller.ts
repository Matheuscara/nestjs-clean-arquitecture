import { Controller, Body, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { CreateUser } from './useCases/createUser';

@Controller('users')
export class UserController {
  constructor(private readonly createUseCase: CreateUser) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<void> {
    await this.createUseCase.execute(createUserDto);
  }
}
