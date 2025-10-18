import { IsString, IsEnum, IsOptional, IsObject } from 'class-validator';
import { TipoComponente } from './tipo-componente.enum.dto';

export class CreateComponenteDto {
  @IsString()
  nome: string;

  @IsEnum(TipoComponente)
  tipo: TipoComponente;

  @IsOptional()
  @IsObject()
  configuracoes?: Record<string, any>;
}
