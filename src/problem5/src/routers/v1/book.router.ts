import { Router } from 'express';
import * as bookController from '../../controllers/book.controller';
import {
  paginationValidator,
  validator,
} from '../../middlewares/validator.middleware';
import {
  idValidatorSchema,
  createBookValidatorSchema,
  updateBookValidatorSchema,
  getBooksValidatorSchema,
} from '../../validators';
import { catchAsync } from '../../utils/catchAsync';

export const bookRouter = Router();

/**
 * @openapi
 * /v1/books:
 *   get:
 *     summary: Retrieve a list of books
 *     description: Get a list of books based on filters & pagination.
 *     tags:
 *       - Books
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Maximum number of books to return
 *       - in: query
 *         name: skip
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Number of books to skip
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: integer
 *           minimum: 0
 *         description: Minimum price of the books
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: integer
 *           minimum: 0
 *         description: Maximum price of the books
 *       - in: query
 *         name: includeDeleted
 *         schema:
 *           type: boolean
 *           default: false
 *         description: Whether to include deleted books
 *       - in: query
 *         name: author
 *         schema:
 *           type: string
 *         description: Filter books by author
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter books by category
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Filter books by title
 *       - in: query
 *         name: publisher
 *         schema:
 *           type: string
 *         description: Filter books by publisher
 *     responses:
 *       200:
 *         description: List of books
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Book'
 */
bookRouter.get(
  '/',
  paginationValidator(getBooksValidatorSchema),
  catchAsync(bookController.getBooks),
);

/**
 * @openapi
 * /v1/books/{id}:
 *   get:
 *     summary: Retrieve a book by ID
 *     description: Fetches a book based on its ID.
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           minimum: 1
 *           exclusiveMinimum: false
 *         required: true
 *         description: ID of the book to retrieve
 *     responses:
 *       200:
 *         description: Book details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Book'
 *       404:
 *         $ref: '#/components/responses/ErrorResponse'
 *         description: Book not found
 *       500:
 *         description: Server error
 */
bookRouter.get(
  '/:id',
  validator(idValidatorSchema, 'params'),
  catchAsync(bookController.getBookById),
);

/**
 * @openapi
 * /v1/books:
 *   post:
 *     summary: Create a new book
 *     description: Creates a new book with the provided details. All fields must meet the specified constraints and are required.
 *     tags:
 *       - Books
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - author
 *               - publishedDate
 *               - publisher
 *               - category
 *               - price
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the book.
 *                 example: My Book 1
 *                 minLength: 1
 *               author:
 *                 type: string
 *                 description: Author of the book.
 *                 example: My author
 *                 minLength: 1
 *               publishedDate:
 *                 type: integer
 *                 description: Unix timestamp representing the publication date. Must not be in the future.
 *                 example: 1740841779
 *               publisher:
 *                 type: string
 *                 description: Publisher of the book.
 *                 example: My Publisher
 *                 minLength: 1
 *               category:
 *                 type: string
 *                 description: Category of the book.
 *                 example: My Category
 *                 minLength: 1
 *               price:
 *                 type: number
 *                 description: Price of the book. Must be greater than 0.
 *                 example: 100.00
 *                 minimum: 0.01
 *     responses:
 *       200:
 *         description: Book successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Book'
 *       400:
 *         $ref: '#/components/responses/ErrorResponse'
 */

bookRouter.post(
  '/',
  validator(createBookValidatorSchema, 'body'),
  catchAsync(bookController.createBook),
);

/**
 * @openapi
 * /v1/books/{id}:
 *   patch:
 *     summary: Partially update a book by ID
 *     description: Updates one or more fields of a book identified by its ID. Only the fields provided in the request body will be updated.
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           minimum: 1
 *         required: true
 *         description: ID of the book to update (must be greater than 0).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the book.
 *                 example: My Updated Book Title
 *                 minLength: 1
 *               author:
 *                 type: string
 *                 description: Author of the book.
 *                 example: Updated Author Name
 *                 minLength: 1
 *               publishedDate:
 *                 type: integer
 *                 description: Unix timestamp representing the publication date. Must not be in the future.
 *                 example: 1740841779
 *               publisher:
 *                 type: string
 *                 description: Publisher of the book.
 *                 example: Updated Publisher Name
 *                 minLength: 1
 *               category:
 *                 type: string
 *                 description: Category of the book.
 *                 example: Updated Category Name
 *                 minLength: 1
 *               price:
 *                 type: number
 *                 description: Price of the book. Must be greater than 0.
 *                 example: 150.00
 *                 minimum: 0.01
 *     responses:
 *       200:
 *         description: Book successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Book'
 *       400:
 *         $ref: '#/components/responses/ErrorResponse'
 */

bookRouter.patch(
  '/:id',
  validator(idValidatorSchema, 'params'),
  validator(updateBookValidatorSchema, 'body'),
  catchAsync(bookController.updateBook),
);

/**
 * @openapi
 * /v1/books/{id}:
 *   delete:
 *     summary: Delete a book by ID
 *     description: Deletes a book identified by its ID. The `id` must be a number greater than 0.
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           minimum: 1
 *         required: true
 *         description: ID of the book to delete (must be greater than 0).
 *     responses:
 *       200:
 *         description: Book successfully deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Book'
 *       404:
 *         $ref: '#/components/responses/ErrorResponse'
 */

bookRouter.delete(
  '/:id',
  validator(idValidatorSchema, 'params'),
  catchAsync(bookController.deleteBook),
);

/**
 * @openapi
 * /v1/books/{id}/restore:
 *   patch:
 *     summary: Restore a deleted book by ID
 *     description: Restores a previously deleted book identified by its ID. The `id` must be a number greater than 0.
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           minimum: 1
 *         required: true
 *         description: ID of the book to restore (must be greater than 0).
 *     responses:
 *       200:
 *         description: Book successfully restored.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Book'
 *       404:
 *         $ref: '#/components/responses/ErrorResponse'
 */
bookRouter.patch(
  '/:id/restore',
  validator(idValidatorSchema, 'params'),
  catchAsync(bookController.restoreBook),
);
