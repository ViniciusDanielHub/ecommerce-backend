import { Controller, Get, Put, UseGuards, Body, Param, Delete, Req } from '@nestjs/common';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { RolesGuard } from 'src/shared/guards/roles-guard';
import { PromoteUserUseCase } from '../use-cases/promote-user.use-case';
import { GetAllUsersUseCase } from '../use-cases/get-all-users.use-case';
import { PromoteUserDto } from '../dtos/promote-user.dto';
import { RequestWithUser } from 'src/shared/types/request-with-user';
import { DeleteUserUseCase } from '../use-cases/delete-user.use-case';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminController {
  constructor(
    private readonly promoteUserUseCase: PromoteUserUseCase,
    private readonly getAllUsersUseCase: GetAllUsersUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) { }

  @Get('users')
  @Roles(Role.ADMIN)
  async getAllUsers() {
    return this.getAllUsersUseCase.execute();
  }

  @Put('promote-user')
  @Roles(Role.ADMIN)
  async promoteUser(@Body() dto: PromoteUserDto) {
    return this.promoteUserUseCase.execute(dto.userId, dto.newRole);
  }

  // Endpoint alternativo usando parâmetros da URL
  @Put('users/:userId/role/:newRole')
  @Roles(Role.ADMIN)
  async promoteUserByParams(
    @Param('userId') userId: string,
    @Param('newRole') newRole: Role,
  ) {
    return this.promoteUserUseCase.execute(userId, newRole);
  }

  @Delete('users/:userId')
  @Roles(Role.ADMIN)
  async deleteUser(
    @Param('userId') userIdToDelete: string,
    @Req() req: RequestWithUser,
  ) {
    const adminUserId = req.user.userId;
    return this.deleteUserUseCase.execute(userIdToDelete, adminUserId);
  }

  @Get()
  @Roles(Role.ADMIN)
  findAll() {
    return 'Apenas ADMIN pode ver isso';
  }
}
