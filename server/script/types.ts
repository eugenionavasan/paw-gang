import {ObjectId, Document} from "mongoose";

export interface UserType {
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
