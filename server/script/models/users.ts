import mongoose from 'mongoose';
import {UserType} from '../types';
const {events} = require('./events'); // ! refactor to import with events.ts
const {Schema, model} = mongoose;

export interface UserModel extends mongoose.Model<UserType> { };

const userSchema = new Schema<UserType, UserModel>({
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
    type: [events],
    ref: 'Events',
  }
});

export const User: UserModel = model<UserType, UserModel>('Users', userSchema)
