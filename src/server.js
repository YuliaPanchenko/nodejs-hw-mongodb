import express from 'express';
import pinoHttp from 'pino-http';
import cors from 'cors';
import router from './routers/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import cookieParser from 'cookie-parser';
import { UPLOAD_DIR } from './constants/index.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';

const setupServer = () => {
  const app = express();

  app.use(
    express.json({
      type: ['application/json', 'application/vnd.api+json'],
    }),
  );

  app.use(
    cors({
      origin: 'http://localhost:3000',
      optionsSuccessStatus: 200,
    }),
  );

  app.use(
    pinoHttp({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );
  app.use(cookieParser());

  app.get('/', (req, res) => {
    res.send('Hello, Express');
  });

  app.use(router);
  app.use('/uploads', express.static(UPLOAD_DIR));
  app.use('/api-docs', swaggerDocs());

  app.use('*', notFoundHandler);

  app.use(errorHandler);

  return app;
};

export { setupServer };
