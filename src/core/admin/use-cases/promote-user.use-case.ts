import { Inject, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { AUTH_REPOSITORY, IAuthRepository } from 'src/core/auth/repositories/auth.repository';
import { Role } from '@prisma/client';

@Injectable()
export class PromoteUserUseCase {
  constructor(
    @Inject(AUTH_REPOSITORY)
    private readonly authRepository: IAuthRepository,
  ) { }

  async execute(userId: string, newRole: Role) {
    // Verificar se o usuário existe
    const user = await this.authRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    // Verificar se a role é diferente da atual
    if (user.role === newRole) {
      throw new BadRequestException(`Usuário já possui a role ${newRole}`);
    }

    // Atualizar a role do usuário
    const updatedUser = await this.authRepository.promoteUser(userId, newRole);

    return {
      message: `Usuário ${updatedUser.name} foi promovido para ${newRole} com sucesso`,
      user: updatedUser,
    };
  }
}