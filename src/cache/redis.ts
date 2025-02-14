import Redis, { RedisKey } from 'ioredis';
import { redis } from '../common/config';
import Logger from '../core/Logger';

interface ICacheService {
  set(
    key: RedisKey,
    value: string | Buffer | number,
    expiry?: number | string,
  ): Promise<void>;
  get(key: RedisKey): Promise<string | null>;
  delete(key: RedisKey): Promise<number>;
  disconnect(): Promise<void>;
}

class RedisService implements ICacheService {
  private static instance: RedisService;
  private client: Redis;

  private constructor() {
    this.client = new Redis({
      host: redis.host,
      port: redis.port,
      password: redis.password,
    });

    this.client.on('connect', () => Logger.info('Cache is connecting'));
    this.client.on('ready', () => Logger.info('Cache is ready'));
    this.client.on('end', () => Logger.info('Cache disconnected'));
    this.client.on('reconnecting', () => Logger.info('Cache is reconnecting'));
    this.client.on('error', (e) => Logger.error(e));

    process.on('SIGINT', async () => {
      await this.client.quit();
      Logger.info('Redis client disconnected on app termination');
    });
  }

  public static getInstance(): RedisService {
    if (!this.instance) {
      this.instance = new RedisService();
    }
    return this.instance;
  }

  async set(
    key: RedisKey,
    value: string | Buffer | number,
    expiry?: number | string,
  ): Promise<void> {
    try {
      if (expiry) {
        await this.client.set(key, value, 'EX', expiry);
      } else {
        await this.client.set(key, value);
      }
    } catch (err) {
      Logger.error('Error during set operation', err);
      throw err;
    }
  }

  async get(key: RedisKey): Promise<string | null> {
    try {
      return await this.client.get(key);
    } catch (err) {
      Logger.error('Error during get operation', err);
      throw err;
    }
  }

  async delete(key: RedisKey): Promise<number> {
    try {
      return await this.client.del(key);
    } catch (err) {
      Logger.error('Error during delete operation', err);
      throw err;
    }
  }

  async disconnect(): Promise<void> {
    try {
      await this.client.quit();
    } catch (err) {
      Logger.error('Error during disconnection', err);
      throw err;
    }
  }
}

const redisService = RedisService.getInstance();
export default redisService;
