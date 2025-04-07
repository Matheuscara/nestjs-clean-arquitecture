import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(UserModule, {
    snapshot: true,
  });
  app.useLogger(app.get(Logger));

  await app.listen(process.env.port ?? 3000);
}
bootstrap();
