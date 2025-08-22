// src/core/users/users.module.ts
import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { GetUserUseCase } from './use-cases/get-user.use-case';
import { AUTH_REPOSITORY } from '../auth/repositories/auth.repository';
import { PrismaAuthRepository } from 'src/infrastructure/auth/prisma/prisma-auth.repository';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/shared/guards/roles-guard'; 
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';

@Module({
  controllers: [UsersController],
  providers: [
    PrismaService,
    GetUserUseCase,
    {
      provide: AUTH_REPOSITORY,
      useClass: PrismaAuthRepository,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard, // Primeiro valida o JWT
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard, // Depois valida as roles
    },
  ],
})
export class UsersModule { }
