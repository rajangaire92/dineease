import { z } from 'zod';
import { UserSchema } from '../__generated__';
import { SuccessSchema } from '../lib/schema';

export const GetUserByEmailInputSchema = UserSchema.pick({
  email: true,
});
export type TGetUserByEmailInput = z.infer<typeof GetUserByEmailInputSchema>;

export const GetUserByEmailResponseSchema = SuccessSchema.extend({
  data: UserSchema,
});
export type TGetUserByEmailResponse = z.infer<
  typeof GetUserByEmailResponseSchema
>;
