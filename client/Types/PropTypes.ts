import { GestureResponderEvent } from 'react-native';
import { Dispatch, SetStateAction } from 'react';
import { IEvent, IGmapsPlace } from './DataTypes';
import { ParkScheduleRouteProp } from './NavigationTypes';

export interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export interface CustomButtonProps {
  onPress: (event: GestureResponderEvent) => void;
  title: string;
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
  dogParks: IGmapsPlace[];
}

export interface ParkItemProps {
  item: IGmapsPlace;
}

export interface ParkScheduleProps {
  route: ParkScheduleRouteProp;
}
