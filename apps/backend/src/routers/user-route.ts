import { userContract } from '@libs/contract';
import { initServer } from '@ts-rest/express';
import { getUserByEmail } from '../modules/user/getUserByEmail';
import { validateAccessToken } from '@baijanstack/express-auth';

const s = initServer();

export const userRouter = s.router(userContract, {
  getUserByEmail: {
    middleware: [validateAccessToken],
    handler: getUserByEmail,
  },
});
