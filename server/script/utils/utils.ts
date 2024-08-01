import {Request, Response} from 'express';
import { UserRequestType } from '../types';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  origin: string,
): void {
  console.error(`Error in ${origin}: ${err}`);
  res.status(500).send({ error: err });
}

export function badRequestHandler(
  err: Error,
  req: Request,
  res: Response,
  origin: string,
  modelName: string,
  identifier: string,
  value: string,
): void {
  console.error(`Error in ${origin}: Could not find any ${modelName} with ${identifier} ${value}`);
  res.status(400).send({ error: err });
}

export function isValidUser (body: UserRequestType): boolean {
  if (body.email && body.password && body.username && body.dogName) return true;
  else {
    return false;
  }
}
