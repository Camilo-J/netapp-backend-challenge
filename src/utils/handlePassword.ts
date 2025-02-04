import { genSalt, hash, compare } from 'bcryptjs';

export async function encryptPassword(password: string) {
  const salt = await genSalt(10);
  return await hash(password, salt);
}

export async function comparePassword(password: string, hashedPassword: string) {
  return await compare(password, hashedPassword);
}
