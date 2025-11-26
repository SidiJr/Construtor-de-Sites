import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const allowedOrigin = process.env.FRONTEND_URL;
  const app = await NestFactory.create(AppModule);

  // Validação global dos DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
      transform: true,
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  app.enableCors({
    origin: allowedOrigin,
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 8080);
}
bootstrap()
  .then(() => console.log('App iniciado com sucesso'))
  .catch((err) => {
    console.error('Erro ao iniciar o app:', err);
    process.exit(1);
  });
