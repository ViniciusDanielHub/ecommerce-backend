import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import {
  IProductRepository,
  CreateProductData,
  UpdateProductData,
  ProductFilters,
  PaginationOptions
} from 'src/core/products/repositories/product.repository';
import { Prisma } from '@prisma/client';
import { SystemConfigService } from 'src/shared/services/system-config.service';

@Injectable()
export class PrismaProductRepository implements IProductRepository {
  constructor(private readonly prisma: PrismaService,
  private readonly systemConfigService: SystemConfigService
  ) { }

  // NOVO MÉTODO para criar loja padrão
  async createDefaultStore(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { name: true, email: true}
    });

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const defaultStoreName = await this.systemConfigService.getDefaultStoreName();

    const storeName = defaultStoreName;
    const storeSlug = `loja-${userId}-${Date.now()}`;

    return this.prisma.store.create({
      data: {
        name: storeName,
        slug: storeSlug,
        description: `Loja oficial de ${user.name}`,
        ownerId: userId,
        isActive: true
      }
    });
  }

  async create(data: CreateProductData) {
    const { images, variants, ...productData } = data;

    if (!productData.storeId) {
      throw new Error('storeId é obrigatório para criar um produto');
    }

    return this.prisma.product.create({
      data: {
        ...productData,
        storeId: productData.storeId, 
        images: images ? {
          create: images
        } : undefined,
        variants: variants ? {
          create: variants
        } : undefined
      },
      include: {
        images: true,
        variants: true,
        category: true,
        store: {
          select: {
            id: true,
            name: true,
            slug: true,
            logo: true
          }
        },
      }
    });
  }

  async findById(id: string) {
    return this.prisma.product.findUnique({
      where: { id },
      include: {
        images: {
          orderBy: { order: 'asc' }
        },
        variants: {
          where: { isActive: true }
        },
        category: true,
        store: {
          select: {
            id: true,
            name: true,
            slug: true,
            logo: true
          }
        },
        reviews: {
          take: 5,
          orderBy: { createdAt: 'desc' },
          include: {
            user: {
              select: {
                id: true,
                name: true,
                avatar: true
              }
            }
          }
        },
        _count: {
          select: {
            reviews: true
          }
        }
      }
    });
  }

  async findBySlug(slug: string) {
    return this.prisma.product.findUnique({
      where: { slug },
      include: {
        images: {
          orderBy: { order: 'asc' }
        },
        variants: {
          where: { isActive: true }
        },
        category: true,
        store: {
          select: {
            id: true,
            name: true,
            slug: true,
            logo: true
          }
        }
      }
    });
  }

  async findMany(filters: ProductFilters, pagination: PaginationOptions) {
    const { page, limit, sortBy = 'createdAt', sortOrder = 'desc' } = pagination;
    const skip = (page - 1) * limit;

    const where: Prisma.ProductWhereInput = {};

    if (filters.search) {
      where.OR = [
        { name: { contains: filters.search, mode: 'insensitive' } },
        { description: { contains: filters.search, mode: 'insensitive' } },
        { tags: { has: filters.search } }
      ];
    }

    if (filters.categoryId) {
      where.categoryId = filters.categoryId;
    }

    if (filters.storeId) {
      where.storeId = filters.storeId;
    }

    if (filters.status) {
      where.status = filters.status;
    }

    if (filters.minPrice || filters.maxPrice) {
      where.price = {};
      if (filters.minPrice) {
        where.price.gte = filters.minPrice;
      }
      if (filters.maxPrice) {
        where.price.lte = filters.maxPrice;
      }
    }

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: {
          images: {
            where: { isMain: true },
            take: 1
          },
          category: {
            select: {
              id: true,
              name: true,
              slug: true
            }
          },
          store: {
            select: {
              id: true,
              name: true,
              slug: true
            }
          },
          _count: {
            select: {
              reviews: true
            }
          }
        }
      }),
      this.prisma.product.count({ where })
    ]);

    return {
      products,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    };
  }

  async update(id: string, data: UpdateProductData) {
    const { images, variants, ...productData } = data;

    return this.prisma.product.update({
      where: { id },
      data: {
        ...productData,
        updatedAt: new Date()
      },
      include: {
        images: true,
        variants: true,
        category: true,
        store: true
      }
    });
  }

  async delete(id: string) {
    await this.prisma.product.delete({
      where: { id }
    });
  }

  async findByStore(storeId: string, pagination: PaginationOptions) {
    const { page, limit, sortBy = 'createdAt', sortOrder = 'desc' } = pagination;
    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where: { storeId },
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: {
          images: {
            where: { isMain: true },
            take: 1
          },
          category: true,
          _count: {
            select: {
              reviews: true
            }
          }
        }
      }),
      this.prisma.product.count({
        where: { storeId }
      })
    ]);

    return {
      products,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    };
  }

  async updateStock(productId: string, quantity: number) {
    return this.prisma.product.update({
      where: { id: productId },
      data: {
        stock: {
          increment: quantity
        }
      }
    });
  }

  async checkSlugExists(slug: string, excludeId?: string): Promise<boolean> {
    const product = await this.prisma.product.findFirst({
      where: {
        slug,
        ...(excludeId && { id: { not: excludeId } })
      }
    });

    return !!product;
  }
  
}
