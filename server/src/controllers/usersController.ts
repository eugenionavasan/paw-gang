import { NextFunction, Request, Response } from 'express';
import { User } from '../models/users';
import { IUser } from '../types';
import {
  noResultHandler,
  isValidUser,
  missingBodyHandler,
  missingParamHandler,
} from '../utils/utils';

interface UserControllerType {
  getOne: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  postOne: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}

const UserController: UserControllerType = {
  getOne: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { _id } = req.params;
      if (!_id)
        return missingParamHandler(
          res,
          'UserController/getOne',
          'User',
          '_uid',
        );
      const user: IUser | null = await User.findById(_id);
      if (!user) return noResultHandler(res, 'UserController/getOne', 'User', {_id});
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  },

  postOne: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      if (!isValidUser(req.body))
        return missingBodyHandler(res, 'UserController/postOne', 'User');
      const { email, password, username, dogName }: IUser = req.body;
      const user: IUser = await User.create({
        email,
        password,
        username,
        dogName,
      });
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  },
};

export default UserController;
