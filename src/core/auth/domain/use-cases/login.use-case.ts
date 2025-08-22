// src/use-cases/auth/login.use-case.ts
import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IAuthRepository, AUTH_REPOSITORY } from 'src/core/auth/repositories/auth.repository';
import * as bcrypt from 'bcrypt';
import { sanitizeUser } from 'src/shared/utils/sanitize-user';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(AUTH_REPOSITORY)
    private readonly authRepository: IAuthRepository,
    private readonly jwtService: JwtService,
  ) { }

  async execute(email: string, password: string) {
    const user = await this.authRepository.findByEmail(email);

    if (!user) throw new UnauthorizedException('Credenciais inválidas');

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) throw new UnauthorizedException('Credenciais inválidas');

    const payload = { sub: user.id, email: user.email, role: user.role };
    const accessToken = this.jwtService.sign(payload, {expiresIn:'15m'});
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.authRepository.updateRefreshToken(user.id, hashedRefreshToken);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      user: sanitizeUser(user),
    };
  }
}
