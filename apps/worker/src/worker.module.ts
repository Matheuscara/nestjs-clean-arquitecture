import { Module } from '@nestjs/common';
import { CreatedUserConsumer } from './consumers/createdUser.consumer';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CustomRabbitMQModule } from '@app/infrastructure';
import { NotificationsUseCasesModule } from '@app/application/notifications';
import { LoggerModule } from '@app/shared';

@Module({
  imports: [
    LoggerModule,
    EventEmitterModule.forRoot(),
    CustomRabbitMQModule,
    NotificationsUseCasesModule,
  ],
  controllers: [],
  providers: [CreatedUserConsumer],
})
export class WorkerModule {}
