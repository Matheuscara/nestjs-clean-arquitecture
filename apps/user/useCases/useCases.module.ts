import { Module } from '@nestjs/common';
import { CreateUser } from './index';
import { UserRepositoryImpl } from '@app/infrastructure';
import { DatabaseModule } from '@app/infrastructure';

@Module({
  imports: [DatabaseModule],
  providers: [
    CreateUser,
    {
      provide: 'UserRepository',
      useClass: UserRepositoryImpl,
    },
  ],
  exports: [CreateUser],
})
export class UseCasesModule {}
