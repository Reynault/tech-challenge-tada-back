import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as Config from 'config';
import { AppConfig } from './shared/interfaces/app-config.interface';

async function bootstrap(config: AppConfig) {
  const app = await NestFactory.create(AppModule);
  // setting validation pipe configuration
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({ origin: config.cors });
  await app.listen(config.port, config.host);
}
bootstrap(Config.get<AppConfig>('server')).then();
