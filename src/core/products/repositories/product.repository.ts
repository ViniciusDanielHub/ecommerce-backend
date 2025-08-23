import { ProductStatus } from '@prisma/client';

export const PRODUCT_REPOSITORY = 'PRODUCT_REPOSITORY';

export interface CreateProductData {
  name: string;
  description?: string;
  slug: string;
  sku?: string;
  price: number;
  comparePrice?: number;
  costPrice?: number;
  weight?: number;
  dimensions?: any;
  status?: ProductStatus;
  stock?: number;
  minStock?: number;
  maxStock?: number;
  isDigital?: boolean;
  tags?: string[];
  seoTitle?: string;
  seoDescription?: string;
  categoryId: string;
  storeId?: string; // OPCIONAL AGORA
  images?: Array<{
    url: string;
    alt?: string;
    order?: number;
    isMain?: boolean;
  }>;
  variants?: Array<{
    name: string;
    value: string;
    price?: number;
    stock?: number;
    sku?: string;
  }>;
}

export interface UpdateProductData extends Partial<CreateProductData> { }

export interface ProductFilters {
  search?: string;
  categoryId?: string;
  storeId?: string;
  status?: ProductStatus;
  minPrice?: number;
  maxPrice?: number;
}

export interface PaginationOptions {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface IProductRepository {
  create(data: CreateProductData): Promise<any>;
  findById(id: string): Promise<any>;
  findBySlug(slug: string): Promise<any>;
  findMany(filters: ProductFilters, pagination: PaginationOptions): Promise<{
    products: any[];
    total: number;
    totalPages: number;
    currentPage: number;
  }>;
  update(id: string, data: UpdateProductData): Promise<any>;
  delete(id: string): Promise<void>;
  findByStore(storeId: string, pagination: PaginationOptions): Promise<any>;
  updateStock(productId: string, quantity: number): Promise<any>;
  checkSlugExists(slug: string, excludeId?: string): Promise<boolean>;
  createDefaultStore(userId: string): Promise<any>; 
}