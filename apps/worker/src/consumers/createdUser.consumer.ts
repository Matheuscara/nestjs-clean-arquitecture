import { Injectable, Logger } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { CreatedUserEvent } from '@app/application/user';
import { SendEmail } from '@app/application/notifications';

@Injectable()
export class CreatedUserConsumer {
  private readonly logger = new Logger(CreatedUserConsumer.name);

  constructor(private readonly sendEmail: SendEmail) {}

  @RabbitSubscribe({
    exchange: 'exchange1',
    routingKey: 'user.created',
    queue: 'user-created-queue',
  })
  public async handleUserCreated(msg: CreatedUserEvent) {
    this.logger.log('Worker - User created event received ');
    await this.sendEmail.execute(msg.email);
  }
}
