import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { SingleFileUpload, MultipleFilesUpload } from '../decorators/upload.decorator';
import { UploadService } from '../services/upload/upload.service';

@Controller('upload')
@UseGuards(JwtAuthGuard)
export class UploadController {
  constructor(private readonly uploadService: UploadService) { }

  @Post('single')
  @SingleFileUpload('file')
  async uploadSingle(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Nenhum arquivo enviado');
    }

    const result = await this.uploadService.uploadSingle(file);

    return {
      message: 'Arquivo enviado com sucesso',
      file: result
    };
  }
  
  @Post('multiple')
  @MultipleFilesUpload('files', 10)
  async uploadMultiple(@UploadedFiles() files: Express.Multer.File[]) {
    if (!files || files.length === 0) {
      throw new BadRequestException('Nenhum arquivo enviado');
    }

    const results = await this.uploadService.uploadMultiple(files);

    return {
      message: 'Arquivos enviados com sucesso',
      files: results
    };
  }
}