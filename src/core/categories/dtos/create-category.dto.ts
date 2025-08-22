import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  IsBoolean,
  IsUrl
} from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty({ message: 'Nome da categoria é obrigatório' })
  name!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  @IsNotEmpty({ message: 'Slug é obrigatório' })
  slug!: string;

  @IsOptional()
  @IsUrl({}, { message: 'URL da imagem deve ser válida' })
  image?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsUUID()
  parentId?: string;
}