import Joi from 'joi';

export const paginationValidatorSchema = Joi.object({
  skip: Joi.number().optional().min(0).default(0),
  limit: Joi.number().optional().min(0).default(10),
});
