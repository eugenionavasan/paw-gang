/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Application } from 'express';
import { errorHandler } from './middleware/errorHandler';
import connectToDatabase from './models/index';
import { router } from './routers/index';

// Load environment variables from .env file
dotenv.config();
export const app: Application = express();

// middlewares
app.use(cors()); // Cross-Origin Resource Sharing to allow requests from the client
app.use(bodyParser.json()); // Parsing the data from the client
app.use(router); // Using the router
app.use(errorHandler); // Error middleware

const PORT = process.env.PORT || 3000;
const LOCAL_IP_ADDRESS = process.env.LOCAL_IP_ADDRESS || '127.0.0.1';

// connecting to the db and running the server
const startServer = async (): Promise<void> => {
  try {
    await connectToDatabase();
    if (process.env.NODE_ENV !== 'test') {
      app.listen(Number(PORT), LOCAL_IP_ADDRESS, () => {
        console.log(`Server is running on http://${LOCAL_IP_ADDRESS}:${PORT}`);
      });
    } else {
      console.log('Running in test mode; server not started.');
    }
  } catch (error) {
    console.error('Failed to connect to the database:', error);
  }
};

startServer();
