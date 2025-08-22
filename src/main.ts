// src/main.ts
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './presentation/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,               // Remove propriedades não esperadas
      forbidNonWhitelisted: true,   // Erro se o payload tem campos extras
      transform: true,              // Converte tipos (ex: string -> number)
    }),
  );

  await app.listen(3000);
  console.log('🚀 Server running on http://localhost:3000');
}
bootstrap();
