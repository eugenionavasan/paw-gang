import { IEvent } from '../types';

const newEvent: IEvent = {
  place_id: 'test_place_id',
  park_name: 'New Park',
  address: '123 Park Lane',
  date: new Date('2024-01-01T00:00:00Z'),
  user: 'test_user_id', // Use the same user_id for later retrieval
  dog_avatar: 'dog_avatar_url',
};

const invalidEvent: Partial<IEvent> = {
  place_id: '',
  park_name: '',
  address: '',
  date: 'invalid-date' as unknown as Date, // To match the expected type
  user: 'invalid_user_id',
  dog_avatar: 'dog_avatar_url',
};

const newUser = {
  email: 'testuser@example.com',
  password: 'securepassword',
  username: 'testuser',
  dogName: 'Buddy',
};

const incompleteUser = {
  email: 'incompleteuser@example.com',
};

const invalidEmailUser = {
  email: 'invalid-email',
  password: 'securepassword',
  username: 'testuser',
  dogName: 'Buddy',
};

export const mocks = {
  newEvent,
  newUser,
  incompleteUser,
  invalidEmailUser,
  invalidEvent
};