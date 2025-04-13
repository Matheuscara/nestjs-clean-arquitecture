import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CredentialsStoreService {
  private readonly ssmClient: AWS.SSM;
  private readonly nodeEnv: string;
  private cache: Record<string, string> = {};

  constructor(private readonly configService: ConfigService) {
    const region = this.configService.get<string>('AWS_REGION');
    const accessKeyId = this.configService.get<string>('AWS_ACCESS_KEY_ID');
    const secretAccessKey = this.configService.get<string>(
      'AWS_SECRET_ACCESS_KEY',
    );
    this.nodeEnv = this.configService.get<string>('NODE_ENV');

    if (!region || !accessKeyId || !secretAccessKey || !this.nodeEnv) {
      throw new InternalServerErrorException(
        'Credenciais AWS não configuradas corretamente',
      );
    }

    this.ssmClient = new AWS.SSM({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
  }

  async getParameter(name: string, isSecure: boolean = false): Promise<string> {
    try {
      const response = await this.ssmClient
        .getParameter({
          Name: `/${this.nodeEnv}/${name}`,
          WithDecryption: isSecure,
        })
        .promise();

      if (!response.Parameter?.Value) {
        throw new NotFoundException(`Parâmetro ${name} não encontrado no SSM`);
      }

      this.cache[name] = response.Parameter?.Value;

      return response.Parameter.Value;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Erro ao buscar parâmetro ${name}: ${error.message}`,
      );
    }
  }
}
