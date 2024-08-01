import { Request, Response } from 'express';
const models = require('../models/events.js');

// Interface for the Event model (adjust according to your schema)
interface Event {
  place_id: string;
  park_name: string;
  address: string;
  date: Date;
  user: string;
  dog_avatar: string;
  _id?: string;
}

// GET EVENTS (I don't need this one but i am having it for thunderclient testing purposes)

const getEvents = async (req: Request, res: Response): Promise<void> => {
  try {
    const events: Event[] = await models.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).send();
  }
};

// GET EVENTS by place_id

const getEventsbyPark = async (req: Request, res: Response): Promise<void> => {
  try {
    const { place_id } = req.params;
    if (!place_id) {
      res.status(400).json({ message: 'place_id is required' });
      return;
    }

    const events: Event = await models.find({ place_id });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// GET EVENTS by user

const getEventsbyUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user } = req.params;
    if (!user) {
      res.status(400).json({ message: 'user is required' });
      return;
    }

    const events: Event[] = await models.find({ user });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// POST EVENT

const postEvents = async (req: Request, res: Response): Promise<void> => {
  try {
    const { place_id, park_name, address, date, user, dog_avatar } =
      req.body as Event;

    if (!place_id || !park_name || !address || !date || !user || !dog_avatar) {
      res.status(400).json({ error: 'Missing required parameters.' });
      return;
    }

    const newEvent: Event = await models.create({
      place_id,
      park_name,
      address,
      date,
      user,
      dog_avatar,
    });

    res.status(201).json(newEvent);
  } catch (error) {
    console.error('Internal server error', error);
    res.status(500).send();
  }
};

//DELETE EVENT

const deleteEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { _id } = req.params;

    if (!_id) {
      res.status(400).json({ message: '_id is required' });
      return;
    }

    const deletedEvent: Event = await models.findByIdAndDelete(_id);

    if (!deletedEvent) {
      res.status(404).json({ message: 'Event not found' });
      return;
    }

    res
      .status(200)
      .json({ message: 'Event deleted successfully', deletedEvent });
  } catch (error) {
    console.error('Error deleting event:', error);

    // Talk with Gerry
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: 'Internal Server Error', error: error.message });
    } else {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};

//EDIT EVENT only the date

const editEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { _id } = req.params;
    const { date } = req.body;

    if (!_id) {
      res.status(400).json({ message: '_id is required' });
      return;
    }

    if (!date) {
      res.status(400).json({ message: 'date is required for updating' });
      return;
    }

    const updatedEvent: Event = await models.findByIdAndUpdate(
      _id,
      { date },
      { new: true, runValidators: true },
    );

    if (!updatedEvent) {
      res.status(404).json({ message: 'Event not found' });
      return;
    }

    res
      .status(200)
      .json({ message: 'Event updated successfully', updatedEvent });
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  getEventsbyPark,
  getEventsbyUser,
  getEvents,
  postEvents,
  deleteEvent,
  editEvent,
}; // exporting the functions to be used in the router
