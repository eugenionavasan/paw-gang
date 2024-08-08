import express from 'express';
import UserController from '../controllers/usersController';

export const userRouter: express.Router = express.Router();

userRouter.post('/login', UserController.getOne);
userRouter.post('/', UserController.postOne);
