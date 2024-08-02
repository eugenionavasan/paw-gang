import axios from 'axios';
import { SERVER_PORT, LOCAL_IP_ADDRESS } from '../config';

interface apiService {
  getEvents: (userId: string) => Promise<Event[]>
}

const SERVER_URL = `http://${LOCAL_IP_ADDRESS}:${SERVER_PORT}`,

export const apiService = {
  getEvents: (userId: string) => {
    return await axios.get(`${SERVER_URL}/events/user/eugenio`);
  },
};
