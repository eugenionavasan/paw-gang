import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export const SERVER_PORT: number | string = process.env.SERVER_PORT || 3000;
export const LOCAL_IP_ADDRESS = process.env.LOCAL_IP_ADDRESS || '127.0.0.1';
export const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
