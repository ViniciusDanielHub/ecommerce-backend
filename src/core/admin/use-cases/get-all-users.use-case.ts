import { Inject, Injectable } from '@nestjs/common';
import { AUTH_REPOSITORY, IAuthRepository } from 'src/core/auth/repositories/auth.repository';

@Injectable()
export class GetAllUsersUseCase {
  constructor(
    @Inject(AUTH_REPOSITORY)
    private readonly authRepository: IAuthRepository,
  ) { }

  async execute() {
    const users = await this.authRepository.findAll();
    return {
      message: 'Lista de todos os usuários',
      users,
      total: users.length,
    };
  }
}