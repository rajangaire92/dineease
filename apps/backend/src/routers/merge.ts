import { userContract } from '@libs/contract';
import { userRouter } from './user-route';
import type { Express } from 'express';
import { createExpressEndpoints } from '@ts-rest/express';
import { logger } from '@libs/backend-shared';

const routers = [
  {
    contract: userContract,
    router: userRouter,
  },
];

export function generateEndPoints(app: Express) {
  return routers.map(({ contract, router }) => {
    createExpressEndpoints(contract, router, app, {
      logInitialization: true,
      requestValidationErrorHandler(err, req, res, next) {
        logger.error(err, 'Request validation error');
        res.status(400).json({
          error: 'Request validation error',
          isSuccess: false,
          fieldErrors: err.body?.flatten().fieldErrors,
        });
      },
    });
  });
}
