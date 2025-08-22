import { IsOptional, IsString, IsInt, Min, Max, IsBoolean, IsUUID } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetCategoriesQueryDto {
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
  parentId?: string;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  isActive?: boolean;

  @IsOptional()
  @IsString()
  sortBy?: string = 'name';

  @IsOptional()
  @IsString()
  sortOrder?: 'asc' | 'desc' = 'asc';

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  includeChildren?: boolean = false;
}