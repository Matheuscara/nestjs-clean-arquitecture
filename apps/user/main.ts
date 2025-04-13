import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { Logger } from 'nestjs-pino';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(UserModule, {
    snapshot: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useLogger(app.get(Logger));

  await app.listen(process.env.port ?? 3000);
}
bootstrap();
