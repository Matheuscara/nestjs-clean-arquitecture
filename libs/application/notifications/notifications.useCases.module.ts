import { Module } from '@nestjs/common';
import { SendEmail } from './sendEmail';
import { LoggerModule } from '@app/shared';

@Module({
  imports: [LoggerModule],
  providers: [SendEmail],
  exports: [SendEmail],
})
export class NotificationsUseCasesModule {}
