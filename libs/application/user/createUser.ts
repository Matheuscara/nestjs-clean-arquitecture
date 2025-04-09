import { Inject, Injectable, Logger } from '@nestjs/common';
import { User, UserRepository } from '@app/domain';
import { CreateUserDto } from '@app/application/user';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreatedUserEvent } from './events/createdUser.event';
import { UserMapper } from './mappers/user.mapper';

@Injectable()
export class CreateUser {
  private readonly logger = new Logger(CreateUser.name);

  constructor(
    @Inject('UserRepository')
    private readonly repo: UserRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(createUserDto: CreateUserDto): Promise<User> {
    this.logger.log('Creating user');

    const user = UserMapper.toDomainInFromCreate(createUserDto);

    const createdUser = await this.repo.create(user);

    this.logger.log('User created', createdUser);

    this.eventEmitter.emit(
      'created.user',
      new CreatedUserEvent(createdUser.nome, createdUser.email),
    );

    return createdUser;
  }
}
