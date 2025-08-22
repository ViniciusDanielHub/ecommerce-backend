import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { RolesGuard } from 'src/shared/guards/roles-guard';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { Public } from 'src/shared/decorators/public.decorator';
import { Role } from '@prisma/client';

import { CreateCategoryUseCase } from '../use-cases/create-category.use-case';
import { GetCategoryUseCase } from '../use-cases/get-category.use-case';
import { GetCategoriesUseCase } from '../use-cases/get-categories.use-case';
import { UpdateCategoryUseCase } from '../use-cases/update-category.use-case';
import { DeleteCategoryUseCase } from '../use-cases/delete-category.use-case';

import { CreateCategoryDto } from '../dtos/create-category.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';
import { GetCategoriesQueryDto } from '../dtos/get-categories-query.dto';

@Controller('categories')
export class CategoryController {
  constructor(
    private readonly createCategoryUseCase: CreateCategoryUseCase,
    private readonly getCategoryUseCase: GetCategoryUseCase,
    private readonly getCategoriesUseCase: GetCategoriesUseCase,
    private readonly updateCategoryUseCase: UpdateCategoryUseCase,
    private readonly deleteCategoryUseCase: DeleteCategoryUseCase,
  ) { }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async create(@Body() dto: CreateCategoryDto) {
    return this.createCategoryUseCase.execute(dto);
  }

  @Get()
  @Public()
  async getAll(@Query() query: GetCategoriesQueryDto) {
    return this.getCategoriesUseCase.execute(query);
  }

  @Get('tree')
  @Public()
  async getTree() {
    return this.getCategoriesUseCase.getTree();
  }

  @Get(':id')
  @Public()
  async getById(@Param('id') id: string) {
    return this.getCategoryUseCase.execute(id);
  }

  @Get('slug/:slug')
  @Public()
  async getBySlug(@Param('slug') slug: string) {
    return this.getCategoryUseCase.executeBySlug(slug);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async update(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    return this.updateCategoryUseCase.execute(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async delete(@Param('id') id: string) {
    return this.deleteCategoryUseCase.execute(id);
  }
}