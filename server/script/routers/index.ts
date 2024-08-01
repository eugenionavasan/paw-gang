import express from 'express';
import {userRouter} from './userRouter';
import {eventRouter} from './eventRouter';

export const router: express.Router = express.Router();

router.use('/users', userRouter);
router.use('/events', eventRouter)
