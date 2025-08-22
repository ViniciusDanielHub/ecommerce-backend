// src/use-cases/auth/register.use-case.ts
import { Injectable, Inject, ConflictException } from '@nestjs/common';
import { IAuthRepository, AUTH_REPOSITORY } from 'src/core/auth/repositories/auth.repository';
import { RegisterDto } from '../../dtos/register.dto'; 
import * as bcrypt from 'bcrypt';
import { sanitizeUser } from 'src/shared/utils/sanitize-user';

@Injectable()
export class RegisterUseCase {
  constructor(
    @Inject(AUTH_REPOSITORY)
    private readonly authRepo: IAuthRepository,
  ) { }

  async execute(data: RegisterDto) {
    const userExists = await this.authRepo.findByEmail(data.email);
    if (userExists) {
      throw new ConflictException('Email já está em uso');
    }

    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS ?? '10') || 10;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

    const user = await this.authRepo.register({
      name: data.name,
      email: data.email,
      password: hashedPassword,
    });

    return {
      message: 'Usuário registrado com sucesso',
      user: sanitizeUser(user)
    };
  }
}
