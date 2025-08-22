import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { PRODUCT_REPOSITORY, IProductRepository } from '../repositories/product.repository';

@Injectable()
export class DeleteProductUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: IProductRepository,
  ) { }

  async execute(id: string) {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }

    await this.productRepository.delete(id);

    return {
      message: 'Produto deletado com sucesso',
      deletedProduct: {
        id: product.id,
        name: product.name,
        slug: product.slug
      }
    };
  }
}