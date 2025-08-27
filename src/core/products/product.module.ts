import { Module } from '@nestjs/common';
import { ProductController } from './controllers/product.controller';
import { AuthModule } from '../auth/domain/auth.module';

import { CreateProductUseCase } from './use-cases/create-product.use-case';
import { GetProductUseCase } from './use-cases/get-product.use-case';
import { GetProductsUseCase } from './use-cases/get-products.use-case';
import { UpdateProductUseCase } from './use-cases/update-product.use-case';
import { DeleteProductUseCase } from './use-cases/delete-product.use-case';

import { PrismaProductRepository } from 'src/infrastructure/products/prisma/prisma-product.repository';
import { PRODUCT_REPOSITORY } from './repositories/product.repository';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { SystemConfigModule } from 'src/shared/modules/system-config.module';
import { UploadModule } from 'src/shared/modules/upload.module';
import { CreateProductWithUploadUseCase } from './use-cases/create-product-with-upload.use-case';

@Module({
  imports: [AuthModule, SystemConfigModule, UploadModule],
  controllers: [ProductController],
  providers: [
    PrismaService,
    CreateProductUseCase,
    CreateProductWithUploadUseCase,
    GetProductUseCase,
    GetProductsUseCase,
    UpdateProductUseCase,
    DeleteProductUseCase,
    {
      provide: PRODUCT_REPOSITORY,
      useClass: PrismaProductRepository,
    },
  ],
  exports: [PRODUCT_REPOSITORY],
})
export class ProductModule { }