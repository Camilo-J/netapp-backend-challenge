import { createSession, deleteSession, getSessionByToken } from '../models/session';
import { createUser, getUserByEmail, getUserById } from '../models/user';
import { comparePassword, encryptPassword } from '../utils/handlePassword';
import { tokenRefresh, tokenSign } from '../utils/handleJwt';
import { Request, Response } from 'express';
import { User } from '../interfaces/user';
import { tryit } from 'radashi';

const register = async (req: Request, res: Response) => {
  const userData = req.body as unknown as User;
  const hashedPassword = await encryptPassword(userData.password);

  const userFound = await getUserByEmail(userData.email);

  if (userFound !== null) {
    res.status(400).json({ message: 'Email already exists' });
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

  res.status(201).json({ user: userCreated, refreshToken: newTokenRefresh, token });
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

  res.status(200).json({ user: userFound, token, refreshToken: newTokenRefresh });
};

const logout = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  const sessionFound = await getSessionByToken(refreshToken);

  if (sessionFound === null) {
    res.status(400).json({ message: 'Invalid Token' });
    return;
  }

  await deleteSession(refreshToken);

  res.status(204);
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
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export { register, login, logout, token };
