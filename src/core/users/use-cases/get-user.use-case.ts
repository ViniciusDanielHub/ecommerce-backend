// src/core/users/use-cases/get-user.use-case.ts
import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { AUTH_REPOSITORY, IAuthRepository } from 'src/core/auth/repositories/auth.repository';
import { sanitizeUser } from 'src/shared/utils/sanitize-user';

@Injectable()
export class GetUserUseCase {
  constructor(
    @Inject(AUTH_REPOSITORY)
    private readonly authRepo: IAuthRepository,
  ) { }

  async execute(userId: string) {
    const user = await this.authRepo.findById(userId);

    if (!user) throw new NotFoundException('Usuário não encontrado');

    return sanitizeUser(user);
  }
}
