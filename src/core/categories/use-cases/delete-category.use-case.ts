import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import { CATEGORY_REPOSITORY, ICategoryRepository } from '../repositories/category.repository';

@Injectable()
export class DeleteCategoryUseCase {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepository: ICategoryRepository,
  ) { }

  async execute(id: string) {
    const category = await this.categoryRepository.findById(id);
    if (!category) {
      throw new NotFoundException('Categoria não encontrada');
    }

    // Verificar se tem categorias filhas
    const hasChildren = await this.categoryRepository.hasChildren(id);
    if (hasChildren) {
      throw new BadRequestException('Não é possível deletar categoria que possui subcategorias');
    }

    // Verificar se tem produtos
    const hasProducts = await this.categoryRepository.hasProducts(id);
    if (hasProducts) {
      throw new BadRequestException('Não é possível deletar categoria que possui produtos');
    }

    await this.categoryRepository.delete(id);

    return {
      message: 'Categoria deletada com sucesso',
      deletedCategory: {
        id: category.id,
        name: category.name,
        slug: category.slug
      }
    };
  }
}