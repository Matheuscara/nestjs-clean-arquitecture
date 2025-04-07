import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UseCasesModule } from './useCases/useCases.module';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { LoggerModule } from '@app/shared';

@Module({
  imports: [
    UseCasesModule,
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
    LoggerModule,
  ],
  controllers: [UserController],
})
export class UserModule {}
