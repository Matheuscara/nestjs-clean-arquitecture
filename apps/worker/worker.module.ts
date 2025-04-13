import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import {
  CredentialsStoreModule,
  CustomRabbitMQModule,
} from '@app/infrastructure';
import { LoggerModule } from '@app/shared';
import {
  SystemSupportUseCasesModule,
  NotificationsUseCasesModule,
} from '@app/application';
import { CreatedUserConsumer, CredentialsConsumer } from './consumers';

@Module({
  imports: [
    CredentialsStoreModule,
    LoggerModule,
    EventEmitterModule.forRoot(),
    CustomRabbitMQModule,
    NotificationsUseCasesModule,
    SystemSupportUseCasesModule,
  ],
  controllers: [],
  providers: [CreatedUserConsumer, CredentialsConsumer],
})
export class WorkerModule {}
