import { User } from '../interfaces/user';
import { verify, sign } from 'jsonwebtoken';
import { randomBytes } from 'crypto';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

/**
 *You must send the user's object
 *@param user
 *@returns
 */
export function tokenSign(user: User) {
  return sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: '2h'
  });
}

/**
 * You must send the session's token JWT
 * @param token
 * @returns
 */
export async function tokenVerify(token: string) {
  return verify(token, JWT_SECRET);
}

export function tokenRefresh() {
  const refresh = randomBytes(60).toString('hex');
  return refresh;
}
