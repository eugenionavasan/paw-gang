import { NextFunction, Request, Response } from 'express';
const { Event } = require('../models/events'); //! Why doesn't work with import?
import { IEvent } from '../types';
import { isValidEvent, missingBodyHandler, missingParamHandler, noResultHandler } from '../utils/utils';

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
    const { place_id } = req.params;
    if (!place_id)
      return missingParamHandler(
        res,
        'EventController/getEventsbyPark',
        'Park',
        'place_id',
      );
    const event: IEvent = await Event.find({ place_id });
    if (!event)
      return noResultHandler(res, 'EventController/getEventsbyPark', 'Park', {
        place_id,
      });
    res.status(200).json(event);
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
    const events: Event[] = await Event.find({ user });
    if (!events)
      return noResultHandler(res, 'EventController/getEventsbyUser', 'User', {
        user,
      });
    res.status(200).json(events);
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
    const { place_id, park_name, address, date, user, dog_avatar }: IEvent =
      req.body;
    if (isValidEvent(req.body))
      return missingBodyHandler(res, 'EventController/postEvents', 'Event');
    const newEvent: Event = await Event.create({
      place_id,
      park_name,
      address,
      date,
      user,
      dog_avatar,
    });
    res.status(201).json(newEvent);
  } catch (error) {
    next(error);
  }
};

//DELETE EVENT

export const deleteEvent = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { _id } = req.params;

    if (!_id)
      return missingParamHandler(
        res,
        'EventController/deleteEvent',
        'Event',
        '_id',
      );
    const deletedEvent: Event = await Event.findByIdAndDelete(_id);
    if (!deletedEvent)
      return noResultHandler(res, 'EventController/deleteEvent', 'Event', {
        _id,
      });
    // ! could return the updated to the client for handling
    res
      .status(200)
      .json({ message: 'Event deleted successfully', deletedEvent });
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
    const updatedEvent: Event = await Event.findByIdAndUpdate(
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
