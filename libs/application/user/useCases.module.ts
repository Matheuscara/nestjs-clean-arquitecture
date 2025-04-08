import { Module } from '@nestjs/common';
import { UserRepositoryImpl } from '@app/infrastructure';
import { DatabaseModule } from '@app/infrastructure';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CreateUser } from './createUser';

@Module({
  imports: [DatabaseModule, EventEmitterModule.forRoot()],
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
