import { IsString, IsNotEmpty, IsEnum, IsInt, Min, IsArray } from 'class-validator';
import { UploadProvider } from 'src/shared/enums/upload-provider.enum';

export class UpdateDefaultStoreNameDto {
  @IsString()
  defaultStoreName!: string;
}

export class UpdateUploadConfigDto {
  @IsEnum(UploadProvider)
  provider!: UploadProvider;

  @IsInt()
  @Min(1)
  maxFileSize!: number;

  @IsArray()
  @IsString({ each: true })
  allowedFormats!: string[];
}
