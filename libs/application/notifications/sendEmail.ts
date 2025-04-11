import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class SendEmail {
  private readonly logger = new Logger(SendEmail.name);

  async execute(email: string): Promise<void> {
    this.logger.log(`📨 Enviar email para ${email}`);
  }
}
