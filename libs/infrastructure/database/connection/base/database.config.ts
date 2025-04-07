import { Logger } from '@nestjs/common';

export abstract class DatabaseConnection {
  constructor(
    protected host: string,
    protected port: number,
    protected username: string,
    protected password: string,
    protected database: string,
  ) {}

  protected readonly logger = new Logger('database', {
    timestamp: true,
  });

  abstract connect(): Promise<void>;
}
