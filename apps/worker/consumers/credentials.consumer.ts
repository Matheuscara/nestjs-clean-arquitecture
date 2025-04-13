import { Injectable, Logger } from '@nestjs/common';
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { CredentialsStoreService } from '@app/infrastructure';

@Injectable()
export class CredentialsConsumer {
  private readonly logger = new Logger(CredentialsConsumer.name);
  private readonly cache: Map<string, string>;

  constructor(private readonly credentialsStore: CredentialsStoreService) {
    this.cache = new Map<string, string>();
  }

  async getValueCached(key: string): Promise<string | null> {
    if (this.cache.has(key)) {
      return this.cache.get(key);
    }

    return null;
  }

  @RabbitRPC({
    exchange: 'exchange1',
    routingKey: 'get.credentials',
    queue: 'get-credentials-queue',
  })
  public async handleGetCredentials(parameter: string) {
    try {
      const result = await this.getValueCached(parameter);

      if (!result) {
        const credential = await this.credentialsStore.getParameter(parameter);
        this.cache.set(parameter, credential);
      }

      return this.cache.get(parameter);
    } catch (error) {
      this.logger.error('Erro ao obter credenciais: ' + JSON.stringify(error));
      throw error;
    }
  }
}
