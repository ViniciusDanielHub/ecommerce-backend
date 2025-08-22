import { Injectable, Inject } from '@nestjs/common';
import { PRODUCT_REPOSITORY, IProductRepository } from '../repositories/product.repository';
import { GetProductsQueryDto } from '../dtos/get-products-query.dto'; 

@Injectable()
export class GetProductsUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: IProductRepository,
  ) { }

  async execute(query: GetProductsQueryDto) {
    const filters = {
      search: query.search,
      categoryId: query.categoryId,
      storeId: query.storeId,
      status: query.status,
      minPrice: query.minPrice,
      maxPrice: query.maxPrice
    };

    const pagination = {
      page: query.page || 1,
      limit: query.limit || 10,
      sortBy: query.sortBy, //price
      sortOrder: query.sortOrder //desc asc
    };

    return await this.productRepository.findMany(filters, pagination);
  }
}