import {
  ISignUpHandler,
  ILoginHandler,
  ILogoutHandler,
  IRefreshHandler,
  IResetPasswordHandler,
  IMeRouteHandler,
  IVerifyEmailHandler,
  IForgotPasswordHandler,
  ISendOtpHandler,
} from '@baijanstack/express-auth';
import { userRepo } from '@libs/database';
import { UserRole } from '@prisma/client';

export type TUser = {
  name: string;
  email: string;
  password: string;
  is_email_verified: boolean;
  role: UserRole;
};

type TEmailObj = {
  email: string;
};

interface TSignUpBodyInput extends TEmailObj {
  name: string;
  password: string;
  role: UserRole;
}

export class SignUpHandler implements ISignUpHandler {
  constructor() {
    //
  }

  doesUserExists: (body: TSignUpBodyInput) => Promise<boolean> = async (
    body
  ) => {
    const user = await userRepo.findByEmail(body.email);
    return !!user;
  };

  saveUser: (body: TSignUpBodyInput, hashedPassword: string) => Promise<void> =
    async (body, hashedPassword) => {
      await userRepo.signUp({
        name: body.name,
        email: body.email,
        password: hashedPassword,
        role: body.role,
      });
    };
}

export class LoginHandler implements ILoginHandler {
  getUserByEmail: (email: string) => Promise<TUser | null> = async (email) => {
    const user = await userRepo.findByEmail(email);

    if (!user) {
      return null;
    }

    return {
      name: user?.name,
      email: user?.email,
      password: user?.password,
      is_email_verified: user?.is_email_verified,
      role: user?.role,
    };
  };

  getTokenPayload: (email: string) => Promise<{
    name: string;
    email: string;
  } | null> = async (email) => {
    const user = await userRepo.findByEmail(email);

    if (!user) {
      return null;
    }

    return {
      id: user?.id,
      role: user?.role,
      is_email_verified: user?.is_email_verified,
      email: user?.email,
      name: user?.name,
    };
  };
}

export class LogoutHandler implements ILogoutHandler {
  shouldLogout: () => Promise<boolean> = async () => {
    return true;
  };
}

export class RefreshHandler implements IRefreshHandler {
  getTokenPayload: (email: string) => Promise<{
    name: string;
    email: string;
  } | null> = async (email) => {
    const user = await userRepo.findByEmail(email);

    if (!user) {
      return null;
    }

    return {
      email: user?.email,
      name: user?.name,
    };
  };
}

export class ResetPasswordHandler implements IResetPasswordHandler {
  saveHashedPassword: (email: string, hashedPassword: string) => Promise<void> =
    async (email, hashedPassword) => {
      await userRepo.updateByEmail(email, {
        password: hashedPassword,
      });
    };
  getOldPasswordHash: (email: string) => Promise<string> = async (email) => {
    const user = await userRepo.findByEmail(email);

    if (!user) {
      return '';
    }
    return user.password;
  };
}

export class MeRouteHandler implements IMeRouteHandler {
  getMeByEmail: (
    email: string
  ) => Promise<{ email: string; name: string } | null> = async (email) => {
    const user = await userRepo.findByEmail(email);

    if (!user) {
      return null;
    }

    return {
      id: user?.id,
      role: user?.role,
      is_email_verified: user?.is_email_verified,
      name: user?.name,
      email: user?.email,
    };
  };
}

export class VerifyEmailHandler implements IVerifyEmailHandler {
  updateIsEmailVerifiedField: (email: string) => Promise<void> = async (
    email
  ) => {
    await userRepo.updateByEmail(email, { is_email_verified: true });
  };

  isEmailAlreadyVerified: (email: string) => Promise<boolean> = async (
    email
  ) => {
    const user = await userRepo.findByEmail(email);
    return !user?.is_email_verified;
  };
}

export class SendOtpHandler implements ISendOtpHandler {
  doesUserExists: (email: string) => Promise<boolean> = async (email) => {
    const user = await userRepo.findByEmail(email);
    return !!user;
  };
}

export class ForgotPasswordHandler implements IForgotPasswordHandler {
  saveNewPassword: (email: string, password: string) => Promise<void> = async (
    email,
    password
  ) => {
    await userRepo.updateByEmail(email, {
      password,
    });
  };
}
