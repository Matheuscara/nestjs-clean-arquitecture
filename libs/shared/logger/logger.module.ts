import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { LoggerModule as LoggerModulePino } from 'nestjs-pino';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        LOG_TYPE: Joi.string(),
        LOG_LEVEL: Joi.string().default('info'),
      }),
    }),
    LoggerModulePino.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const logLevel = configService.get('LOG_LEVEL') || 'info';

        if (configService.get('LOG_TYPE') === 'pino-pretty') {
          return {
            pinoHttp: {
              customProps: () => ({
                context: 'HTTP',
              }),
              level: logLevel,
              transport: {
                target: 'pino-pretty',
                options: {
                  colorize: true,
                  singleLine: true,
                  ignore: 'req,res,headers',
                  colorizeObjects: true,
                },
              },
            },
          };
        }

        return {
          pinoHttp: {
            customProps: () => ({
              context: 'HTTP',
            }),
            level: logLevel,
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  exports: [LoggerModulePino],
})
export class LoggerModule {}
