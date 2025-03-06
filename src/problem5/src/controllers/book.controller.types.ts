import { Pagination } from '../utils/pagination';

export type GetBooksQuery = {
  minPrice?: number;
  maxPrice?: number;

  includeDeleted: boolean;
  author?: string;
  category?: string;
  title?: string;
} & Pagination;

export type CreateBookRequestBody = {
  title: string;
  author: string;
  publishedDate: Date;
  publisher: string;
  category: string;
  price: number;
};

export type UpdateBookRequestBody = {
  title?: string;
  author?: string;
  publishedDate?: Date;
  publisher?: string;
  category?: string;
  price?: number;
};
