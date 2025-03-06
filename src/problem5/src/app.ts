import express from 'express';

import { attachApplicationMiddlewares } from './middlewares/app.middlewares';
import { bookRouter } from './routers/v1/book.router';
import { errorHandler } from './middlewares/error-handler.middleware';
import { BaseResponse } from './kernel/base-response';
import { NotFoundException } from './kernel/exceptions';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './docs/swagger';

const app = express();

const configApp = (app: express.Express) => {
  attachApplicationMiddlewares(app);

  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.use('/v1/books', bookRouter);

  app.get('/', (req, res) => {
    res.json({ Ping: 'Pong' });
  });

  // 404 Handler
  app.use((req, res) => {
    res
      .status(404)
      .json(BaseResponse.error(new NotFoundException('Not found')));
  });
  app.use(errorHandler);
};

configApp(app);

export { app };
