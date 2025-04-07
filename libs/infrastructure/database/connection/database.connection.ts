import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { DatabaseConnection } from './base/database.config';
import { QueryOptions } from 'sequelize';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DataBaseConnection extends DatabaseConnection {
  public sequelize: Sequelize;

  constructor(private configService: ConfigService) {
    const host = 'localhost';
    const port = 5432;
    const username = 'postgres';
    const password = '748596123';
    const database = 'vitrum';

    super(host, port, username, password, database);

    this.sequelize = new Sequelize({
      dialect: 'postgres',
      host: this.host,
      port: this.port,
      username: this.username,
      password: this.password,
      database: this.database,
      logging: false,
      repositoryMode: false,
    });

    this.connect();
  }

  async connect(): Promise<void> {
    try {
      await this.sequelize.authenticate();
      this.logger.log('Database connected successfully.');
    } catch (err) {
      this.logger.error('Error connecting to the database:', err);
    }
  }

  async query<T>(
    sql: string,
    params?: QueryOptions,
  ): Promise<T[] | [T[], unknown]> {
    const results = await this.sequelize.query(sql, params);
    return results as T[] | [T[], unknown];
  }
}
