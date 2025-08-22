import { Body, Controller, Post, Delete, Req, UseGuards } from '@nestjs/common';
import { RegisterUseCase } from 'src/core/auth/domain/use-cases/register.use-case';
import { LoginUseCase } from 'src/core/auth/domain/use-cases/login.use-case';
import { RefreshTokenUseCase } from 'src/core/auth/domain/use-cases/refresh-token-use-case';
import { DeleteUserAccountUseCase } from 'src/core/auth/domain/use-cases/delete-user-account.use-case';

import { RegisterDto } from '../dtos/register.dto';
import { LoginDto } from '../dtos/login.dto';
import { RefreshTokenDto } from '../dtos/refresh-token-dto';
import { Public } from 'src/shared/decorators/public.decorator';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { RequestPasswordResetUseCase } from '../domain/use-cases/request-password-reset.use-case'; 
import { ResetPasswordUseCase } from '../domain/use-cases/reset-password.use-case';
import { RequestPasswordResetDto } from '../dtos/request-password-reset.dto';
import { ResetPasswordDto } from '../dtos/reset-password.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private registerUseCase: RegisterUseCase,
    private loginUseCase: LoginUseCase,
    private refreshTokenUseCase: RefreshTokenUseCase,
    private deleteAccountUseCase: DeleteUserAccountUseCase,
    private readonly requestPasswordResetUseCase: RequestPasswordResetUseCase,
    private readonly resetPasswordUseCase: ResetPasswordUseCase,
  ) {}

  @Public()
  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.registerUseCase.execute(dto);
  }

  @Public()
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.loginUseCase.execute(dto.email, dto.password);
  }

  @Post('refresh')
  async refresh(@Body() dto: RefreshTokenDto) {
    return this.refreshTokenUseCase.execute(dto.userId, dto.refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete')
  async deleteAccount(@Req() req: Request & { user: { userId: string } }) { 
    const userId = req.user.userId;
    return this.deleteAccountUseCase.execute(userId);
  }

  @Public()
  @Post('request-password-reset')
  async requestPasswordReset(@Body() dto: RequestPasswordResetDto) {
    return this.requestPasswordResetUseCase.execute(dto.email);
  }

  @Public()
  @Post('reset-password')
  async resetPassword(@Body() dto: ResetPasswordDto) {
    return this.resetPasswordUseCase.execute(dto.token, dto.newPassword);
  }
}
