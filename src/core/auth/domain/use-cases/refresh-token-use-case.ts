// src/use-cases/auth/refresh-token.use-case.ts
import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { IAuthRepository, AUTH_REPOSITORY } from 'src/core/auth/repositories/auth.repository';
import { sanitizeUser } from 'src/shared/utils/sanitize-user';

@Injectable()
export class RefreshTokenUseCase {
  constructor(
    @Inject(AUTH_REPOSITORY)
    private readonly authRepository: IAuthRepository,
    private readonly jwtService: JwtService,
  ) { }

  async execute(userId: string, refreshToken: string) {
    const user = await this.authRepository.findById(userId);
    if (!user || !user.refreshToken) {
      throw new UnauthorizedException('Usuário ou token inválido');
    }

    const isValid = await bcrypt.compare(refreshToken, user.refreshToken);
    if (!isValid) throw new UnauthorizedException('Refresh token inválido');

    const payload = { sub: user.id, email: user.email };
    const newAccessToken = this.jwtService.sign(payload, { expiresIn: '15m' });

    const newRefreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
    });
    
    const hashed = await bcrypt.hash(newRefreshToken, 10);
    await this.authRepository.updateRefreshToken(user.id, hashed);

    return { 
      access_token: newAccessToken, 
      refresh_token: newRefreshToken,
      user: sanitizeUser(user),
    };
  }
}
