import { initContract } from '@ts-rest/core';
import {
  GetUserByEmailInputSchema,
  GetUserByEmailResponseSchema,
} from './schema';
import { ErrorSchema } from '../lib/schema';

const c = initContract();

export const userContract = c.router({
  getUserByEmail: {
    method: 'GET',
    path: '/user/getUserByEmail',
    query: GetUserByEmailInputSchema,
    responses: {
      200: GetUserByEmailResponseSchema,
      400: ErrorSchema,
      404: ErrorSchema,
      500: ErrorSchema,
    },
  },
});
