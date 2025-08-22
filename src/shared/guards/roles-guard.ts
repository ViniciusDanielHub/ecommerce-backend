// src/shared/guards/roles-guard.ts
import { Injectable, CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { AUTH_REPOSITORY, IAuthRepository } from 'src/core/auth/repositories/auth.repository';
import { Role } from '@prisma/client';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(AUTH_REPOSITORY) private readonly authRepo: IAuthRepository,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(), //metodo especifico
      context.getClass(), //classe do controller
    ]);

    if (!requiredRoles || requiredRoles.length === 0) {
      return true; // rota pública / sem roles
    }

    const req = context.switchToHttp().getRequest();
    const user = req.user;
    if (!user?.userId) return false;

    // Busca o usuário no DB e valida o papel atual
    const userFromDb = await this.authRepo.findById(user.userId);
    if (!userFromDb) return false;

    return requiredRoles.includes(userFromDb.role as Role);
  }
}
