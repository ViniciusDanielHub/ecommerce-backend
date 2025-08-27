import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UploadService } from '../services/upload/upload.service';
import { UploadFactoryService } from '../services/upload/upload-factory.service';
import { LocalUploadService } from '../services/upload/local-upload.service';
import { CloudinaryUploadService } from '../services/upload/cloudinary-upload.service';
import { AwsUploadService } from '../services/upload/aws-upload.service';

@Module({
  imports: [ConfigModule],
  providers: [
    UploadService,
    UploadFactoryService,
    LocalUploadService,
    CloudinaryUploadService,
    AwsUploadService,
  ],
  exports: [UploadService], // Só exporta o que será usado
})
export class UploadModule { }