// src/infrastructure/auth/prisma/prisma-auth.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { IAuthRepository } from 'src/core/auth/repositories/auth.repository';
import { Role } from '@prisma/client';

@Injectable()
export class PrismaAuthRepository implements IAuthRepository {
  constructor(private readonly prisma: PrismaService) { }

  async register(data: { name: string; email: string; password: string }) {
    return this.prisma.user.create({ data });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  findById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async updateRefreshToken(userId: string, token: string | null) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: token },
    });
  }

  async deleteUser(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        // Não retorna password e refreshToken por segurança
      }
    });
  }

  async promoteUser(userId: string, newRole: Role) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { role: newRole },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      }
    });
  }

  async setResetPasswordToken(email: string, token: string, expires: Date) {
    return this.prisma.user.update({
      where: { email },
      data: { resetPasswordToken: token, resetPasswordExpires: expires },
    });
  }

  async findByResetToken(token: string) {
    return this.prisma.user.findFirst({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: {
          gt: new Date(), // ainda não expirou
        },
      },
    });
  }

  async updatePassword(userId: string, hashedPassword: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordExpires: null,
      },
    });
  }

}
