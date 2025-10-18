import { Module } from '@nestjs/common';
import { ComponenteService } from './componente.service';
import { ComponenteController } from './componente.controller';

@Module({
  controllers: [ComponenteController],
  providers: [ComponenteService],
})
export class ComponenteModule {}
