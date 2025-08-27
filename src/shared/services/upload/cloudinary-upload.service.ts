import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import { IUploadService, UploadResult } from '../../interfaces/upload.interface';

@Injectable()
export class CloudinaryUploadService implements IUploadService {
  constructor(private readonly configService: ConfigService) {
    cloudinary.config({
      cloud_name: this.configService.get('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get('CLOUDINARY_API_SECRET'),
    });
  }

  async uploadSingle(file: Express.Multer.File): Promise<UploadResult> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: 'products',
          resource_type: 'image',
          transformation: [
            { quality: 'auto:good' },
            { format: 'auto' }
          ]
        },
        (error, result) => {
          if (error) return reject(error);

          resolve({
            url: result!.secure_url,
            publicId: result!.public_id,
            originalName: file.originalname,
            size: result!.bytes,
            mimetype: file.mimetype
          });
        }
      ).end(file.buffer);
    });
  }

  async uploadMultiple(files: Express.Multer.File[]): Promise<UploadResult[]> {
    const uploadPromises = files.map(file => this.uploadSingle(file));
    return Promise.all(uploadPromises);
  }

  async delete(publicId: string): Promise<void> {
    try {
      await cloudinary.uploader.destroy(publicId);
    } catch (error) {
      console.warn(`Failed to delete from Cloudinary: ${publicId}`, error);
    }
  }

  getUrl(publicId: string): string {
    return cloudinary.url(publicId);
  }
}