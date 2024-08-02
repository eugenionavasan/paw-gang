import express from 'express';
import { Request, Response, NextFunction } from 'express';
import UserController from '../controllers/usersController';

export const userRouter: express.Router = express.Router();

userRouter.get('/:_id', UserController.getOne);
userRouter.post('/', UserController.postOne);
userRouter.all('*', (req: Request, res: Response) => {
  console.error('Error: Path does not exist');
  res.status(404).json({
    error: 'Path does not exist',
  });
});
