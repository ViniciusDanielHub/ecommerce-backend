import { Injectable, Inject } from '@nestjs/common';
import { CATEGORY_REPOSITORY, ICategoryRepository } from '../repositories/category.repository';
import { GetCategoriesQueryDto } from '../dtos/get-categories-query.dto';

@Injectable()
export class GetCategoriesUseCase {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepository: ICategoryRepository,
  ) { }

  async execute(query: GetCategoriesQueryDto) {
    const filters = {
      search: query.search,
      parentId: query.parentId,
      isActive: query.isActive
    };

    const pagination = {
      page: query.page || 1,
      limit: query.limit || 10,
      sortBy: query.sortBy || 'name',
      sortOrder: query.sortOrder || 'asc',
      includeChildren: query.includeChildren || false
    };

    return await this.categoryRepository.findMany(filters, pagination);
  }

  async getTree() {
    const tree = await this.categoryRepository.findTree();
    return {
      message: 'Árvore de categorias',
      categories: tree
    };
  }
}
