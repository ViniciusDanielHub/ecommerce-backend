import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { IUploadService, UploadResult } from '../../interfaces/upload.interface';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';

@Injectable()
export class AwsUploadService implements IUploadService {
  private readonly s3Client: S3Client;
  private readonly bucketName: string;

  constructor(private readonly configService: ConfigService) {
    this.bucketName = this.configService.get('AWS_BUCKET_NAME')!;

    this.s3Client = new S3Client({
      region: this.configService.get('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID')!,
        secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY')!,
      },
    });
  }

  async uploadSingle(file: Express.Multer.File): Promise<UploadResult> {
    const fileName = `products/${uuidv4()}-${Date.now()}${path.extname(file.originalname)}`;

    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    await this.s3Client.send(command);

    const url = `https://${this.bucketName}.s3.amazonaws.com/${fileName}`;

    return {
      url,
      publicId: fileName,
      originalName: file.originalname,
      size: file.size,
      mimetype: file.mimetype
    };
  }

  async uploadMultiple(files: Express.Multer.File[]): Promise<UploadResult[]> {
    const uploadPromises = files.map(file => this.uploadSingle(file));
    return Promise.all(uploadPromises);
  }

  async delete(publicId: string): Promise<void> {
    try {
      const command = new DeleteObjectCommand({
        Bucket: this.bucketName,
        Key: publicId,
      });

      await this.s3Client.send(command);
    } catch (error) {
      console.warn(`Failed to delete from AWS S3: ${publicId}`, error);
    }
  }

  getUrl(publicId: string): string {
    return `https://${this.bucketName}.s3.amazonaws.com/${publicId}`;
  }
}