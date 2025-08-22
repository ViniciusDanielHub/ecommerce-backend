import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { PRODUCT_REPOSITORY, IProductRepository } from '../repositories/product.repository';

@Injectable()
export class GetProductUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: IProductRepository,
  ) { }

  async execute(id: string) {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }

    return product;
  }

  async executeBySlug(slug: string) {
    const product = await this.productRepository.findBySlug(slug);

    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }

    return product;
  }
}