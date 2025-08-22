import { Injectable, Inject, NotFoundException, ConflictException } from '@nestjs/common';
import { PRODUCT_REPOSITORY, IProductRepository } from '../repositories/product.repository';
import { UpdateProductDto } from '../dtos/update-product.dto'; 

@Injectable()
export class UpdateProductUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: IProductRepository,
  ) { }

  async execute(id: string, dto: UpdateProductDto) {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }

    // Verificar slug se foi alterado
    if (dto.slug && dto.slug !== product.slug) {
      const slugExists = await this.productRepository.checkSlugExists(dto.slug, id);
      if (slugExists) {
        throw new ConflictException('Slug já está em uso');
      }
    }

    const updatedProduct = await this.productRepository.update(id, dto);

    return {
      message: 'Produto atualizado com sucesso',
      product: updatedProduct
    };
  }
}