/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const globalPrefix = 'api';
  // app.setGlobalPrefix(globalPrefix);

  app.use(helmet());
  app.enableCors({
    origin: function (origin, callback) {
      callback(null, origin);
    },
    // credentials: true,
    optionsSuccessStatus: 200,
  });

  const port = process.env.PORT || 3333;
  await app.listen(port);
  Logger.log(
    // `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
    `🚀 Application is running on: http://localhost:${port}`
  );
}

bootstrap();
