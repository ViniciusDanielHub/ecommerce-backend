import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UploadModule } from './upload.module';
import { UploadController } from '../controllers/upload.controller';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UploadModule, // Importa o módulo
  ],
  controllers: [UploadController], // Controller fica no shared
  exports: [UploadModule], // Exporta o módulo inteiro, não o serviço
})
export class SharedModule { }