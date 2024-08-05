import axios from 'axios';
import { SERVER_PORT, LOCAL_IP_ADDRESS } from '../config';
import { Event } from '../types';

interface apiService {
  getEvents: (userId: string) => Promise<Event[]>
}

const SERVER_URL = `http://${LOCAL_IP_ADDRESS}:${SERVER_PORT}`

export const createApiService = (serverUrl: string): apiService => ({
  getEvents: async (userId: string) => {
    try {
      const response = await axios.get(`${serverUrl}/events/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  },
});

export const fetchEvents = async (place_id: string): Promise<Event[]> => {
  try {
    const response = await axios.get(`${SERVER_URL}/events/park/${place_id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

export const saveEvent = async (eventToAdd: Event): Promise<void> => {
  try {
    console.log('Sending event to server:', eventToAdd); // Log the event data being sent
    await axios.post(`${SERVER_URL}/events`, eventToAdd);
  } catch (error) {
    console.error('Error saving event:', error);
    throw error;
  }
};
