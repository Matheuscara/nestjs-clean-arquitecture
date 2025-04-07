import { Inject, Injectable } from '@nestjs/common';
import { User, UserRepository } from '@app/domain';
import { CreateUserDto } from '../dtos/createUser.dto';

@Injectable()
export class CreateUser {
  constructor(
    @Inject('UserRepository')
    private readonly repo: UserRepository,
  ) {}

  async execute(createUserDto: CreateUserDto) {
    const user = new User(
      createUserDto.nome,
      createUserDto.email,
      createUserDto.senha,
    );

    const createdUser = await this.repo.create(user);

    console.log('create user usecase', createdUser);
  }
}
