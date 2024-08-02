import { Response } from 'express';
import { IEvent, IUser } from '../types';

interface IUIdObject {
  [key: string]: string;
}

export function noResultHandler(
  res: Response,
  origin: string,
  modelName: string,
  id: IUIdObject,
): void {
  const idKey = Object.keys(id)[0] || 'id';
  const idValue = id[idKey] || 'undefined';

  console.error(
    `Error in ${origin}: Could not find any ${modelName} with ${idKey} ${idValue}`,
  );
  res.status(400).send({
    error: `Could not find any ${modelName} with ${idKey} ${idValue}`,
  });
}

export function missingBodyHandler(
  res: Response,
  origin: string,
  modelName: string,
): void {
  console.error(
    `Error in ${origin}: Request for ${modelName} is missing data in its body`,
  );
  res.status(400).send({
    error: `Request for ${modelName} is missing data in its body`,
  });
}

export function missingParamHandler(
  res: Response,
  origin: string,
  modelName: string,
  paramName: string,
): void {
  console.error(
    `Error in ${origin}: Request for ${modelName} is missing paramater ${paramName}`,
  );
  res.status(400).send({
    error: `Request for ${modelName} is missing paramater ${paramName}`,
  });
}

export function isValidUser(body: IUser): boolean {
  if (body.email && body.password && body.username && body.dogName) return true;
  return false;
}

export function isValidEvent (body: IEvent): boolean {
  console.log('----inside isValid---', body)
  if (
    body.place_id &&
    body.park_name &&
    body.address &&
    body.date &&
    body.user &&
    body.dog_avatar
  )
    return true;
  return false;
}
