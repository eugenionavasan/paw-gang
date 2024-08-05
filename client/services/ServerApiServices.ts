import axios, { AxiosResponse } from 'axios';
import { SERVER_PORT, LOCAL_IP_ADDRESS } from '../config';
import {
  IServerService,
  IEvent,
  ServerMutationRes,
  ServerQueryRes,
} from '../types';


export const ServerService: IServerService = {
  getEvents,
  deleteEvent,
  updateEvent,
};

async function getEvents (userId: string): Promise<IEvent[] | void> {
  const result: ServerQueryRes | void = await baseFetch<ServerQueryRes>(
    `events/user/${userId}`,
    'get',
  );
  if (result && !('error' in result)) {
    return result;
  }
};

async function deleteEvent (id: string): Promise<IEvent | void> {
  const result: ServerMutationRes | void = await baseFetch<ServerMutationRes>(
    `events/${id}`,
    'delete',
  );
  if (result && !('error' in result)) {
    return result.deletedEvent;
  }
};

async function updateEvent (
  id: string,
  data: IEvent,
): Promise<IEvent | void> {
  const result: ServerMutationRes | void = await baseFetch<ServerMutationRes>(
    `events/${id}`,
    'delete',
    data,
  );
  if (result && !('error' in result)) {
    return result.updatedEvent;
  }
};

async function baseFetch<T>(
  path: string,
  method: string,
  data: IEvent | null = null,
): Promise<T | void> {
  const SERVER_URL = `http://${LOCAL_IP_ADDRESS}:${SERVER_PORT}`;
  try {
    const response = await axios<T, AxiosResponse<T>>({
      method: method,
      url: `${SERVER_URL}/${path}`,
      data: data,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching from server: ', error);
  }
};
