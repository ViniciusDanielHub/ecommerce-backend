import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @IsString()
  @IsNotEmpty({ message: 'Token é obrigatório' })
  token!: string;

  @IsString()
  @IsNotEmpty({ message: 'Nova senha é obrigatória' })
  @MinLength(6, { message: 'Senha deve ter pelo menos 6 caracteres' })
  newPassword!: string;
}