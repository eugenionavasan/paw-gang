import {ObjectId, Document} from "mongoose";

export interface IUser {
  _id: ObjectId;
  username: string;
  email: string;
  password: string;
  dogName: string;
  events: ObjectId[] | []; // ! or null?
  createdAt: Date;
  updatedAt: Date;
}

// ! more elegant way?
export interface UserRequestType {
  username: string;
  email: string;
  password: string;
  dogName: string;
}

// Define an interface representing a doocument in mongoDB (Typescript)
export interface IEvent {
  place_id: string;
  park_name: string;
  address: string;
  date: Date;
  user: string;
  dog_avatar: string;
}
