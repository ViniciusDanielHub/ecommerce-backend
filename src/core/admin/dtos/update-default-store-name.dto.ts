import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateDefaultStoreNameDto {
  @IsString({ message: 'Nome da loja deve ser uma string' })
  @IsNotEmpty({ message: 'Nome da loja é obrigatório' })
  defaultStoreName!: string;
}