import { Injectable, Inject, ConflictException, NotFoundException } from '@nestjs/common';
import { PRODUCT_REPOSITORY, IProductRepository } from '../repositories/product.repository';
import { AUTH_REPOSITORY, IAuthRepository } from 'src/core/auth/repositories/auth.repository';
import { CreateProductDto } from '../dtos/create-product.dto';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class CreateProductUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: IProductRepository,
    @Inject(AUTH_REPOSITORY)
    private readonly authRepository: IAuthRepository,
    private readonly prisma: PrismaService,
  ) { }

  async execute(dto: CreateProductDto, userId: string) {
    // Verificar se o usuário existe
    const user = await this.authRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    // Verificar se o slug já existe
    const slugExists = await this.productRepository.checkSlugExists(dto.slug);
    if (slugExists) {
      throw new ConflictException('Slug já está em uso');
    }

    let storeId = dto.storeId;

    if (!storeId) {
      // Buscar se o usuário já tem uma loja
      const existingStore = await this.prisma.store.findUnique({
        where: { ownerId: userId }
      });

      if (existingStore) {
        storeId = existingStore.id;
      } else {
        // Criar loja padrão para o usuário
        const defaultStore = await this.productRepository.createDefaultStore(userId);
        storeId = defaultStore.id;
      }
    }

    // Garantir que storeId não é undefined antes de criar o produto
    if (!storeId) {
      throw new Error('Não foi possível determinar ou criar uma loja para o produto');
    }


    // Criar o produto
    const product = await this.productRepository.create({
      ...dto,
      storeId,
      stock: dto.stock || 0,
      minStock: dto.minStock || 0,
      status: dto.status || 'ACTIVE'
    });

    return {
      message: 'Produto criado com sucesso',
      product
    };
  }
}