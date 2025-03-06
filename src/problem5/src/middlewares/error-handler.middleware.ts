 
 
 

import { Prisma } from '@prisma/client';
import Joi from 'joi';
import { AppException } from '../kernel/app-exception';
import { HttpCode } from '../utils/http-code';

export const errorHandler = (err, req, res, next) => {
  // A work around with error handler using instanceof with swtich
  // https://stackoverflow.com/a/54286277/12532459

  if (res.headersSent) {
    return next(err);
  }

  let exc: AppException;
  if (err instanceof AppException) {
    exc = err;
  } else if (err instanceof Joi.ValidationError) {
    exc = new AppException(HttpCode.BAD_REQUEST, err.message, err);
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    exc = new AppException(HttpCode.BAD_REQUEST, err.message, err);
  } else {
    exc = new AppException(
      HttpCode.INTERNAL_SERVER_ERROR,
      err.message?.toString(),
      err,
    );
  }

  res.status(exc.status).json(exc);
};
