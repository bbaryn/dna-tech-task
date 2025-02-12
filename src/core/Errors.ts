import { Response } from 'express';
import { environment } from '../common/config';
import {
  BadRequestResponse,
  InternalErrorResponse,
  NotFoundResponse,
} from './Responses';

export enum ErrorType {
  BAD_REQUEST = 'BadRequestError',
  NOT_FOUND = 'NotFoundError',
  INTERNAL = 'InternalError',
}

export abstract class Errors extends Error {
  constructor(
    public type: ErrorType,
    public message: string = 'error',
  ) {
    super(type);
  }

  public static handle(err: Errors, res: Response): Response {
    switch (err.type) {
      case ErrorType.INTERNAL:
        return new InternalErrorResponse(err.message).send(res);
      case ErrorType.NOT_FOUND:
        return new NotFoundResponse(err.message).send(res);
      case ErrorType.BAD_REQUEST:
        return new BadRequestResponse(err.message).send(res);
      default: {
        let message = err.message;
        if (environment === 'production') message = 'Something wrong happened.';
        return new InternalErrorResponse(message).send(res);
      }
    }
  }
}

export class InternalError extends Errors {
  constructor(message = 'Internal error') {
    super(ErrorType.INTERNAL, message);
  }
}

export class BadRequestError extends Errors {
  constructor(message = 'Bad Request') {
    super(ErrorType.BAD_REQUEST, message);
  }
}

export class NotFoundError extends Errors {
  constructor(message = 'Not Found') {
    super(ErrorType.NOT_FOUND, message);
  }
}
