import { Controller, Body, Post } from '@nestjs/common';
import { CreateUser, CreateUserDto } from '@app/application';

@Controller('users')
export class UserController {
  constructor(private readonly createUseCase: CreateUser) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<void> {
    await this.createUseCase.execute(createUserDto);
  }
}
