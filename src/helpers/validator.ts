import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { BadRequestError } from '../core/Errors';

export enum ValidationSource {
  Query = 'query',
}

export default <T extends object>(
    schema: ClassConstructor<T>,
    source: ValidationSource,
  ) =>
  async (req: Request, _: Response, next: NextFunction) => {
    try {
      const query = plainToInstance(schema, req[source]);
      const errors = await validate(query);

      if (!errors.length) return next();

      next(new BadRequestError(JSON.stringify(errors[0].constraints)));
    } catch (error) {
      next(error);
    }
  };
