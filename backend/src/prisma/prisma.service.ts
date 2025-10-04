import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    try {
      await this.$connect();
      console.log('Prisma conectado ao MySQL');
    } catch (error) {
      console.error('Erro ao conectar no MySQL:', error);
      process.exit(1); // encerra o app se não conseguir conectar
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
