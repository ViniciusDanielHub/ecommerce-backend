import { Module } from '@nestjs/common';
import { CategoryController } from './controllers/category.controller'; 
import { AuthModule } from '../auth/domain/auth.module';

import { CreateCategoryUseCase } from './use-cases/create-category.use-case';
import { GetCategoryUseCase } from './use-cases/get-category.use-case';
import { GetCategoriesUseCase } from './use-cases/get-categories.use-case';
import { UpdateCategoryUseCase } from './use-cases/update-category.use-case';
import { DeleteCategoryUseCase } from './use-cases/delete-category.use-case';

import { PrismaCategoryRepository } from 'src/infrastructure/categories/prisma/prisma-category.repository';
import { CATEGORY_REPOSITORY } from './repositories/category.repository';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Module({
  imports: [AuthModule],
  controllers: [CategoryController],
  providers: [
    PrismaService,
    CreateCategoryUseCase,
    GetCategoryUseCase,
    GetCategoriesUseCase,
    UpdateCategoryUseCase,
    DeleteCategoryUseCase,
    {
      provide: CATEGORY_REPOSITORY,
      useClass: PrismaCategoryRepository,
    },
  ],
  exports: [CATEGORY_REPOSITORY],
})
export class CategoryModule { }