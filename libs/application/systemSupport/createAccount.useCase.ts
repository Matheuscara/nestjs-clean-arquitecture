import { Inject, Logger } from '@nestjs/common';
import { ISystemSupport } from '@app/domain';

export class CreateAccountUseCase {
  private readonly logger = new Logger(CreateAccountUseCase.name);

  constructor(
    @Inject('ISystemSupportService')
    private readonly systemSupport: ISystemSupport,
  ) {}

  async execute(email: string) {
    return this.systemSupport.criarAccount(email);
  }
}
