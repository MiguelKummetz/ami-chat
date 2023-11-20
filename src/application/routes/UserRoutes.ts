import * as express from 'express';
import {
  createUser,
  findAllUsers,
  findUserbyId,
  updateUser,
  deleteUser
} from '../controllers/UserControllers';

export const userRouter = express.Router();

userRouter.post('/', createUser);
userRouter.get('/:id', findUserbyId);
userRouter.get('/', findAllUsers);
userRouter.put('/', updateUser);
userRouter.delete('/:id', deleteUser);
