import mongoose from 'mongoose';
import { IUser } from '../types';
import { Schema, model } from 'mongoose';

export interface UserModel extends mongoose.Model<IUser> {}

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
  events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
    },
  ],
});

export const User: UserModel = model<IUser, UserModel>('Users', userSchema);
