import { Module } from '@nestjs/common';
import { AdminController } from './controllers/admin.controller';
import { AuthModule } from '../auth/domain/auth.module';
import { PromoteUserUseCase } from './use-cases/promote-user.use-case';
import { GetAllUsersUseCase } from './use-cases/get-all-users.use-case';
import { DeleteUserUseCase } from './use-cases/delete-user.use-case';

@Module({
  imports: [AuthModule],
  controllers: [AdminController],
  providers: [
    PromoteUserUseCase,
    GetAllUsersUseCase,
    DeleteUserUseCase, 
  ],
})
export class AdminModule { }