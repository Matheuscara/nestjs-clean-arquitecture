import { Inject, Injectable, Logger } from '@nestjs/common';
import { User, UserRepository } from '@app/domain';
import { CreateUserDto } from '../dtos/createUser.dto';

@Injectable()
export class CreateUser {
  private readonly logger = new Logger(CreateUser.name);
  constructor(
    @Inject('UserRepository')
    private readonly repo: UserRepository,
  ) {}

  async execute(createUserDto: CreateUserDto): Promise<User> {
    const user = new User(
      createUserDto.nome,
      createUserDto.email,
      createUserDto.senha,
    );

    const createdUser = await this.repo.create(user);

    this.logger.log('User created', createdUser);

    return createdUser;
  }
}
