// src/core/users/controllers/users.controller.ts
import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { RolesGuard } from 'src/shared/guards/roles-guard'; 
import { Roles } from 'src/shared/decorators/roles.decorator';
import { GetUserUseCase } from '../use-cases/get-user.use-case';
import { RequestWithUser } from 'src/shared/types/request-with-user';
import { Role } from '@prisma/client';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard) // Autenticação e depois autorização
export class UsersController {
  constructor(private readonly getUserUseCase: GetUserUseCase) { }

  // Acesso permitido para todos os usuários autenticados
  @Get('me')
  @Roles(Role.USER, Role.ADMIN) 
  async getMe(@Req() req: RequestWithUser) {
    return this.getUserUseCase.execute(req.user.userId);
  }

  // Acesso exclusivo para administradores
  @Get()
  @Roles(Role.ADMIN)
  async getAllUsers() {
    return { message: 'Aqui listamos todos os usuários, mas só admins podem ver' };
  }
}
