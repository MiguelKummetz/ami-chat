import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../../infrastructure/models/UserModel';

export const createToken = async (req: Request, res: Response) => {
  console.log('se ha entrado en createToken');
  const { body } = req;
  const { username, password } = body;
  console.log(username, password);
  const user = await User.findOne({ username });

  let passwordIsCorrect;
  if (!user) {
    passwordIsCorrect = false;
  } else {
    passwordIsCorrect = await bcrypt.compare(password, user.passwordHash!);
  }

  if (!(user && passwordIsCorrect)) {
    console.log('invalid user or password');
    res.status(401).json({ error: 'invalid user or password' });
  } else {
    const userForToken = {
      id: user!._id,
      username: user!.username
    };
    const token = jwt.sign(userForToken, process.env.SECRET!); ///////////////implementar process.env.SECRET

    console.log(`token => ${token}`);
    console.log(process.cwd() + '/client/chat.html');
    res
      .status(302)
      .header('token', token)
      .send({
        username: user!.username,
        token
      })
      .end();
    // res.sendFile(process.cwd() + '/client/index.html');
    // res.send({
    //   username: user!.username,
    //   token
    // });
  }
};
