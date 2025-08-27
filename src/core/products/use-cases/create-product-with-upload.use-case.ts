import { Injectable, Inject, ConflictException, NotFoundException } from '@nestjs/common';
import { PRODUCT_REPOSITORY, IProductRepository } from '../repositories/product.repository';
import { AUTH_REPOSITORY, IAuthRepository } from 'src/core/auth/repositories/auth.repository';
import { CreateProductWithUploadDto } from '../dtos/create-product-with-upload.dto';
import { UploadService } from 'src/shared/services/upload/upload.service';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class CreateProductWithUploadUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: IProductRepository,
    @Inject(AUTH_REPOSITORY)
    private readonly authRepository: IAuthRepository,
    private readonly uploadService: UploadService,
    private readonly prisma: PrismaService,
  ) { }

  async execute(dto: CreateProductWithUploadDto, files: Express.Multer.File[], userId: string) {
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

    if (!storeId) {
      throw new Error('Não foi possível determinar ou criar uma loja para o produto');
    }

    // Processar imagens
    let processedImages: any[] = [];

    // Se foram enviados arquivos, fazer upload
    if (files && files.length > 0) {
      const uploadResults = await this.uploadService.uploadMultiple(files);

      processedImages = uploadResults.map((result, index) => ({
        url: result.url,
        publicId: result.publicId,
        alt: `${dto.name} - Imagem ${index + 1}`,
        order: index,
        isMain: index === 0
      }));
    }

    // Se foram fornecidas URLs nas imagens do DTO, adicionar também
    if (dto.images && dto.images.length > 0) {
      const urlImages = dto.images.map((img, index) => ({
        url: img.url!,
        publicId: img.publicId,
        alt: img.alt || `${dto.name} - Imagem ${index + 1}`,
        order: img.order || (processedImages.length + index),
        isMain: img.isMain || (processedImages.length === 0 && index === 0)
      }));

      processedImages = [...processedImages, ...urlImages];
    }

    // Criar o produto
    const product = await this.productRepository.create({
      ...dto,
      storeId,
      stock: dto.stock || 0,
      minStock: dto.minStock || 0,
      status: dto.status || 'ACTIVE',
      images: processedImages
    });

    return {
      message: 'Produto criado com sucesso',
      product
    };
  }
}