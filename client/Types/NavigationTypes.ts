import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { IGmapsPlace } from './DataTypes';
import { RouteProp } from '@react-navigation/native';

export type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;
export type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Profile'
>;

export type SearchScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Search'
>;

export type ParkScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ParkSchedule'
>;

export type ParkScheduleRouteProp = RouteProp<
  RootStackParamList,
  'ParkSchedule'
>;

export type RootStackParamList = {
  Login: undefined;
  Profile: undefined;
  ParkSchedule: { park: IGmapsPlace };
  Main?: undefined;
  Search: undefined;
};
