import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { LoggerModule } from '@app/shared';
import { UserUseCasesModule } from '@app/application/user';

@Module({
  imports: [
    UserUseCasesModule,
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
    LoggerModule,
  ],
  controllers: [UserController],
})
export class UserModule {}
