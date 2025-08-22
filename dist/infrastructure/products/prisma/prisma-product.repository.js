"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaProductRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../shared/prisma/prisma.service");
let PrismaProductRepository = class PrismaProductRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        const { images, variants, ...productData } = data;
        return this.prisma.product.create({
            data: {
                ...productData,
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
                store: false,
            }
        });
    }
    async findById(id) {
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
                        id: false,
                        name: false,
                        slug: false,
                        logo: false
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
    async findBySlug(slug) {
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
                        id: false,
                        name: false,
                        slug: false,
                        logo: false
                    }
                }
            }
        });
    }
    async findMany(filters, pagination) {
        const { page, limit, sortBy = 'createdAt', sortOrder = 'desc' } = pagination;
        const skip = (page - 1) * limit;
        const where = {};
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
                            id: false,
                            name: false,
                            slug: false
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
    async update(id, data) {
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
    async delete(id) {
        await this.prisma.product.delete({
            where: { id }
        });
    }
    async findByStore(storeId, pagination) {
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
    async updateStock(productId, quantity) {
        return this.prisma.product.update({
            where: { id: productId },
            data: {
                stock: {
                    increment: quantity
                }
            }
        });
    }
    async checkSlugExists(slug, excludeId) {
        const product = await this.prisma.product.findFirst({
            where: {
                slug,
                ...(excludeId && { id: { not: excludeId } })
            }
        });
        return !!product;
    }
};
exports.PrismaProductRepository = PrismaProductRepository;
exports.PrismaProductRepository = PrismaProductRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaProductRepository);
//# sourceMappingURL=prisma-product.repository.js.map