import { Controller, Body, Post } from '@nestjs/common';
import { CreateUser } from '@app/application/user';
import { CreateUserDto } from '@app/application/user';

@Controller('users')
export class UserController {
  constructor(private readonly createUseCase: CreateUser) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<void> {
    await this.createUseCase.execute(createUserDto);
  }
}
