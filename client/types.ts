import { ReactNode } from 'react';
import { GestureResponderEvent } from 'react-native';
import { Moment } from 'moment';
import { RouteProp } from '@react-navigation/native';

export interface CustomButtonProps {
  onPress: (event: GestureResponderEvent) => void;
  title: string;
}

export type RootStackParamList = {
  Login: undefined;
  Profile: undefined;
};

export interface LoginForm {
  email: string;
  password: string;
}

export type LoginScreenNavigationProp = {
  navigation: {
    replace: (route: string) => void;
  };
};

export interface ErrorBoundaryProps {
  children: ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
}

export interface Event {
  _id: string;
  date: string;
  user: string;
  dog_avatar: string;
}
