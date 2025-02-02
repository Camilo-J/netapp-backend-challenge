import { createUser, deleteUser, getUserById, updateUser, listUsers, getUserByEmail } from '../models/user';
import { Request, Response } from 'express';
import { omit, parallel, tryit } from 'radashi';
import { User } from '../interfaces/user';

const listUsersController = async (_req: Request, res: Response) => {
  const [error, users] = await tryit(listUsers)();

  if (error) {
    res.status(400).json({ message: error.message });
    return;
  }

  const usersWithoutPassword = await parallel(5, users, async (user) => {
    return omit(user, ['password']);
  });

  res.status(200).json(usersWithoutPassword);
};

const createUserController = async (req: Request, res: Response) => {
  const userData = req.body as unknown as User;

  const userFound = await getUserByEmail(userData.email);

  if (userFound !== null) {
    res.status(400).json({ message: 'Email already exists' });
    return;
  }

  const [error, user] = await tryit(createUser)(userData);

  if (error) {
    res.status(400).json({ message: error.message });
    return;
  }

  res.status(201).json(omit(user, ['password']));
};

const getUserController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const [error, user] = await tryit(getUserById)(Number(id));

  if (error) {
    res.status(400).json({ message: error.message });
    return;
  }

  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  res.status(200).json(omit(user, ['password']));
};

const updateUserController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data: User = req.body;

  const [error, userUpdated] = await tryit(updateUser)(Number(id), data);

  if (error) {
    res.status(400).json({ message: error.message });
    return;
  }

  res.status(200).json(omit(userUpdated, ['password']));
};

const deleteUserController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const [error, _] = await tryit(deleteUser)(Number(id));

  if (error) {
    res.status(400).json({ message: error.message });
    return;
  }

  res.status(204).send();
};

export { createUserController, getUserController, updateUserController, deleteUserController, listUsersController };
