import mongoose, { Schema } from 'mongoose';
import { IEvent } from '../types';

export interface EventModel extends mongoose.Model<IEvent> {}

// defining the Schema for the Events
export const eventSchema: Schema<IEvent, EventModel> = new Schema({
  place_id: { type: String, required: true },
  park_name: { type: String, required: true },
  address: { type: String, required: true },
  date: {
    type: Date,
    required: true,
    //We'll use Eugenio is get and setter?
  },
  user: { type: String, required: true },
  dog_avatar: { type: String, required: true },
});

export const Event = mongoose.model<IEvent, EventModel>('Event', eventSchema);
