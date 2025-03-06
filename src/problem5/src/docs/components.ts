/**
 * @openapi
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - id
 *         - title
 *         - author
 *         - published_date
 *         - publisher
 *         - enabled
 *         - category
 *         - price
 *       properties:
 *         id:
 *           type: integer
 *           description: Book ID.
 *         title:
 *           type: string
 *           description: Title of the book.
 *           minLength: 0
 *         author:
 *           type: string
 *           description: Author of the book.
 *           minLength: 0
 *         published_date:
 *           type: string
 *           format: date-time
 *           description: Publication date of the book.
 *         publisher:
 *           type: string
 *           description: Publisher of the book.
 *           minLength: 0
 *         enabled:
 *           type: boolean
 *           description: Whether the book is enabled or active.
 *         category:
 *           type: string
 *           description: Category of the book.
 *           minLength: 0
 *         price:
 *           type: number
 *           description: Price of the book. Must be greater than 0.
 *           minimum: 0
 *   responses:
 *     ErrorResponse:
 *       description: Error response
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 description: Error message
 *               status:
 *                 type: integer
 *                 description: HTTP status code
 *                 minimum: 400
 *                 maximum: 599
 */
