import axios from 'axios';
import express, { Request, Response } from 'express';
import redisInstance from '../../cache/redis';
import { EXPIRATION_IN_SECONDS } from '../../common/constants';
import {
  InternalErrorResponse,
  NoContentResponse,
  SuccessResponse,
} from '../../core/Responses';
import validator, { ValidationSource } from '../../helpers/validator';
import checkCache from '../../middleware/checkCache';
import { DeleteIpInfoBody } from './dto/deleteIpInfoBody';
import { GetIpInfoQuery } from './dto/getIpInfoQuery';

const router = express.Router();

router.get(
  '/',
  checkCache,
  validator(GetIpInfoQuery, ValidationSource.Query),
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

router.delete(
  '/',
  validator(DeleteIpInfoBody, ValidationSource.Body),
  async (req: Request, res: Response) => {
    try {
      await redisInstance.delete(`${req.body.ip}`);

      return new NoContentResponse().send(res);
    } catch (error) {
      return new InternalErrorResponse(error);
    }
  },
);

export default router;
