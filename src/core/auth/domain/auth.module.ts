import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from '../controllers/auth.controller';
import { RegisterUseCase } from 'src/core/auth/domain/use-cases/register.use-case';
import { LoginUseCase } from 'src/core/auth/domain/use-cases/login.use-case';
import { RefreshTokenUseCase } from 'src/core/auth/domain/use-cases/refresh-token-use-case';
import { DeleteUserAccountUseCase } from 'src/core/auth/domain/use-cases/delete-user-account.use-case';

import { PrismaAuthRepository } from 'src/infrastructure/auth/prisma/prisma-auth.repository';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { jwtConstants } from 'src/shared/config/jwt.config';
import { AUTH_REPOSITORY } from '../repositories/auth.repository';
import { JwtStrategy } from 'src/shared/strategies/jwt.strategy';
import { RequestPasswordResetUseCase } from './use-cases/request-password-reset.use-case';
import { ResetPasswordUseCase } from './use-cases/reset-password.use-case';


@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || jwtConstants.secret,
      signOptions: { expiresIn: '1d' }, // tempo do token
    }),
  ],
  controllers: [AuthController],
  providers: [
    JwtStrategy,
    PrismaService,
    RegisterUseCase,
    LoginUseCase,
    RefreshTokenUseCase,
    DeleteUserAccountUseCase,
    RequestPasswordResetUseCase,
    ResetPasswordUseCase,
    {
      provide: AUTH_REPOSITORY,
      useClass: PrismaAuthRepository,
    },
  ],
  exports: [JwtModule, AUTH_REPOSITORY],
})
export class AuthModule { }
