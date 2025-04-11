import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { rabbitMqConfig } from './config';

@Module({
  imports: [RabbitMQModule.forRoot(rabbitMqConfig)],
  exports: [RabbitMQModule],
})
export class CustomRabbitMQModule {}
