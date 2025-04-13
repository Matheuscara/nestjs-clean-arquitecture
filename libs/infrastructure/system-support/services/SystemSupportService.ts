import { ISystemSupport } from '@app/domain';
import { Logger } from '@nestjs/common';

export class SystemSupportService implements ISystemSupport {
  private readonly logger = new Logger(SystemSupportService.name);

  async criarAccount(account: any): Promise<void> {
    this.logger.log('Criando conta');
    // Processa a conta mas não retorna nada
  }
}
