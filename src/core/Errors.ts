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

interface ErrorResponder {
  send(res: Response): Response;
}

class BadRequestResponder implements ErrorResponder {
  constructor(private message: string) {}
  send(res: Response): Response {
    return new BadRequestResponse(this.message).send(res);
  }
}

class NotFoundResponder implements ErrorResponder {
  constructor(private message: string) {}
  send(res: Response): Response {
    return new NotFoundResponse(this.message).send(res);
  }
}

class InternalErrorResponder implements ErrorResponder {
  constructor(private message: string) {}
  send(res: Response): Response {
    return new InternalErrorResponse(this.message).send(res);
  }
}

export abstract class AppError extends Error {
  constructor(
    public type: ErrorType,
    public message: string = 'error',
  ) {
    super(type);
  }
}

export class InternalError extends AppError {
  constructor(message = 'Internal error') {
    super(ErrorType.INTERNAL, message);
  }
}

export class BadRequestError extends AppError {
  constructor(message = 'Bad Request') {
    super(ErrorType.BAD_REQUEST, message);
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Not Found') {
    super(ErrorType.NOT_FOUND, message);
  }
}

export class ErrorHandler {
  private static responderMap: Record<
    ErrorType,
    new (message: string) => ErrorResponder
  > = {
    [ErrorType.BAD_REQUEST]: BadRequestResponder,
    [ErrorType.NOT_FOUND]: NotFoundResponder,
    [ErrorType.INTERNAL]: InternalErrorResponder,
  };

  public static handle(err: AppError, res: Response): Response {
    const ResponderClass =
      this.responderMap[err.type] || InternalErrorResponder;
    const message =
      environment === 'production' && err.type === ErrorType.INTERNAL
        ? 'Something wrong happened.'
        : err.message;

    return new ResponderClass(message).send(res);
  }
}
