import { Module } from '@nestjs/common';
import { CustomRabbitMQModule, UserRepositoryImpl } from '@app/infrastructure';
import { DatabaseModule } from '@app/infrastructure';
import { CreateUser } from './createUser';
import { LoggerModule } from '@app/shared';

@Module({
  imports: [DatabaseModule, CustomRabbitMQModule, LoggerModule],
  providers: [
    CreateUser,
    {
      provide: 'UserRepository',
      useClass: UserRepositoryImpl,
    },
  ],
  exports: [CreateUser],
})
export class UserUseCasesModule {}
