import { z } from 'zod';

export const BASE_API_PATH = '/api/v1';

export const ErrorSchema = z.object({
  message: z.string(),
  isSuccess: z.boolean(),
});

export const SuccessSchema = z.object({
  message: z.string(),
  isSuccess: z.boolean(),
});

export const PaginationInputSchema = z.object({
  page: z.number(),
  perPage: z.number(),
});
export type TPaginationInput = z.infer<typeof PaginationInputSchema>;

export const PaginationOutputSchema = z.object({
  page: z.number(),
  perPage: z.number(),
  total: z.number(),
  totalPages: z.number(),
});
export type TPaginationOutput = z.infer<typeof PaginationOutputSchema>;

export const TrueOrFalseInputSchema = z.enum(['true', 'false']);
export type TTrueOrFalseInput = z.infer<typeof TrueOrFalseInputSchema>;
