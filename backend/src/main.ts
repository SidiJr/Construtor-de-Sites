import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3001',
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap()
  .then(() => console.log('App iniciado com sucesso'))
  .catch((err) => {
    console.error('Erro ao iniciar o app:', err);
    process.exit(1);
  });
