import express, { Request, Response } from 'express';

import { environment } from './common/config';
import {
  AppError,
  ErrorHandler,
  ErrorType,
  InternalError,
  NotFoundError,
} from './core/Errors';
import Logger from './core/Logger';
import routes from './routes';

process.on('uncaughtException', (e) => {
  Logger.error(e);
});

const app = express();

app.use(express.json());

app.use('/', routes);

app.use((_, __, next) => next(new NotFoundError()));

app.use((err: Error, req: Request, res: Response) => {
  if (err instanceof AppError) {
    ErrorHandler.handle(err, res);
    if (err.type === ErrorType.INTERNAL)
      Logger.error(
        `500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`,
      );
  } else {
    Logger.error(
      `500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`,
    );
    Logger.error(err);
    if (environment === 'development') {
      return res.status(500).send(err);
    }
    ErrorHandler.handle(new InternalError(), res);
  }
});

export default app;
