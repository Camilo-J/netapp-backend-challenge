import { prisma } from '../constants/prisma';
import { Session } from '../interfaces/session';

export async function createSession(data: Session) {
  return await prisma.session.create({
    data: {
      userId: data.userId,
      token: data.token,
      device: data.device,
      active: data.active
    }
  });
}

export async function getSessionByToken(token: string) {
  return await prisma.session.findUnique({
    where: { token }
  });
}

export async function updateSession(token: string, data: Session) {
  return await prisma.session.update({
    where: { token },
    data: { ...data }
  });
}

export async function deleteSession(token: string) {
  return await prisma.session.delete({
    where: { token }
  });
}
