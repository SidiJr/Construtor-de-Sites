import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const allowedOrigin = process.env.FRONTEND_URL;
  const app = await NestFactory.create(AppModule);
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
