// Define types and interfaces used in the application
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

export interface ErrorBoundaryState {
  hasError: boolean;
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

// @types/googlemaps are outdated so have to create own
export interface IGmapsPlace {
  shortFormattedAddress: string;
  displayName: IGmapsName;
  id: string;
  photos: IGmapsPhoto[];
  rating: number;
}

interface IGmapsPhoto {
  heightPx: number;
  widthPx: number;
  name: string;
  authorAttributions: IGmapsPhotoAuthor[];
}

interface IGmapsName {
  languageCode: string;
  text: string;
}

interface IGmapsPhotoAuthor {
  displayName: string;
  photoUri: string;
  uri: string;
}


// server related
export type ServerMutationRes =
  | (MutationSuccessResponse & MutatedEventResponse)
  | ServerErrorResponse;

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
    lng: number | (() => number), // Updated to allow function
  ) => Promise<IGmapsPlace[] | void>;
  getGeocode: (
    location: string,
  ) => Promise<google.maps.GeocoderResult[] | null | void>;
}
