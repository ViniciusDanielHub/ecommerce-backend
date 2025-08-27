import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IUploadService, UploadResult } from '../../interfaces/upload.interface';
import * as fs from 'fs/promises';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class LocalUploadService implements IUploadService {
  private readonly uploadPath: string;
  private readonly baseUrl: string;

  constructor(private readonly configService: ConfigService) {
    this.uploadPath = this.configService.get('LOCAL_UPLOAD_PATH', 'uploads/products');
    this.baseUrl = this.configService.get('LOCAL_UPLOAD_BASE_URL', 'http://localhost:3000');
    this.ensureUploadDirectory();
  }

  private async ensureUploadDirectory() {
    try {
      await fs.access(this.uploadPath);
    } catch {
      await fs.mkdir(this.uploadPath, { recursive: true });
    }
  }
           
  async uploadSingle(file: Express.Multer.File): Promise<UploadResult> {
    const fileName = `${uuidv4()}-${Date.now()}${path.extname(file.originalname)}`;
    const filePath = path.join(this.uploadPath, fileName);

    await fs.writeFile(filePath, file.buffer); //buffer = escreve dados na memoria, write salva no disco

    return {
      url: `${this.baseUrl}/${this.uploadPath}/${fileName}`,
      publicId: fileName,
      originalName: file.originalname,
      size: file.size,
      mimetype: file.mimetype
    };
  }

  async uploadMultiple(files: Express.Multer.File[]): Promise<UploadResult[]> {
    const results: UploadResult[] = [];

    for (const file of files) {
      const result = await this.uploadSingle(file);
      results.push(result);
    }

    return results;
  }

  async delete(publicId: string): Promise<void> {
    try {
      const filePath = path.join(this.uploadPath, publicId);
      await fs.unlink(filePath);
    } catch (error) {
      console.warn(`Failed to delete file: ${publicId}`, error);
    }
  }

  getUrl(publicId: string): string {
    return `${this.baseUrl}/${this.uploadPath}/${publicId}`;
  }
}