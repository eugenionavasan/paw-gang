import { ObjectId } from 'mongoose';

export interface IUser {
  _id?: ObjectId;
  username: string;
  email: string;
  password: string;
  dogName: string;
  events: ObjectId[] | []; // ! or null?
  createdAt?: Date;
  updatedAt?: Date;
}

// Define an interface representing a doocument in mongoDB (Typescript)
export interface IEvent {
  place_id: string;
  park_name: string;
  address: string;
  date: Date;
  user: string;
  dog_avatar: string;
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IResEvent {
  place_id: string;
  park_name: string;
  address: string;
  date: string;
  user: string;
  dog_avatar: string;
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IInvalidEvent {
  place_id?: string;
  park_name?: string;
  address?: string;
  date?: Date;
  user?: string;
  dog_avatar?: string;
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
