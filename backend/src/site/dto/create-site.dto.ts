import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateSiteDto {
  @IsString({ message: 'É necessário informar um nome para o site.' })
  nome: string;

  @IsOptional()
  @IsString({ message: 'É necessário informar um domínio para o site.' })
  dominio?: string;

  @IsInt({ message: 'É necessário informar um usuário.' })
  usuarioId: number;
}
