import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UseCasesModule } from './useCases/useCases.module';

@Module({
  imports: [UseCasesModule],
  controllers: [UserController],
})
export class UserModule {}
