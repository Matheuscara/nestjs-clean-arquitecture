import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { CreatedUserEvent } from '@app/usecases/user';

@Injectable()
export class CreatedUserConsumer {
  private readonly logger = new Logger(CreatedUserConsumer.name);

  @OnEvent('created.user')
  async handle(event: CreatedUserEvent) {
    this.logger.log(`📨 Enviar email para ${event.email}`);
    // Aqui você poderia chamar um EmailService, por exemplo
  }
}
