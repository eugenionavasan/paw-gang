import { NextFunction, Request, Response } from 'express';
import { User } from '../models/users';
import { IUser } from '../types';
import {
  isValidUser,
  missingBodyHandler,
  missingParamHandler,
  noResultHandler,
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
      const { email, password } = req.body;

      // Validate input
      if (!email || !password)
        return missingBodyHandler(
          res,
          'UserController/getOne',
          'email and password',
        );

      // Find user by email
      const user = await User.findOne({ email });
      if (!user)
        return noResultHandler(res, 'UserController/getOne', 'User', { email });

      // Check if the provided password matches the user's password
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        res.status(400).json({ error: 'Invalid password' });
        return;
      }

      // Return the user if password is correct
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

      // Create a new user with the hashed password
      const user = new User({
        email,
        password,  // The password will be hashed automatically in the pre-save hook
        username,
        dogName,
      });

      await user.save(); // Save the user to the database

      res.status(201).json(user); // Return the created user
    } catch (error) {
      next(error);
    }
  },
};

export default UserController;
