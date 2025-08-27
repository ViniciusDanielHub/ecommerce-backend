import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UploadProvider } from '../enums/upload-provider.enum';

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

  async getUploadProvider(): Promise<UploadProvider> {
    const provider = await this.getConfig('UPLOAD_PROVIDER', UploadProvider.LOCAL);
    return provider as UploadProvider;
  }

  async setUploadProvider(provider: UploadProvider): Promise<void> {
    await this.setConfig('UPLOAD_PROVIDER', provider);
  }

  async getUploadMaxFileSize(): Promise<number> {
    const size = await this.getConfig('UPLOAD_MAX_FILE_SIZE', '5242880');
    return parseInt(size);
  }

  async setUploadMaxFileSize(size: number): Promise<void> {
    await this.setConfig('UPLOAD_MAX_FILE_SIZE', size.toString());
  }

  async getUploadAllowedFormats(): Promise<string[]> {
    const formats = await this.getConfig('UPLOAD_ALLOWED_FORMATS', 'jpg,jpeg,png,webp');
    return formats.split(',');
  }

  async setUploadAllowedFormats(formats: string[]): Promise<void> {
    await this.setConfig('UPLOAD_ALLOWED_FORMATS', formats.join(','));
  }
}