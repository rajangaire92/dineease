import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { logger } from './logger';

export type TNextError = {
  message: string;
  status: StatusCodes;
};

export function errorHandler(
  err: TNextError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.error(err, 'Caught final exception');
  res.status(err.status || 500).json({ error: 'Internal server error' });
}

export function customNext(next: NextFunction, arg?: TNextError) {
  if (arg && Object.keys(arg).length) {
    const { message, status } = arg;
    return next({
      message,
      status,
    });
  }

  return next();
}

export function notFoundHandler(req: Request, res: Response) {
  res.status(404).json({ error: 'Not found' });
}

export function handleApiErrorAndRespond(error: unknown, req: Request) {
  if (error instanceof BaseError) {
    const baseMessage =
      error.type === 'server' ? 'Internal Server Error' : 'Client Error';

    logger.error(
      {
        method: req.method,
        url: req.url,
        error: {
          message: error.message,
          stack: error.stack,
        },
        body: req?.body,
        query: req?.query,
        params: req.params,
      },
      `${baseMessage}: ${error.message}`
    );

    if (error.type === 'client') {
      return {
        status: error.status ?? (StatusCodes.BAD_REQUEST as any),
        body: {
          message: error.message,
        },
      };
    } else {
      return {
        status: error.status ?? (StatusCodes.INTERNAL_SERVER_ERROR as any),
        body: {
          message: 'Internal Server Error',
        },
      };
    }
  } else {
    logger.error(
      {
        method: req.method,
        url: req.url,
        error: {
          message: (error as Error)?.message || 'Unknown error',
          stack: (error as Error).stack,
        },
        body: req?.body,
        query: req?.query,
        params: req.params,
      },
      `Unhandled Error: ${(error as Error)?.message || 'Unknown error'}`
    );

    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR as any,
      body: {
        message: 'Internal Server Error',
      },
    };
  }
}

export class BaseError extends Error {
  status: StatusCodes;
  type: 'server' | 'client';

  constructor({
    message,
    status,
    type = 'server',
  }: {
    message: string;
    status: StatusCodes;
    type: 'server' | 'client';
  }) {
    super(message);
    this.name = 'BaseError';
    this.status = status;
    this.type = type;
  }
}
