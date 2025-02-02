import { createSession, deleteSession, getSessionByToken } from '../models/session';
import { createUser, getUserByEmail, getUserById, updateUser } from '../models/user';
import { comparePassword, encryptPassword } from '../utils/handlePassword';
import { tokenRefresh, tokenSign } from '../utils/handleJwt';
import { Request, Response } from 'express';
import { omit, tryit } from 'radashi';
import { storeCookie } from '../utils/storeCookie';
import { User } from '../interfaces/user';

const register = async (req: Request, res: Response) => {
  const userData = req.body as unknown as User;
  const hashedPassword = await encryptPassword(userData.password);

  const userFound = await getUserByEmail(userData.email);

  if (userFound !== null) {
    res.status(400).json({ error: { message: 'Email already exists' } });
    return;
  }

  const newTokenRefresh = tokenRefresh();

  const [error, userCreated] = await tryit(createUser)({
    ...userData,
    password: hashedPassword
  });

  if (error) {
    res.status(500).json({ message: 'Internal Server Error' });
    return;
  }
  const token = tokenSign(userCreated as User);

  const [errorSession, _] = await tryit(createSession)({
    userId: userCreated.id,
    token: newTokenRefresh,
    device: 'web',
    active: true
  });

  if (errorSession) {
    res.status(500).json({ message: 'Internal Server Error' });
    return;
  }

  const serialized = storeCookie({ cookieValue: token, cookieName: 'token' });

  res
    .setHeader('Set-Cookie', serialized)
    .status(201)
    .json({ user: omit(userCreated, ['password']), refreshToken: newTokenRefresh, token });
};

const login = async (req: Request, res: Response) => {
  const userData = req.body as unknown as User;
  const userFound = await getUserByEmail(userData.email);

  if (userFound === null) {
    res.status(400).json({ error: { message: 'Invalid Credentials' } });
    return;
  }

  const passwordMatch = await comparePassword(userData.password, userFound.password);

  if (!passwordMatch) {
    res.status(400).json({ message: 'Invalid Credentials' });
    return;
  }

  const newTokenRefresh = tokenRefresh();
  const token = tokenSign(userFound as User);

  const [error, _] = await tryit(createSession)({
    userId: userFound.id,
    token: newTokenRefresh,
    device: 'web',
    active: true
  });

  if (error) {
    res.status(500).json({ message: 'Internal Server Error' });
    return;
  }

  const serialized = storeCookie({ cookieValue: token, cookieName: 'token' });

  res
    .setHeader('Set-Cookie', serialized)
    .status(200)
    .json({ user: omit(userFound, ['password']), token, refreshToken: newTokenRefresh });
};

const logout = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  const sessionFound = await getSessionByToken(refreshToken);

  if (sessionFound === null) {
    res.status(400).json({ message: 'Invalid Token' });
    return;
  }
  await deleteSession(refreshToken);
  const serialized = storeCookie({ cookieValue: 'null', cookieName: 'token' });

  res.setHeader('Set-Cookie', serialized).sendStatus(204);
  res.status(204).end();
};

const token = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  try {
    const sessionFound = await getSessionByToken(refreshToken);
    if (sessionFound === null) {
      res.status(400).json({ message: 'Error in request Token' });
      return;
    }

    const user = await getUserById(sessionFound.userId);

    const token = tokenSign(user as User);
    const serialized = storeCookie({ cookieValue: token, cookieName: 'token' });
    res.setHeader('Set-Cookie', serialized).status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const changePassword = async (req: Request, res: Response) => {
  const { oldPassword, newPassword, userId } = req.body;

  const user = await getUserById(userId);

  if (user === null) {
    res.status(400).json({ message: 'Invalid Credentials' });
    return;
  }

  const passwordMatch = await comparePassword(oldPassword, user.password);

  if (!passwordMatch) {
    res.status(400).json({ message: 'Invalid Credentials' });
    return;
  }

  const hashedPassword = await encryptPassword(newPassword);

  const [error, _] = await tryit(updateUser)(userId, { password: hashedPassword } as User);

  if (error) {
    res.status(500).json({ message: 'Internal Server Error' });
    return;
  }

  res.status(200).json({ message: 'Password updated successfully' });
};

export { register, login, logout, token, changePassword };
