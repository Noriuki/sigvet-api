import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.PROD_URL || 'http://localhost:3000',
  });

  app.setGlobalPrefix('/api');
  await app.listen(process.env.PORT || 3001);
}

bootstrap();
