import { IsEnum, IsObject, IsOptional, IsString } from 'class-validator';
import { TipoComponente } from '@prisma/client';

export class CreateComponenteDto {
  @IsString({ message: 'É necessário informar um nome para o componente.' })
  nome: string;

  @IsEnum(TipoComponente, {
    message: 'É necessário informar um tipo para o componente.',
  })
  tipo: TipoComponente;

  @IsOptional()
  @IsObject({ message: 'As configurações devem ser um objeto válido.' })
  configuracoes?: Record<string, any>;
}
