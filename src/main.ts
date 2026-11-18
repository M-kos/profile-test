import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module.js';
import { ConsoleLogger, filterLogLevels } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      logLevels: filterLogLevels(process.env.LOG_LEVEL ?? 'log'),
      timestamp: true,
    }),
  });
  await app.listen(process.env.PROFILE_PORT ?? 8080);
  app.enableShutdownHooks();
}
await bootstrap();
