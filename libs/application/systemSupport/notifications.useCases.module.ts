import { Module } from '@nestjs/common';
import { LoggerModule } from '@app/shared';
import { CreateAccountUseCase } from './createAccount.useCase';
import { SystemSupportService } from '@app/infrastructure';

@Module({
  imports: [LoggerModule],
  providers: [
    CreateAccountUseCase,
    {
      provide: 'ISystemSupportService',
      useClass: SystemSupportService,
    },
  ],
  exports: [CreateAccountUseCase],
})
export class SystemSupportUseCasesModule {}
