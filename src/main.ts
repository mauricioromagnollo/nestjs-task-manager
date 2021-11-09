import { TransformInterceptor } from './transform.interceptor';
import { ValidationPipe, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const logger = new Logger();
  const configService = new ConfigService();

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.enableCors({
    origin: configService.get('CORS_ORIGIN'),
    credentials: true,
  });
  const port = process.env.PORT;
  await app.listen(port);
  logger.log(`[*] Application listening on port ${port}`);
}
bootstrap();
