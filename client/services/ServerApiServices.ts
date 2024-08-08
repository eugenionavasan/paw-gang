import axios from 'axios';
import { SERVER_PORT, LOCAL_IP_ADDRESS } from '../config';
import { IEvent, ServerMutationRes, ServerQueryRes } from '../Types/DataTypes';

interface apiService {
  getEvents: (userId: string) => Promise<Event[]>;
}

const SERVER_URL = `http://${LOCAL_IP_ADDRESS}:${SERVER_PORT}`;

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

export const fetchEvents = async (place_id: string): Promise<IEvent[]> => {
  try {
    const response = await axios.get(`${SERVER_URL}/events/park/${place_id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

export const saveEvent = async (eventToAdd: IEvent): Promise<IEvent> => {
  try {
    const res = await axios.post(`${SERVER_URL}/events/`, eventToAdd);
    return res.data;
  } catch (error) {
    console.error('Error saving event:', error);
    throw error;
  }
};

// Service to handle server interactions
export const ServerService = {
  // Function to get events for a specific user
  async getEvents(userId: string): Promise<IEvent[]> {
    try {
      const response = await axios.get<ServerQueryRes>(
        `${SERVER_URL}/events/user/${userId}`,
      );
      // Check if response is an array of events
      if (Array.isArray(response.data)) {
        return response.data;
      } else {
        // Handle the error case
        console.error('Error fetching events:', response.data.error);
        throw new Error(response.data.error || 'Unknown error occurred');
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  },

  // Function to delete an event by id
  async deleteEvent(id: string): Promise<IEvent> {
    try {
      const response = await axios.delete<ServerMutationRes>(
        `${SERVER_URL}/events/${id}`,
      );
      // Check if response contains the deleted event
      if ('deletedEvent' in response.data) {
        return response.data.deletedEvent;
      } else {
        // Handle the error case
        console.error(
          'Error deleting event:',
          response.data.message || 'Unknown error occurred',
        );
        throw new Error(response.data.message || 'Unknown error occurred');
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      throw error;
    }
  },

  // Function to update an event by id
  async updateEvent(id: string, data: IEvent): Promise<IEvent> {
    try {
      const response = await axios.put<ServerMutationRes>(
        `${SERVER_URL}/events/${id}`,
        data,
      );
      // Check if response contains the updated event
      if ('updatedEvent' in response.data) {
        return response.data.updatedEvent;
      } else {
        // Handle the error case
        console.error(
          'Error updating event:',
          response.data.message || 'Unknown error occurred',
        );
        throw new Error(response.data.message || 'Unknown error occurred');
      }
    } catch (error) {
      console.error('Error updating event:', error);
      throw error;
    }
  },
};
