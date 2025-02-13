import app from './app';
import { port } from './common/config';
import Logger from './core/Logger';

app
  .listen(port, () => {
    Logger.info(`Server running on port: ${port}`);
  })
  .on('error', (e) => Logger.error(e))
  .on('exit', () => Logger.info('Exit'))
  .on('SIGINT', () => Logger.info('SIGINT'))
  .on('SIGTERM', () => Logger.info('SIGTERM'));
