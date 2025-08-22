import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { AUTH_REPOSITORY, IAuthRepository } from '../../repositories/auth.repository';
import { Inject } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { addHours } from 'date-fns';

@Injectable()
export class RequestPasswordResetUseCase {
  constructor(@Inject(AUTH_REPOSITORY) private readonly authRepository: IAuthRepository) { }

  async execute(email: string) {
    if (!email) {
      throw new BadRequestException('Email é obrigatório');
    }
    const user = await this.authRepository.findByEmail(email);
    if (!user) throw new NotFoundException('Usuário não encontrado');

    const token = randomBytes(32).toString('hex');
    const expires = addHours(new Date(), 1); // 1 hora

    await this.authRepository.setResetPasswordToken(email, token, expires);

    // Aqui você enviaria o e-mail (omiti para simplificar)
    return {
      message: 'Token de recuperação gerado e enviado por e-mail',
      success: true,
      token 
    };
  }
}
