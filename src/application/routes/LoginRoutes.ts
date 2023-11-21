import * as express from 'express';
import { createToken } from '../controllers/LoginControllers';

export const loginRouter = express.Router();

loginRouter.post('/', createToken);
