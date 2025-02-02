import { prisma } from '../constants/prisma';
import { User } from '../interfaces/user';

export async function listUsers() {
  return await prisma.user.findMany();
}

export async function createUser(data: User) {
  return await prisma.user.create({
    data: {
      name: data.name,
      lastName: data.lastName,
      username: data.username,
      email: data.email,
      password: data.password
    }
  });
}

export async function getUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: { email }
  });
}

export async function getUserById(id: number) {
  return await prisma.user.findUnique({
    where: { id }
  });
}

export async function updateUser(id: number, data: User) {
  return await prisma.user.update({
    where: { id },
    data: { ...data }
  });
}

export async function deleteUser(id: number) {
  return await prisma.user.delete({
    where: { id }
  });
}
