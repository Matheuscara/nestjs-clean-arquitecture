import { Inject, Injectable, Logger } from '@nestjs/common';
import { User, UserRepository } from '@app/domain';
import { CreateUserDto } from '@app/application/user';
import { CreatedUserEvent } from './events/createdUser.event';
import { UserMapper } from './mappers/user.mapper';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class CreateUser {
  private readonly logger = new Logger(CreateUser.name);

  constructor(
    @Inject('UserRepository')
    private readonly repo: UserRepository,
    private readonly amqpConnection: AmqpConnection,
  ) {}

  async execute(createUserDto: CreateUserDto): Promise<User> {
    const user = UserMapper.toDomainInFromCreate(createUserDto);

    const createdUser = await this.repo.create(user);

    this.logger.log('User created', createdUser);

    await this.amqpConnection.publish(
      'exchange1',
      'user.created',
      new CreatedUserEvent(createdUser.nome, createdUser.email),
    );

    return createdUser;
  }
}
