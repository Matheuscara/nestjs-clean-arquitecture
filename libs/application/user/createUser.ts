import { Inject, Injectable, Logger } from '@nestjs/common';
import { User, UserRepository } from '@app/domain';
import { CreateUserDto } from '@app/usecases/user';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreatedUserEvent } from './events/createdUser.event';

@Injectable()
export class CreateUser {
  private readonly logger = new Logger(CreateUser.name);
  constructor(
    @Inject('UserRepository')
    private readonly repo: UserRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(createUserDto: CreateUserDto): Promise<User> {
    const user = new User(
      createUserDto.nome,
      createUserDto.email,
      createUserDto.senha,
    );

    const createdUser = await this.repo.create(user);

    this.logger.log('User created', createdUser);

    this.eventEmitter.emit(
      'created.user',
      new CreatedUserEvent(createdUser.nome, createdUser.email),
    );

    return createdUser;
  }
}
