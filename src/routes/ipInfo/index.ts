import axios from 'axios';
import express, { Request, Response } from 'express';
import redisInstance from '../../cache/redis';
import { EXPIRATION_IN_SECONDS } from '../../common/constants';
import { InternalErrorResponse, SuccessResponse } from '../../core/Responses';
import validator, { ValidationSource } from '../../helpers/validator';
import checkCache from '../../middleware/checkCache';
import { IpInfoQuery } from './dto/IpInfoQuery.dto';

const router = express.Router();

router.get(
  '/',
  checkCache,
  validator(IpInfoQuery, ValidationSource.Query),
  async (req: Request, res: Response) => {
    try {
      const response = await axios.get(`http://ipwho.is/${req.query.ip}`);

      await redisInstance.set(
        `${req.query.ip}`,
        JSON.stringify(response.data),
        EXPIRATION_IN_SECONDS,
      );

      return new SuccessResponse('success', response.data).send(res);
    } catch (error) {
      return new InternalErrorResponse(error);
    }
  },
);

export default router;
