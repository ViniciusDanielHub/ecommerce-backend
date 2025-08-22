import { Inject, Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { AUTH_REPOSITORY, IAuthRepository } from 'src/core/auth/repositories/auth.repository';

@Injectable()
export class DeleteUserUseCase {
  constructor(
    @Inject(AUTH_REPOSITORY)
    private readonly authRepository: IAuthRepository,
  ) { }

  async execute(userIdToDelete: string, adminUserId: string) {
    // Verificar se o usuário existe
    const userToDelete = await this.authRepository.findById(userIdToDelete);
    if (!userToDelete) {
      throw new NotFoundException('Usuário não encontrado');
    }

    // Verificar se o admin não está tentando se deletar
    if (userIdToDelete === adminUserId) {
      throw new BadRequestException('Você não pode deletar sua própria conta');
    }

    await this.authRepository.deleteUser(userIdToDelete);

    return {
      message: `Usuário ${userToDelete.name} foi deletado com sucesso`,
      deletedUser: {
        id: userToDelete.id,
        name: userToDelete.name,
        email: userToDelete.email,
        role: userToDelete.role,
      },
    };
  }
}