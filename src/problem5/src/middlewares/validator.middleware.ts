import { paginationValidatorSchema } from '../validators';
import { AppException } from '../kernel/app-exception';
import { HttpCode } from '../utils/http-code';
import { Request, Response, NextFunction } from 'express';
import { AnySchema, ObjectSchema } from 'joi';

type FieldToValidate = 'body' | 'params' | 'query';

const validator =
  (schema: AnySchema, fieldToValidate: FieldToValidate) =>
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const validated = await schema.validateAsync(req[fieldToValidate]);
        req[fieldToValidate] = validated;

        next();
      } catch (err) {
        next(new AppException(HttpCode.BAD_REQUEST, 'Invalid request', err));
      }
    };

const paginationValidator =
  (schema: ObjectSchema) =>
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const finalSchema = paginationValidatorSchema.concat(schema);
        const validated = await finalSchema.validateAsync(req['query']);
        req['query'] = validated;

        next();
      } catch (err) {
        console.log(err);
        next(new AppException(HttpCode.BAD_REQUEST, 'Invalid request', err));
      }
    };
export { validator, paginationValidator };
