// src/pagina/dto/create-pagina.dto.ts
import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreatePaginaDto {
  @IsString({ message: 'É necessário informar um título para a página.' })
  titulo: string;

  @IsString({ message: 'É necessário informar o endereço da página.' })
  endereco: string;

  @IsInt({ message: 'É necessário informar a qual site pertence esta página.' })
  siteId: number;

  @IsOptional()
  componentesIds?: number[]; // IDs dos componentes que essa página terá
}
