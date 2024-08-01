import express from 'express';

export const eventRouter: express.Router = express.Router();
const {
  getEventsbyPark,
  getEventsbyUser,
  getEvents,
  postEvents,
  deleteEvent,
  editEvent,
} = require('./controllers/eventsController.js');

eventRouter.get('/events/', getEvents);
eventRouter.get('/events/park/:place_id', getEventsbyPark);
eventRouter.get('/events/user/:user', getEventsbyUser);
eventRouter.post('/events', postEvents);
eventRouter.delete('/events/:_id', deleteEvent);
eventRouter.put('/events/:_id', editEvent);
