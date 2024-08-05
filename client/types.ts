import { StackNavigationProp } from '@react-navigation/stack';
import { GestureResponderEvent } from 'react-native';

export type RootStackParamList = {
  Login: undefined;
  Profile: undefined;
  ParkSchedule: { place_id: string; name: string };
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

export interface CustomButtonProps {
  onPress: (event: GestureResponderEvent) => void;
  title: string;
}

export interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
}
