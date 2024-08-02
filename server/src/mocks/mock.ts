import { IEvent } from '../types';

const newEvent: IEvent = {
  place_id: 'test_place_id',
  park_name: 'New Park',
  address: '123 Park Lane',
  date: new Date('2024-01-01T00:00:00Z'),
  user: 'test_user_id', // Use the same user_id for later retrieval
  dog_avatar: 'dog_avatar_url',
};

export const mocks = {
  newEvent,
};
