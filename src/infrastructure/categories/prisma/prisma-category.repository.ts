import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import {
  ICategoryRepository,
  CreateCategoryData,
  UpdateCategoryData,
  CategoryFilters,
  PaginationOptions
} from 'src/core/categories/repositories/category.repository';
import { Prisma } from '@prisma/client';

type CategoryWithChildren = {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
  parentId: string | null;
  children: CategoryWithChildren[];
  _count: {
    products: number;
    children: number;
  };
  // adicione outros campos conforme necessário
};


@Injectable()
export class PrismaCategoryRepository implements ICategoryRepository {
  constructor(private readonly prisma: PrismaService) { }

  async create(data: CreateCategoryData) {
    return this.prisma.category.create({
      data,
      include: {
        parent: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        },
        children: {
          select: {
            id: true,
            name: true,
            slug: true,
            isActive: true
          }
        },
        _count: {
          select: {
            products: true,
            children: true
          }
        }
      }
    });
  }

  async findById(id: string, includeChildren: boolean = true) {
    return this.prisma.category.findUnique({
      where: { id },
      include: {
        parent: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        },
        children: includeChildren ? {
          select: {
            id: true,
            name: true,
            slug: true,
            isActive: true,
            image: true,
            _count: {
              select: {
                products: true
              }
            }
          },
          where: { isActive: true }
        } : false,
        _count: {
          select: {
            products: true,
            children: true
          }
        }
      }
    });
  }

  async findBySlug(slug: string, includeChildren: boolean = true) {
    return this.prisma.category.findUnique({
      where: { slug },
      include: {
        parent: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        },
        children: includeChildren ? {
          select: {
            id: true,
            name: true,
            slug: true,
            isActive: true,
            image: true,
            _count: {
              select: {
                products: true
              }
            }
          },
          where: { isActive: true }
        } : false,
        _count: {
          select: {
            products: true,
            children: true
          }
        }
      }
    });
  }

  async findMany(filters: CategoryFilters, pagination: PaginationOptions) {
    const { page, limit, sortBy = 'name', sortOrder = 'asc', includeChildren } = pagination;
    const skip = (page - 1) * limit;

    const where: Prisma.CategoryWhereInput = {};

    if (filters.search) {
      where.OR = [
        { name: { contains: filters.search, mode: 'insensitive' } },
        { description: { contains: filters.search, mode: 'insensitive' } }
      ];
    }

    if (filters.parentId !== undefined) {
      where.parentId = filters.parentId;
    }

    if (filters.isActive !== undefined) {
      where.isActive = filters.isActive;
    }

    const [categories, total] = await Promise.all([
      this.prisma.category.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: {
          parent: {
            select: {
              id: true,
              name: true,
              slug: true
            }
          },
          children: includeChildren ? {
            select: {
              id: true,
              name: true,
              slug: true,
              isActive: true
            },
            where: { isActive: true }
          } : false,
          _count: {
            select: {
              products: true,
              children: true
            }
          }
        }
      }),
      this.prisma.category.count({ where })
    ]);

    return {
      categories,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    };
  }
  async findTree(): Promise<CategoryWithChildren[]> {
    // Buscar todas as categorias ativas
    const allCategories = await this.prisma.category.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
      include: {
        _count: {
          select: {
            products: true,
            children: true
          }
        }
      }
    });

    // Construir árvore hierárquica
    const categoryMap = new Map<string, CategoryWithChildren>();
    const rootCategories: CategoryWithChildren[] = []; // ✅ Tipo explícito

    // Primeira passada: criar mapa
    allCategories.forEach(category => {
      categoryMap.set(category.id, { ...category, children: [] });
    });

    // Segunda passada: construir hierarquia
    allCategories.forEach(category => {
      if (category.parentId) {
        const parent = categoryMap.get(category.parentId);
        if (parent) {
          const currentCategory = categoryMap.get(category.id);
          if (currentCategory) {
            parent.children.push(currentCategory);
          }
        }
      } else {
        const currentCategory = categoryMap.get(category.id);
        if (currentCategory) {
          rootCategories.push(currentCategory);
        }
      }
    });

    return rootCategories;
  }

  async update(id: string, data: UpdateCategoryData) {
    return this.prisma.category.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date()
      },
      include: {
        parent: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        },
        children: {
          select: {
            id: true,
            name: true,
            slug: true,
            isActive: true
          }
        },
        _count: {
          select: {
            products: true,
            children: true
          }
        }
      }
    });
  }

  async delete(id: string) {
    await this.prisma.category.delete({
      where: { id }
    });
  }

  async checkSlugExists(slug: string, excludeId?: string): Promise<boolean> {
    const category = await this.prisma.category.findFirst({
      where: {
        slug,
        ...(excludeId && { id: { not: excludeId } })
      }
    });

    return !!category;
  }

  async hasChildren(id: string): Promise<boolean> {
    const count = await this.prisma.category.count({
      where: { parentId: id }
    });

    return count > 0;
  }

  async hasProducts(id: string): Promise<boolean> {
    const count = await this.prisma.product.count({
      where: { categoryId: id }
    });

    return count > 0;
  }
}