import app from './app';
import initializeRedisClient from './cache/redis';
import { port } from './common/config';
import Logger from './core/Logger';

initializeRedisClient();

app
  .listen(port, () => {
    Logger.info(`Server running on port: ${port}`);
  })
  .on('error', (e) => Logger.error(e));
