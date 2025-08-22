export const CATEGORY_REPOSITORY = 'CATEGORY_REPOSITORY';

export interface CreateCategoryData {
  name: string;
  description?: string;
  slug: string;
  image?: string;
  isActive?: boolean;
  parentId?: string;
}

export interface UpdateCategoryData extends Partial<CreateCategoryData> { }

export interface CategoryFilters {
  search?: string;
  parentId?: string;
  isActive?: boolean;
}

export interface PaginationOptions {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  includeChildren?: boolean;
}

export interface ICategoryRepository {
  create(data: CreateCategoryData): Promise<any>;
  findById(id: string, includeChildren?: boolean): Promise<any>;
  findBySlug(slug: string, includeChildren?: boolean): Promise<any>;
  findMany(filters: CategoryFilters, pagination: PaginationOptions): Promise<{
    categories: any[];
    total: number;
    totalPages: number;
    currentPage: number;
  }>;
  findTree(): Promise<any[]>;
  update(id: string, data: UpdateCategoryData): Promise<any>;
  delete(id: string): Promise<void>;
  checkSlugExists(slug: string, excludeId?: string): Promise<boolean>;
  hasChildren(id: string): Promise<boolean>;
  hasProducts(id: string): Promise<boolean>;
}