import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IUploadService } from '../../interfaces/upload.interface';
import { UploadProvider } from '../../enums/upload-provider.enum';
import { LocalUploadService } from './local-upload.service';
import { CloudinaryUploadService } from './cloudinary-upload.service';
import { AwsUploadService } from './aws-upload.service';

@Injectable()
export class UploadFactoryService {
  constructor(
    private readonly configService: ConfigService,
    private readonly localUploadService: LocalUploadService,
    private readonly cloudinaryUploadService: CloudinaryUploadService,
    private readonly awsUploadService: AwsUploadService,
  ) { }

  getUploadService(): IUploadService {
    const provider = this.configService.get<UploadProvider>('UPLOAD_PROVIDER', UploadProvider.LOCAL);

    switch (provider) {
      case UploadProvider.CLOUDINARY:
        return this.cloudinaryUploadService;
      case UploadProvider.AWS:
        return this.awsUploadService;
      case UploadProvider.LOCAL:
      default:
        return this.localUploadService;
    }
  }
}
