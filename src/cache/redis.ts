import Redis, { RedisKey } from 'ioredis';
import { redis } from '../common/config';
import Logger from '../core/Logger';

class RedisSingleton {
  static instance: RedisSingleton = null;
  private client: Redis = null;

  constructor() {
    if (!RedisSingleton.instance) {
      this.client = new Redis({
        host: redis.host,
        port: redis.port,
        password: redis.password,
      });

      this.client.on('connect', () => Logger.info('Cache is connecting'));
      this.client.on('ready', () => Logger.info('Cache is ready'));
      this.client.on('end', () => Logger.info('Cache disconnected'));
      this.client.on('reconnecting', () =>
        Logger.info('Cache is reconnecting'),
      );
      this.client.on('error', (e) => Logger.error(e));

      RedisSingleton.instance = this;
    }

    process.on('SIGINT', async () => {
      await this.client.disconnect();
    });

    return RedisSingleton.instance;
  }

  async set(
    key: RedisKey,
    value: string | Buffer | number,
    expiry: number | string,
  ) {
    try {
      if (expiry) {
        return this.client.set(key, value, 'EX', expiry);
      }
      return this.client.set(key, value);
    } catch (err) {
      Logger.error('Error during use set method', err);
    }
  }

  async get(key: RedisKey) {
    try {
      return this.client.get(key);
    } catch (err) {
      Logger.error('Błąd podczas pobierania:', err);
    }
  }

  async delete(key: RedisKey) {
    try {
      return this.client.del(key);
    } catch (err) {
      Logger.error('Błąd podczas usuwania:', err);
    }
  }

  async disconnect() {
    try {
      await this.client.quit();
    } catch (err) {
      Logger.error('Błąd podczas zamykania połączenia:', err);
    }
  }
}

const redisInstance = new RedisSingleton();
export default redisInstance;
