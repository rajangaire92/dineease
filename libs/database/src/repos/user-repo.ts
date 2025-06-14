import { Prisma, UserRole } from '@prisma/client';
import { db } from '../client';

export const userRepo = {
  create,
  updateById,
  updateByEmail,
  signUp,
  findById,
  findByEmail,
};

async function create(input: Prisma.UserCreateInput) {
  return db.user.create({
    data: input,
  });
}

async function signUp(input: {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}) {
  return db.user.create({
    data: {
      name: input.name,
      email: input.email,
      password: input.password,
      role: input.role,
    },
  });
}

async function updateById(id: string, input: Prisma.UserUpdateInput) {
  return db.user.update({
    where: {
      id,
    },
    data: input,
  });
}

async function updateByEmail(email: string, input: Prisma.UserUpdateInput) {
  return db.user.update({
    where: {
      email,
    },
    data: input,
  });
}

async function findById(id: string) {
  return db.user.findUnique({
    where: {
      id,
    },
  });
}

async function findByEmail(email: string) {
  return db.user.findUnique({
    where: {
      email,
    },
  });
}
