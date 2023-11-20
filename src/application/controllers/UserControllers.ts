import { Request, Response } from 'express';
// import express from 'express';
// import { UserRepositoriesImpl } from '../../infrastructure/repositories/UserRepositoriesImpl';
import bcrypt from 'bcrypt';
import { User } from '../../infrastructure/models/UserModel';

// const UserRepositories = new UserRepositoriesImpl();

export const createUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      error: 'required field is missing'
    });
  }
  try {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const creationDate = new Date();
    const user = new User({
      username,
      passwordHash,
      creationDate
    });

    const savedUser = await user.save();

    res.status(200).json(savedUser);
  } catch (error) {
    res.status(500).json({
      error: 'something went wrong creating the user'
    });
  }
};

export const findAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({
      error: 'something went wrong finding the users'
    });
  }
};

export const findUserbyId = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      error: 'id is missing'
    });
  }
  try {
    const users = await User.findById(id);
    res.json(users);
  } catch (error) {
    res.status(500).json({
      error: `something went wrong finding the user with the id: ${id}`
    });
  }
};

export const updateUser = async (_req: Request, res: Response) => {
  console.log(`falta implemntar updateUser`);
  res.status(404);
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({
      error: `something went wrong deleting the user with the id: ${id}`
    });
  }
};
