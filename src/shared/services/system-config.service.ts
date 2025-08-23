import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SystemConfigService {
  constructor(private readonly prisma: PrismaService) { }

  async getConfig(key: string, defaultValue: string = ''): Promise<string> {
    const config = await this.prisma.systemConfig.findUnique({
      where: { key }
    });

    return config?.value || defaultValue;
  }

  async setConfig(key: string, value: string): Promise<void> {
    await this.prisma.systemConfig.upsert({
      where: { key },
      update: { value, updatedAt: new Date() },
      create: { key, value }
    });
  }

  async getDefaultStoreName(): Promise<string> {
    return await this.getConfig('DEFAULT_STORE_NAME', 'Minha Loja');
  }

  async setDefaultStoreName(name: string): Promise<void> {
    await this.setConfig('DEFAULT_STORE_NAME', name);
  }
}