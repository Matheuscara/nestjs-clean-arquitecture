import { Module } from '@nestjs/common';
import { CreatedUserConsumer } from './consumers/createdUser.consumer';
import { EventEmitterModule } from '@nestjs/event-emitter';
@Module({
  imports: [EventEmitterModule.forRoot()],
  controllers: [],
  providers: [CreatedUserConsumer],
})
export class WorkerModule {}
