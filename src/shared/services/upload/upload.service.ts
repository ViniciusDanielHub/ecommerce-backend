import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UploadFactoryService } from './upload-factory.service';
import { UploadResult } from '../../interfaces/upload.interface';

@Injectable()
export class UploadService {
  private readonly maxFileSize: number;
  private readonly allowedFormats: string[];

  constructor(
    private readonly configService: ConfigService,
    private readonly uploadFactory: UploadFactoryService,
  ) {
    this.maxFileSize = this.configService.get('UPLOAD_MAX_FILE_SIZE', 5242880); // 5MB
    this.allowedFormats = this.configService.get('UPLOAD_ALLOWED_FORMATS', 'jpg,jpeg,png,webp').split(',');
  }

  private validateFile(file: Express.Multer.File): void {
    // Verificar tamanho
    if (file.size > this.maxFileSize) {
      throw new BadRequestException(`Arquivo muito grande. Máximo permitido: ${this.maxFileSize / 1024 / 1024}MB`);
    }

    // Verificar formato
    const extension = file.originalname.split('.').pop()?.toLowerCase();
    if (!extension || !this.allowedFormats.includes(extension)) {
      throw new BadRequestException(`Formato não permitido. Formatos aceitos: ${this.allowedFormats.join(', ')}`);
    }

    // Verificar MIME type
    if (!file.mimetype.startsWith('image/')) {
      throw new BadRequestException('Arquivo deve ser uma imagem');
    }
  }

  async uploadSingle(file: Express.Multer.File): Promise<UploadResult> {
    this.validateFile(file);
    const uploadService = this.uploadFactory.getUploadService();
    return uploadService.uploadSingle(file);
  }

  async uploadMultiple(files: Express.Multer.File[]): Promise<UploadResult[]> {
    if (!files || files.length === 0) {
      throw new BadRequestException('Nenhum arquivo enviado');
    }

    // Validar todos os arquivos
    files.forEach(file => this.validateFile(file));

    const uploadService = this.uploadFactory.getUploadService();
    return uploadService.uploadMultiple(files);
  }

  async delete(publicId: string): Promise<void> {
    const uploadService = this.uploadFactory.getUploadService();
    return uploadService.delete(publicId);
  }

  getUrl(publicId: string): string {
    const uploadService = this.uploadFactory.getUploadService();
    return uploadService.getUrl(publicId);
  }

  // Método para alternar entre URL e upload
  async processImageData(imageData: any): Promise<{ url: string; publicId?: string }> {
    // Se já é uma URL (começa com http), retorna como está
    if (typeof imageData === 'string' && imageData.startsWith('http')) {
      return { url: imageData };
    }

    // Se é um arquivo de upload, processa
    if (imageData && imageData.buffer) {
      const result = await this.uploadSingle(imageData);
      return { url: result.url, publicId: result.publicId };
    }

    throw new BadRequestException('Dados de imagem inválidos');
  }
}