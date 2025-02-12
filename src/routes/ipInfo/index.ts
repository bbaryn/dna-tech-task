import axios from 'axios';
import express, { Request, Response } from 'express';
import { InternalErrorResponse, SuccessResponse } from '../../core/Responses';
import validator, { ValidationSource } from '../../helpers/validator';
import { IpInfoQuery } from './dto/IpInfoQuery.dto';

const router = express.Router();

router.get(
  '/',
  validator(IpInfoQuery, ValidationSource.Query),
  async (req: Request, res: Response) => {
    try {
      const response = await axios.get(`http://ipwho.is/${req.query.ip}`);

      return new SuccessResponse('success', response.data).send(res);
    } catch (error) {
      return new InternalErrorResponse(error);
    }
  },
);

export default router;
