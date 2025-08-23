import { Module } from '@nestjs/common';
import { SystemConfigService } from '../services/system-config.service';
import { SystemConfigController } from 'src/core/admin/controllers/system-config.controller';
import { PrismaService } from '../prisma/prisma.service';
import { AuthModule } from 'src/core/auth/domain/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [SystemConfigController],
  providers: [
    PrismaService,
    SystemConfigService
  ],
  exports: [SystemConfigService]
})
export class SystemConfigModule { }