import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AUTH_REPOSITORY, IAuthRepository } from '../../repositories/auth.repository';

@Injectable()
export class DeleteUserAccountUseCase {
  constructor(
    @Inject(AUTH_REPOSITORY)
    private readonly authRepo: IAuthRepository,
  ) { }

  async execute(userId: string) {
    const user = await this.authRepo.findById(userId);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    await this.authRepo.deleteUser(userId);

    return { message: 'Conta apagada com sucesso' };
  }
}