import { Injectable, Inject, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { CATEGORY_REPOSITORY, ICategoryRepository } from '../repositories/category.repository';
import { UpdateCategoryDto } from '../dtos/update-category.dto';

@Injectable()
export class UpdateCategoryUseCase {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepository: ICategoryRepository,
  ) { }

  async execute(id: string, dto: UpdateCategoryDto) {
    const category = await this.categoryRepository.findById(id);
    if (!category) {
      throw new NotFoundException('Categoria não encontrada');
    }

    // Verificar slug se foi alterado
    if (dto.slug && dto.slug !== category.slug) {
      const slugExists = await this.categoryRepository.checkSlugExists(dto.slug, id);
      if (slugExists) {
        throw new ConflictException('Slug já está em uso');
      }
    }

    // Verificar se não está tentando ser pai de si mesma
    if (dto.parentId === id) {
      throw new BadRequestException('Uma categoria não pode ser pai de si mesma');
    }

    // Verificar se a categoria pai existe (se fornecida)
    if (dto.parentId) {
      const parentCategory = await this.categoryRepository.findById(dto.parentId);
      if (!parentCategory) {
        throw new NotFoundException('Categoria pai não encontrada');
      }
    }

    const updatedCategory = await this.categoryRepository.update(id, dto);

    return {
      message: 'Categoria atualizada com sucesso',
      category: updatedCategory
    };
  }
}