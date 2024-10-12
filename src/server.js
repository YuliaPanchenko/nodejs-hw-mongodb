import express from 'express';
import pinoHttp from 'pino-http';
import cors from 'cors';
import contactsRouter from '../src/routers/contacts.js';

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

  app.get('/', (req, res) => {
    res.send('Hello, Express');
  });

  app.use(contactsRouter);

  app.use((req, res, next) => {
    res.status(404).json({ message: 'Not found' });
  });

  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  });

  return app;
};

export { setupServer };
