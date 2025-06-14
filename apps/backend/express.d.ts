// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      requestId: string;
      decodedAccessToken: {
        email: string;
        name: string;
        iat: number;
        exp: number;
      };
    }
  }
}
