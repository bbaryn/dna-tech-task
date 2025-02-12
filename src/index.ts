import app from './app';
import Logger from './core/Logger';

app
  .listen(3000, () => {
    Logger.info(`Server running on port: ${3000}`);
  })
  .on('error', (e) => Logger.error(e));
