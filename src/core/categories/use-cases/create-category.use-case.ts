import { Injectable, Inject, ConflictException, NotFoundException } from '@nestjs/common';
import { CATEGORY_REPOSITORY, ICategoryRepository } from '../repositories/category.repository';
import { CreateCategoryDto } from '../dtos/create-category.dto';

@Injectable()
export class CreateCategoryUseCase {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepository: ICategoryRepository,
  ) { }

  async execute(dto: CreateCategoryDto) {
    // Verificar se o slug já existe
    const slugExists = await this.categoryRepository.checkSlugExists(dto.slug);
    if (slugExists) {
      throw new ConflictException('Slug já está em uso');
    }

    // Verificar se a categoria pai existe (se fornecida)
    if (dto.parentId) {
      const parentCategory = await this.categoryRepository.findById(dto.parentId);
      if (!parentCategory) {
        throw new NotFoundException('Categoria pai não encontrada');
      }
    }

    const category = await this.categoryRepository.create({
      ...dto,
      isActive: dto.isActive ?? true
    });

    return {
      message: 'Categoria criada com sucesso',
      category
    };
  }
}

