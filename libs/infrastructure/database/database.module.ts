import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DataBaseConnection } from './connection/database.connection';

@Module({
  imports: [ConfigModule],
  providers: [DataBaseConnection],
  exports: [DataBaseConnection],
})
export class DatabaseModule {}
