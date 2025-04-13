import { Injectable, Logger } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import {
  SendEmail,
  CreatedUserEvent,
  CreateAccountUseCase,
} from '@app/application';

@Injectable()
export class CreatedUserConsumer {
  private readonly logger = new Logger(CreatedUserConsumer.name);

  constructor(
    private readonly sendEmail: SendEmail,
    private readonly createAccount: CreateAccountUseCase,
  ) {}

  @RabbitSubscribe({
    exchange: 'exchange1',
    routingKey: 'user.created',
    queue: 'user-created-queue',
  })
  public async handleUserCreated(msg: CreatedUserEvent) {
    this.logger.log('Worker - User created event received ');
    await this.createAccount.execute(msg.email);
    await this.sendEmail.execute(msg.email);
  }
}
