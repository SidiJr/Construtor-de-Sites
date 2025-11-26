// src/pagina/dto/create-pagina.dto.ts
import {
  IsInt,
  IsOptional,
  IsString,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ComponentePaginaDto {
  @IsInt({ message: 'O componenteId deve ser um número inteiro.' })
  componenteId: number;

  @IsInt({ message: 'A ordem do componente deve ser um número inteiro.' })
  ordem: number;
}

export class CreatePaginaDto {
  @IsString({ message: 'É necessário informar um título para a página.' })
  titulo: string;

  @IsString({ message: 'É necessário informar o endereço da página.' })
  endereco: string;

  @IsOptional()
  @IsInt({ message: 'O siteId deve ser um número inteiro.' })
  siteId?: number;

  @IsOptional()
  @IsInt({ message: 'O layoutId deve ser um número inteiro.' })
  layoutId?: number;

  @IsOptional()
  @IsArray({ message: 'componentes deve ser um array.' })
  @ValidateNested({ each: true })
  @Type(() => ComponentePaginaDto)
  componentes?: ComponentePaginaDto[];
}
