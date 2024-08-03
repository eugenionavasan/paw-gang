import { NextFunction, Request, Response } from 'express';
import { IEvent } from '../types';
import {
  isValidEvent,
  missingBodyHandler,
  missingParamHandler,
  noResultHandler,
} from '../utils/utils';
import { Event } from '../models/events'; //! Why doesn't work with import?

// GET EVENTS (I don't need this one but i am having it for thunderclient testing purposes)
export const getEvents = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const events: IEvent[] = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    next(error);
  }
};

// GET EVENTS by place_id
export const getEventsbyPark = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const {place_id} = req.params;
    if (!place_id)
      return missingParamHandler(
        res,
        'EventController/getEventsbyPark',
        'Park',
        'place_id',
      )
    // !
    const events: IEvent[] | {} = await Event.find({place_id});
    if (Object.keys(events).length === 0)
      return noResultHandler(res, 'EventController/getEventsbyPark', 'Park', {
        place_id,
      });
    res.status(200).json(events);
  } catch (error) {
    next(error);
  }
};

// GET EVENTS by user
export const getEventsbyUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { user } = req.params;
    if (!user)
      return missingParamHandler(
        res,
        'EventController/getEventsbyUser',
        'User',
        'user',
      );
    const events: Event[] | {} = await Event.find({ user });
    if (Object.keys(events).length === 0)
      return noResultHandler(res, 'EventController/getEventsbyUser', 'User', {
        user,
      });
    res.status(200).json(events);
  } catch (error) {
    next(error);
  }
};

// GET EVENT by ID
export const getEventById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {_id} = req.params;
    if (!_id) {
      return missingParamHandler(
        res,
        'EventController/getEventById',
        'Event',
        '_id'
      );
    }
    const event = await Event.findById(_id);
    if (!event) {
      return noResultHandler(res, 'EventController/getEventById', 'Event', { _id });
    }
    res.status(200).json(event);
  } catch (error) {
    next(error);
  }
};

// POST EVENT
export const postEvents = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {

    console.log('Request body:', req.body); // Log the request body to debug
    
    const { place_id, park_name, address, date, user, dog_avatar }: IEvent =
      req.body;
    if (!isValidEvent(req.body)) {
      return missingBodyHandler(res, 'EventController/postEvents', 'Event');
    }
    const newEvent: IEvent = await Event.create({
      place_id,
      park_name,
      address,
      date: new Date(date),
      user,
      dog_avatar,
    });
    res.status(201).json(newEvent);
  } catch (error) {
    next(error);
  }
};


//EDIT EVENT only the date
export const editEvent = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { _id } = req.params;
    const { date } = req.body;
    if (!_id)
      return missingParamHandler(
        res,
        'EventController/editEvent',
        'Event',
        '_id',
      );
    if (!date)
      return missingBodyHandler(res, 'EventController/editEvent', 'Event');
    const updatedEvent: IEvent | null = await Event.findByIdAndUpdate(
      _id,
      { date },
      { new: true, runValidators: true },
    );
    if (!updatedEvent)
      return noResultHandler(res, 'EventController/editEvents', 'Event', {
        _id,
      });
    // ! could return the updated to the client for handling
    res
      .status(200)
      .json({ message: 'Event updated successfully', updatedEvent });
  } catch (error) {
    next(error);
  }
};

//Delete Event
export const deleteEvent = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { _id } = req.params;
    // Check if _id is provided
    if (!_id) {
      return missingParamHandler(
        res,
        'EventController/deleteEvent',
        'Event',
        '_id'
      );
    }
    // Perform delete operation
    const deletedEvent: IEvent | null = await Event.findByIdAndDelete(_id);
    // Check if the event was found and deleted
    if (!deletedEvent) {
      return noResultHandler(
        res,
        'EventController/deleteEvent',
        'Event',
        { _id }
      );
    }
    // Respond with success message
    res.status(200).json({
      message: 'Event deleted successfully',
      deletedEvent
    });
  } catch (error) {
    next(error);
  }
};
