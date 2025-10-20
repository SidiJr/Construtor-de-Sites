import { Module } from '@nestjs/common';
import { PaginaService } from './pagina.service';
import { PaginaController } from './pagina.controller';

@Module({
  controllers: [PaginaController],
  providers: [PaginaService],
})
export class PaginaModule {}
