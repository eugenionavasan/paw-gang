import express from 'express';
import { Request, Response, NextFunction } from 'express';

import {
  deleteEvent,
  editEvent,
  getEvents,
  getEventsbyPark,
  getEventsbyUser,
  postEvents,
  getEventById
} from '../controllers/eventsController';

export const eventRouter: express.Router = express.Router();

eventRouter.get('/', getEvents);
eventRouter.get('/park/:place_id', getEventsbyPark);
eventRouter.get('/user/:user', getEventsbyUser);
eventRouter.get('/:_id', getEventById);
eventRouter.post('/', postEvents);
eventRouter.delete('/:_id', deleteEvent);
eventRouter.put('/:_id', editEvent);
eventRouter.all('*', (req: Request, res: Response) => {
  console.error('Error: Path does not exist');
  res.status(404).json({
    error: 'Path does not exist',
  });
});
