import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { CATEGORY_REPOSITORY, ICategoryRepository } from '../repositories/category.repository';

@Injectable()
export class GetCategoryUseCase {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepository: ICategoryRepository,
  ) { }

  async execute(id: string, includeChildren: boolean = true) {
    const category = await this.categoryRepository.findById(id, includeChildren);

    if (!category) {
      throw new NotFoundException('Categoria não encontrada');
    }

    return category;
  }

  async executeBySlug(slug: string, includeChildren: boolean = true) {
    const category = await this.categoryRepository.findBySlug(slug, includeChildren);

    if (!category) {
      throw new NotFoundException('Categoria não encontrada');
    }

    return category;
  }
}