import { GestureResponderEvent } from 'react-native';

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
