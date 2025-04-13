import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { UserUseCasesModule } from '@app/application';

@Module({
  imports: [
    UserUseCasesModule,
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
  ],
  controllers: [UserController],
})
export class UserModule {}
