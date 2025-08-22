import { Injectable, BadRequestException } from '@nestjs/common';
import { AUTH_REPOSITORY, IAuthRepository } from '../../repositories/auth.repository';
import { Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ResetPasswordUseCase {
  constructor(@Inject(AUTH_REPOSITORY) private readonly authRepository: IAuthRepository) { }

  async execute(token: string, newPassword: string) {
    const user = await this.authRepository.findByResetToken(token);
    if (!user) throw new BadRequestException('Token inválido ou expirado');

    // Validar se a nova senha atende aos critérios mínimos
    if (newPassword.length < 6) {
      throw new BadRequestException('A senha deve ter pelo menos 6 caracteres');
    }

    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS ?? '10', 10);
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    await this.authRepository.updatePassword(user.id, hashedPassword);

    return {
      message: 'Senha redefinida com sucesso',
      success: true
    };
  }
}
