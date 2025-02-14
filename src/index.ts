import app from './app';
import { port } from './common/config';
import Logger from './core/Logger';

app
  .listen(port, () => {
    Logger.info(`Server running on port: ${port}`);
  })
  .on('error', (e) => Logger.error(e));
