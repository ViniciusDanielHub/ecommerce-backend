// src/core/products/dtos/create-product.dto.ts (ATUALIZADO)
import {
  IsString,
  IsNotEmpty,
  IsDecimal,
  IsOptional,
  IsUUID,
  IsEnum,
  IsInt,
  Min,
  IsBoolean,
  IsArray,
  ValidateNested,
  IsUrl
} from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { ProductStatus } from '@prisma/client';

class CreateProductImageDto {
  @IsUrl({}, { message: 'URL da imagem deve ser válida' })
  @IsNotEmpty({ message: 'URL da imagem é obrigatória' })
  url!: string;

  @IsOptional()
  @IsString()
  alt?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;

  @IsOptional()
  @IsBoolean()
  isMain?: boolean;
}

class CreateProductVariantDto {
  @IsString()
  @IsNotEmpty({ message: 'Nome da variação é obrigatório' })
  name!: string; // Ex: "Cor", "Tamanho"

  @IsString()
  @IsNotEmpty({ message: 'Valor da variação é obrigatório' })
  value!: string; // Ex: "Azul", "M"

  @IsOptional()
  @IsDecimal({ decimal_digits: '2' })
  @Transform(({ value }) => value ? parseFloat(value) : null)
  price?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  stock?: number;

  @IsOptional()
  @IsString()
  sku?: string;
}

export class CreateProductDto {
  @IsString()
  @IsNotEmpty({ message: 'Nome do produto é obrigatório' })
  name!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  @IsNotEmpty({ message: 'Slug é obrigatório' })
  slug!: string;

  @IsOptional()
  @IsString()
  sku?: string;

  @IsDecimal({ decimal_digits: '2' })
  @Transform(({ value }) => parseFloat(value))
  price!: number;

  @IsOptional()
  @IsDecimal({ decimal_digits: '2' })
  @Transform(({ value }) => value ? parseFloat(value) : null)
  comparePrice?: number;

  @IsOptional()
  @IsDecimal({ decimal_digits: '2' })
  @Transform(({ value }) => value ? parseFloat(value) : null)
  costPrice?: number;

  @IsOptional()
  @IsDecimal({ decimal_digits: '3' })
  @Transform(({ value }) => value ? parseFloat(value) : null)
  weight?: number;

  @IsOptional()
  dimensions?: {
    height?: number;
    width?: number;
    depth?: number;
  };

  @IsOptional()
  @IsEnum(ProductStatus)
  status?: ProductStatus;

  @IsOptional()
  @IsInt()
  @Min(0)
  stock?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  minStock?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  maxStock?: number;

  @IsOptional()
  @IsBoolean()
  isDigital?: boolean;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsString()
  seoTitle?: string;

  @IsOptional()
  @IsString()
  seoDescription?: string;

  @IsUUID()
  @IsNotEmpty({ message: 'ID da categoria é obrigatório' })
  categoryId!: string;

  // REMOVIDO: storeId agora é opcional e será definido pelo sistema
  @IsOptional()
  @IsUUID()
  storeId?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductImageDto)
  images?: CreateProductImageDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductVariantDto)
  variants?: CreateProductVariantDto[];
}