import { PrismaClient } from '@prisma/client';
import { NotFoundException } from '../kernel/exceptions';
import {
  CreateBookRequestBody,
  GetBooksQuery,
  UpdateBookRequestBody,
} from '../controllers/book.controller.types';
import { db } from '../config/db';

export const getBookById = async (id: number) => {
  const result = await db.book.findUnique({
    where: {
      id: id,
    },
  });

  if (!result) {
    throw new NotFoundException(`Book not found with id: ${id}`);
  }

  return result;
};

export const getBooks = async (query: GetBooksQuery) => {
  const result = await db.book.findMany({
    skip: query.skip,
    take: query.limit,
    where: {
      AND: {
        enabled: query.includeDeleted ? undefined : true,
        author: {
          contains: query.author,
        },
        title: {
          contains: query.title,
        },
        category: {
          contains: query.category,
        },
        price: {
          gte: query.minPrice,
          lte: query.maxPrice,
        },
      },
    },
  });

  return result;
};

export const createBook = async (createBookDTO: CreateBookRequestBody) => {
  const result = await db.book.create({
    data: {
      title: createBookDTO.title,
      author: createBookDTO.author,
      category: createBookDTO.category,
      published_date: createBookDTO.publishedDate,
      publisher: createBookDTO.publisher,
      price: createBookDTO.price,
    },
  });

  return result;
};

export const updateBook = async (
  id: number,
  updateBookDTO: UpdateBookRequestBody,
) => {
  const result = await db.book.update({
    data: {
      title: updateBookDTO.title,
      author: updateBookDTO.author,
      category: updateBookDTO.category,
      publisher: updateBookDTO.publisher,
      published_date: updateBookDTO.publishedDate,
      price: updateBookDTO.price,
    },
    where: {
      id: id,
    },
  });

  return result;
};

export const deleteBook = async (id: number) => {
  try {
    const result = await db.book.update({
      data: {
        enabled: false,
      },
      where: {
        id: id,
      },
    });
    return result;
  } catch {
    throw new NotFoundException(`Book not found with id: ${id}`);
  }
};

export const restoreBook = async (id: number) => {
  try {
    const result = await db.book.update({
      data: {
        enabled: true,
      },
      where: {
        id: id,
      },
    });

    return result;
  } catch {
    throw new NotFoundException(`Book not found with id: ${id}`);
  }
};
