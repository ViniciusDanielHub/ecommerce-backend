import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Req
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { RolesGuard } from 'src/shared/guards/roles-guard';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { Public } from 'src/shared/decorators/public.decorator';
import { Role } from '@prisma/client';
import { RequestWithUser } from 'src/shared/types/request-with-user';

import { CreateProductUseCase } from '../use-cases/create-product.use-case';
import { GetProductUseCase } from '../use-cases/get-product.use-case'; 
import { GetProductsUseCase } from '../use-cases/get-products.use-case';
import { UpdateProductUseCase } from '../use-cases/update-product.use-case';
import { DeleteProductUseCase } from '../use-cases/delete-product.use-case';

import { CreateProductDto } from '../dtos/create-product.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';
import { GetProductsQueryDto } from '../dtos/get-products-query.dto';

@Controller('products')
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly getProductUseCase: GetProductUseCase,
    private readonly getProductsUseCase: GetProductsUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
    private readonly deleteProductUseCase: DeleteProductUseCase,
  ) { }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SELLER)
  async create(@Body() dto: CreateProductDto, @Req() req: RequestWithUser) {
    return this.createProductUseCase.execute(dto, req.user.userId);
  }

  @Get()
  @Public()
  async getAll(@Query() query: GetProductsQueryDto) {
    return this.getProductsUseCase.execute(query);
  }

  @Get(':id')
  @Public()
  async getById(@Param('id') id: string) {
    return this.getProductUseCase.execute(id);
  }

  @Get('slug/:slug')
  @Public()
  async getBySlug(@Param('slug') slug: string) {
    return this.getProductUseCase.executeBySlug(slug);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SELLER)
  async update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.updateProductUseCase.execute(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SELLER)
  async delete(@Param('id') id: string) {
    return this.deleteProductUseCase.execute(id);
  }
}