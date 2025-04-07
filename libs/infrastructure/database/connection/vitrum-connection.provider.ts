import { DataBaseConnection } from './database.connection';
import { ConfigService } from '@nestjs/config';

export const vitrumConnectionProvider = {
  provide: DataBaseConnection,
  useFactory: (configService: ConfigService) =>
    new DataBaseConnection(configService),
  inject: [ConfigService],
};
