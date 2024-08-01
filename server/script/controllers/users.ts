import { Request, Response } from 'express';
import { User, UserModel } from '../models/users';
import { UserType } from '../types';
import { errorHandler, badRequestHandler, isValidUser } from '../utils/utils';
import { Document } from 'mongoose';

interface UserControllerType {
  getOne: (err: Error, req: Request, res: Response) => Promise<void>;
  postOne: (err: Error, req: Request, res: Response) => Promise<void>;
}



const UserController: UserControllerType = {
  getOne: async (err: Error, req: Request, res: Response): Promise<void> => {
    // ! type explicit
    const { _id } = req.params;
    const user: UserType | null = await User.findById(_id);
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
      // ! not sure if we want to send back the user
      res.status(200).send(user);
    }
    // ! does err argument work like this?
    if (err) {
      errorHandler(err, req, res, 'UserController/getOne');
    }
  },

  postOne: async (err: Error, req: Request, res: Response): Promise<void> => {
    if (isValidUser(req.body)) {
      const {email, password, username, dogName}: UserType = req.body;
      // !!! types
      const user: UserType = await User.create()
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
