import { Request, Response } from 'express';
import User from '../../core/domain/entieies/User';
import { UserRepositoriesImpl } from '../../infrastructure/repositories/UserRepositoriesImpl';

const UserRepositories = new UserRepositoriesImpl();

export const createUser = (req: Request, res: Response) => {
  UserRepositories.findAll().then(async (users: User[] | null) => {
    let username: string;
    let found: User | undefined;

    if (req.body.usernme) {
      username = req.body.username;
    } else {
      username = 'Anonimo';
    }

    if (users) {
      found = users.find((user) => user.getUsername() == username);
    }

    if (found && found.getUsername() != 'Anonimo') {
      res.status(400).json('Name already exists');
    } else {
      const password = req.body.password; //esto puede que no este bien aqui
      const newUser = new User(username, password);
      try {
        await UserRepositories.create(newUser);
        res.json(newUser);
      } catch (error) {
        res.status(500).json('Unable to store the new User');
      }
    }
  });
};

export const findAllUsers = (_req: Request, res: Response) => {
  console.log(`falta implemntar findAllUsers`);
  res.status(404);
};

export const updateUser = (_req: Request, res: Response) => {
  console.log(`falta implemntar updateUser`);
  res.status(404);
};

export const deleteUser = (_req: Request, res: Response) => {
  console.log(`falta implemntar deleteUser`);
  res.status(404);
};
