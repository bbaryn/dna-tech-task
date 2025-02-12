import express from 'express';
import Logger from './core/Logger';
import routes from './routes';

process.on('uncaughtException', (e) => {
  Logger.error(e);
});

const app = express();

app.use(express.json());

app.use('/', routes);

export default app;
