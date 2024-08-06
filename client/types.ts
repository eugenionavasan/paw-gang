import { StackNavigationProp } from '@react-navigation/stack';
import { Dispatch, SetStateAction } from 'react';
import { GestureResponderEvent } from 'react-native';

// Define types and interfaces used in the application

export interface CustomButtonProps {
  onPress: (event: GestureResponderEvent) => void;
  title: string;
}

export type RootStackParamList = {
  Login: undefined;
  Profile: undefined;
  ParkSchedule: { place_id: string; name: string };
  Main?: undefined;
};

export type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;
export type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;

export interface Event {
  _id: string;
  place_id: string;
  park_name: string;
  address: string;
  date: string;
  user: string;
  dog_avatar: string;
  __v: number;
}

export interface Config {
  serverUrl: string;
  googleMapsApiKey: string;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  email: string;
  password: string;
  username: string;
  dogName: string;
}

export interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
}

export interface EventlistProps {
  events: IEvent[] | [];
  setEvents: Dispatch<SetStateAction<IEvent[]>>;
}

export interface EventItemProps {
  item: IEvent;
  handleEdit: (event: IEvent) => void;
  handleDelete: (id: string) => Promise<void>;
}

// Google Maps related types
export interface ParklistProps {
  dogParks: google.maps.places.PlaceResult[];
}

export interface ParkItemProps {
  item: google.maps.places.PlaceResult;
}

// Event interface used in both frontend and backend
export interface IEvent {
  place_id: string;
  park_name: string;
  address: string;
  date: string;
  user: string;
  dog_avatar: string;
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type ServerMutationRes = (MutationSuccessResponse & MutatedEventResponse) | ServerErrorResponse;

export type ServerQueryRes = IEvent[] | ServerErrorResponse;

interface MutationSuccessResponse {
  message: string;
}

interface MutatedEventResponse {
  [key: string]: IEvent;
}

interface ServerErrorResponse {
  message?: string;
  error: string;
}

export interface IServerService {
  getEvents: (userId: string) => Promise<IEvent[] | void>;
  deleteEvent: (id: string) => Promise<IEvent | void>;
  updateEvent: (id: string, data: IEvent) => Promise<IEvent | void>;
  fetchEvents: (place_id: string) => Promise<IEvent[]>;
  saveEvent: (eventToAdd: IEvent) => Promise<void>;
}

export interface IGoogleService {
  getPhoto: (reference: string) => string;
  getDogParks: (
    lat: number | (() => number), // Updated to allow function
    lng: number | (() => number)  // Updated to allow function
  ) => Promise<google.maps.places.PlaceResult[] | void>;
  getGeocode: (
    location: string,
  ) => Promise<google.maps.GeocoderResult[] | null | void>;
}
