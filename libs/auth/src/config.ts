import { TConfig } from '@baijanstack/express-auth';

export const authConfig: TConfig = {
  BASE_PATH: '/v1/auth', // base path for authentication
  SALT_ROUNDS: Number(process.env['SALT_ROUNDS']) || 10, // number of rounds for password hashing
  TOKEN_SECRET: process.env['TOKEN_SECRET'] || '', // secret for token generation
  ACCESS_TOKEN_AGE: Number(process.env['ACCESS_TOKEN_AGE']) || 60, // age of access token in seconds
  REFRESH_TOKEN_AGE: Number(process.env['REFRESH_TOKEN_AGE']) || 86400, // age of refresh token in seconds
  OTP_AGE: Number(process.env['OTP_AGE']) || 40, // age of otp in seconds
  OTP_SECRET: process.env['OTP_SECRET'] || '',
};
