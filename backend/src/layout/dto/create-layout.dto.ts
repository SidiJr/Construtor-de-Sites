import { IsString, IsOptional, IsArray, IsInt } from 'class-validator';

export class CreateLayoutDto {
  @IsString()
  nome: string;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  componentesIds?: number[];
}
