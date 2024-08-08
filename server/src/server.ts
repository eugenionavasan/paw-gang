/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
import bodyParser from 'body-parser';
import cors from 'cors';
import {SERVER_PORT, LOCAL_IP_ADDRESS} from './config';
import express, { Application } from 'express';
import { errorHandler } from './middleware/errorHandler';
import connectToDatabase from './models/index';
import { router } from './routers/index';
import {config} from 'dotenv';

// Load environment variables from config file
config();

export const app: Application = express();

// middlewares
app.use(cors()); // Cross-Origin Resource Sharing to allow requests from the client
app.use(bodyParser.json()); // Parsing the data from the client
app.use(router); // Using the router
app.use(errorHandler); // Error middleware


// connecting to the db and running the server
// ! add server.close()
const startServer = async (): Promise<void> => {
  try {
    console.log(process.env.GOOGLE_MAPS_API_KEY)
    await connectToDatabase();
    if (process.env.NODE_ENV !== 'test') {
      app.listen(Number(SERVER_PORT), LOCAL_IP_ADDRESS, () => {
        console.log(`Server is running on http://${LOCAL_IP_ADDRESS}:${SERVER_PORT}`);
      });
    } else {
      console.log('Running in test mode; server not started.');
    }
  } catch (error) {
    console.error('Failed to connect to the database:', error);
  }
};

startServer();
