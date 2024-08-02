import { LoginScreenNavigationProp } from '../types';

export const handleSignIn = (navigation: LoginScreenNavigationProp['navigation']) => {
  navigation.replace('Main');
};