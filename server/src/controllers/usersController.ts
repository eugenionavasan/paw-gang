import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/users';
import { IUser, UserControllerType } from '../types'; // Import IUser and UserControllerType
import {
  noResultHandler,
  isValidUser,
  missingBodyHandler,
  missingParamHandler,
} from '../utils/utils';
import { uploadToCloudinary } from '../utils/cloudinary';

// Load environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
  throw new Error('Cloudinary environment variables are not set');
}

const UserController: UserControllerType = {
  getOne: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { _id } = req.params;
      if (!_id) {
        missingParamHandler(res, 'UserController/getOne', 'User', '_id');
        return;
      }
      const user: IUser | null = await User.findById(_id);
      if (!user) {
        noResultHandler(res, 'UserController/getOne', 'User', { _id });
        return;
      }
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
      if (!isValidUser(req.body)) {
        missingBodyHandler(res, 'UserController/postOne', 'User');
        return;
      }
      const { email, password, username, dogName, dogPhoto }: IUser = req.body;

      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        res.status(400).json({ message: 'User already exists' });
        return;
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Upload dog photo to Cloudinary
      const uploadedPhoto = await uploadToCloudinary(dogPhoto);

      // Create a new user
      const newUser = new User({
        email,
        password: hashedPassword,
        username,
        dogName,
        dogPhoto: uploadedPhoto.secure_url,
      });

      // Save the user to the database
      await newUser.save();

      // Generate JWT
      const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: '1h' });

      res.status(201).json({ token });
    } catch (error) {
      next(error);
    }
  },

  login: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { email, password } = req.body;

      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        res.status(400).json({ message: 'Invalid email or password' });
        return;
      }

      // Validate the password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        res.status(400).json({ message: 'Invalid email or password' });
        return;
      }

      // Generate JWT
      const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

      res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  },
};

export default UserController;
