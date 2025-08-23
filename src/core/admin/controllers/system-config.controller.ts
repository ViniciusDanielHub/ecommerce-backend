import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { RolesGuard } from 'src/shared/guards/roles-guard';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { SystemConfigService } from 'src/shared/services/system-config.service';
import { UpdateDefaultStoreNameDto } from '../dtos/update-default-store-name.dto';

@Controller('admin/config')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
export class SystemConfigController {
  constructor(
    private readonly systemConfigService: SystemConfigService
  ) { }

  @Get('default-store-name')
  async getDefaultStoreName() {
    const defaultStoreName = await this.systemConfigService.getDefaultStoreName();
    return {
      defaultStoreName
    };
  }

  @Post('default-store-name')
  async updateDefaultStoreName(@Body() dto: UpdateDefaultStoreNameDto) {
    await this.systemConfigService.setDefaultStoreName(dto.defaultStoreName);
    return {
      message: 'Nome padrão da loja atualizado com sucesso',
      defaultStoreName: dto.defaultStoreName
    };
  }
}