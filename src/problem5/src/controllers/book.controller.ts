import { Request, Response } from 'express';
import * as bookService from '../services/book.service';
import { BaseResponse } from '../kernel/base-response';
import {
  CreateBookRequestBody,
  GetBooksQuery,
  UpdateBookRequestBody,
} from './book.controller.types';

export const getBookById = async (req: Request, res: Response) => {
  const bookId = Number(req.params.id);

  const book = await bookService.getBookById(bookId);

  res.json(BaseResponse.success(book));
};

export const getBooks = async (req: Request, res: Response) => {
  const query = req.query as unknown as GetBooksQuery;

  const books = await bookService.getBooks(query);

  res.json(BaseResponse.success(books));
};

export const createBook = async (req: Request, res: Response) => {
  const body = req.body as CreateBookRequestBody;

  const book = await bookService.createBook(body);

  res.json(book);
};

export const updateBook = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const body = req.body as UpdateBookRequestBody;

  const book = await bookService.updateBook(id, body);

  res.json(book);
};

export const deleteBook = async (req: Request, res: Response) => {
  const bookId = Number(req.params.id);

  const book = await bookService.deleteBook(bookId);

  res.json(BaseResponse.success(book));
};

export const restoreBook = async (req: Request, res: Response) => {
  const bookId = Number(req.params.id);

  const book = await bookService.restoreBook(bookId);

  res.json(BaseResponse.success(book));
};
