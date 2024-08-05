import express, { Request, Response } from 'express';
import { eventRouter } from './eventRouter';
import userRouter from './userRouter';

export const router: express.Router = express.Router();

router.use('/users', userRouter);
router.use('/events', eventRouter);



router.all('*', (req: Request, res: Response) => {
  console.error('Error: Path does not exist');
  res.status(404).json({
    error: 'Path does not exist',
  });
});
