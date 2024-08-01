import mongoose from 'mongoose';
import {IUser} from '../types';
import {Event} from './events'; // ! refactor to import with events.ts
const {Schema, model} = mongoose;

export interface UserModel extends mongoose.Model<IUser> { };

const userSchema = new Schema<IUser, UserModel>({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  dogName: {
    type: String,
    required: true,
  },
  events: {
    type: [Event],
    ref: 'Events',
  }
});

export const User: UserModel = model<IUser, UserModel>('Users', userSchema)
