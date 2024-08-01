import { Request, Response } from 'express';
import { User } from '../models/users';
import { IUser } from '../types';
import { badRequestHandler, errorHandler, isValidUser } from '../utils/utils';

interface UserControllerType {
  getOne: (err: Error, req: Request, res: Response) => Promise<void>;
  postOne: (err: Error, req: Request, res: Response) => Promise<void>;
}

const UserController: UserControllerType = {
  getOne: async (err: Error, req: Request, res: Response): Promise<void> => {
    // ! type explicit // try catch
    const { _id } = req.params;
    const user: IUser | null = await User.findById(_id);
    if (!user) {
      badRequestHandler(
        err,
        req,
        res,
        'UserController/getOne',
        'User',
        'id',
        _id,
      );
    } else {
      res.status(200).send(user);
    }
    // ! does err argument work like this?
    if (err) {
      errorHandler(err, req, res, 'UserController/getOne');
    }
  },

  postOne: async (err: Error, req: Request, res: Response): Promise<void> => {
    if (isValidUser(req.body)) {
      const { email, password, username, dogName }: IUser = req.body;
      // !!! types
      const user: IUser = await User.create({
        email,
        password,
        username,
        dogName,
      });
      res.status(200).send(user);
    } else {
      console.error('Missing user information');
      res.status(400).send({ error: 'Missing user information' });
    }
    // ! does err argument work like this?
    if (err) {
      errorHandler(err, req, res, 'UserController/getOne');
    }
  },
};

export default UserController;
