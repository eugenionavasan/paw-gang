import { Request, Response, NextFunction } from 'express';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof Error) {
    console.error(`Error: ${err}`);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  } else {
    console.error(`Error: ${err}`);
    res.status(500).send({ error: err });
  }
}
