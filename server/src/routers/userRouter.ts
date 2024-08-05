import { Router } from 'express';
import { postOne, loginUser } from '../controllers/usersController';

const userRouter = Router();

// Register a new user
userRouter.post('/', postOne);

// Login user
userRouter.post('/login', loginUser);

export default userRouter; // Export default router
