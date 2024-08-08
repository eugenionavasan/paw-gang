import mongoose from 'mongoose';
import {MONGODB_URI} from '../config'

const connectToDatabase = async (): Promise<void> => {
  try {
    const mongoUri: string = MONGODB_URI;

    if (!mongoUri) {
      throw new Error('MONGODB_URI environment variable is not defined');
    }
    // ! useNewUrlParser not avaiable?
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

export default connectToDatabase;
