import { NextFunction, Request, Response } from 'express';
import redisInstance from '../cache/redis';
import Logger from '../core/Logger';
import { SuccessResponse } from '../core/Responses';

const checkCache = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const key = req.params.ip || req.query.ip;
    if (!key) {
      next();
      return;
    }

    const cache = await redisInstance.get(`${key}`);
    if (!cache) {
      next();
      return;
    }

    Logger.info(`Key “${key}” found in cache`);
    return new SuccessResponse('success', JSON.parse(cache)).send(res);
  } catch (error) {
    Logger.error(error);
    next();
  }
};

export default checkCache;
