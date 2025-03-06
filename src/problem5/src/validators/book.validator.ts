import Joi from 'joi';

export const idValidatorSchema = Joi.object({
  id: Joi.number().min(1).required(),
});

export const getBooksValidatorSchema = Joi.object({
  minPrice: Joi.number().min(0).optional(),
  maxPrice: Joi.number().optional(),
  author: Joi.string().optional(),
  category: Joi.string().optional(),
  publisher: Joi.string().optional(),
  title: Joi.string().optional(),
  includeDeleted: Joi.boolean().optional().default(false),
});

export const createBookValidatorSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  category: Joi.string().required(),
  publishedDate: Joi.date().timestamp('unix').required(),
  publisher: Joi.string().required(),
  price: Joi.number().min(0).required(),
});

export const updateBookValidatorSchema = Joi.object({
  title: Joi.string().optional(),
  author: Joi.string().optional(),
  category: Joi.string().optional(),
  publishedDate: Joi.date().timestamp('unix').optional(),
  publisher: Joi.string().optional(),
  price: Joi.number().min(0).optional(),
}).min(1);
