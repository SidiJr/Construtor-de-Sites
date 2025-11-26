import { IsString, IsOptional, IsArray, IsInt } from 'class-validator';

export class UpdateLayoutDto {
  @IsOptional()
  @IsString()
  nome?: string;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  componentesIds?: number[];
}
