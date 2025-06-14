import { handleApiErrorAndRespond } from '@libs/backend-shared';
import { userContract } from '@libs/contract';
import { userRepo } from '@libs/database';
import { AppRouteImplementation } from '@ts-rest/express';
import { StatusCodes } from 'http-status-codes';

export const getUserByEmail: AppRouteImplementation<
  typeof userContract.getUserByEmail
> = async ({ req, query }) => {
  try {
    const user = await userRepo.findByEmail(query.email);

    if (!user) {
      return {
        status: StatusCodes.NOT_FOUND,
        body: {
          data: null,
          isSuccess: false,
          message: 'User not found',
        },
      };
    }

    return {
      status: StatusCodes.OK,
      body: {
        data: user,
        isSuccess: true,
        message: 'User found',
      },
    };
  } catch (e) {
    return handleApiErrorAndRespond(e, req);
  }
};
