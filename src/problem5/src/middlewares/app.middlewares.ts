import express from 'express';
import cors from 'cors';
import compress from 'compression';
import { pinoHttp } from 'pino-http';
import rateLimit from 'express-rate-limit';
import { AppException } from '../kernel/app-exception';
import { HttpCode } from '../utils/http-code';

export const attachApplicationMiddlewares = (app: express.Express) => {
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    }),
  );
  app.use(cors());

   
  app.use(compress());

  app.use(pinoHttp({}));

  app.use(
    rateLimit({
      windowMs: 1 * 1000, // 1 minutes
      limit: 20, // Limit each IP to 20 requests per `window` (here, per 1 minutes).
      handler: (_req, _res, next) => {
        next(new AppException(HttpCode.TOO_MANY_REQUESTS, 'Too many requests'));
      },
    }),
  );
};
