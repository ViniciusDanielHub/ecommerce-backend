import { IsOptional, IsString, IsInt, Min, Max, IsEnum, IsUUID } from 'class-validator';
import { Transform } from 'class-transformer';
import { ProductStatus } from '@prisma/client';

export class GetProductsQueryDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Transform(({ value }) => parseInt(value))
  page?: number = 1;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  @Transform(({ value }) => parseInt(value))
  limit?: number = 10;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @IsOptional()
  @IsUUID()
  storeId?: string;

  @IsOptional()
  @IsEnum(ProductStatus)
  status?: ProductStatus;

  @IsOptional()
  @IsString()
  sortBy?: string = 'createdAt';

  @IsOptional()
  @IsString()
  sortOrder?: 'asc' | 'desc' = 'desc';

  @IsOptional()
  @Transform(({ value }) => value ? parseFloat(value) : null)
  minPrice?: number;

  @IsOptional()
  @Transform(({ value }) => value ? parseFloat(value) : null)
  maxPrice?: number;
}
