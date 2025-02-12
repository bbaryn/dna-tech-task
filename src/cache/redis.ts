import { NextFunction, Request, Response } from 'express';
import Redis from 'ioredis';
import { redis } from '../common/config';
import Logger from '../core/Logger';

let redisClient;

async function initializeRedisClient() {
  redisClient = new Redis({
    port: redis.port,
    host: redis.host,
    password: redis.password,
  });

  redisClient.on('connect', () => Logger.info('Cache is connecting'));
  redisClient.on('ready', () => Logger.info('Cache is ready'));
  redisClient.on('end', () => Logger.info('Cache disconnected'));
  redisClient.on('reconnecting', () => Logger.info('Cache is reconnecting'));
  redisClient.on('error', (e) => Logger.error(e));

  (async () => {
    await redisClient.connect();
  })();

  process.on('SIGINT', async () => {
    await redisClient.disconnect();
  });
}

async function checkCache(req: Request, res: Response, next: NextFunction) {
  const cachedData = await redisClient.get('cachedData');

  if (cachedData) {
    res.send(JSON.parse(cachedData));
  } else {
    next();
  }
}

export default initializeRedisClient;
