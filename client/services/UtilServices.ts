import { LOCAL_IP_ADDRESS, SERVER_PORT } from '../config';
import { LoginForm, IEvent, RegisterForm } from '../Types/DataTypes';
import { createStackNavigator } from '@react-navigation/stack';
import { Alert } from 'react-native';
import moment, { Moment } from 'moment-timezone';
import { LoginScreenNavigationProp } from '../Types/NavigationTypes';
import { ServerService } from './ServerApiServices';

// Define the URL for the sign-up endpoint
const SIGNUP_URL = `http://${LOCAL_IP_ADDRESS}:${SERVER_PORT}/users/`;

// Function to handle user sign-up
export const handleSignUp = async (form: LoginForm): Promise<any> => {
  try {
    const response = await fetch(SIGNUP_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });

    // Throw an error if the response is not ok
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error during sign-up:', error);
    Alert.alert('Internal Error: Sign Up Failed');
    throw error;
  }
};

// Function to handle user sign-in and navigate to the main screen
export const handleSignIn = (
  navigation: LoginScreenNavigationProp, // Ensure this type matches the actual navigation prop type
) => {
  navigation.replace('Main'); // Navigate to the 'Main' screen
};

// Function to filter and sort upcoming events
export const filterSortUpcomingEvents = (events: IEvent[]): IEvent[] => {
  const currentTime: Moment = moment().tz('Europe/Madrid');
  // Filter upcoming events
  const upcomingEvents: IEvent[] = events.filter((event: IEvent) =>
    moment(event.date).tz('Europe/Madrid').isSameOrAfter(currentTime, 'minute'),
  );

  // Sort events by date
  return upcomingEvents.sort(
    (a: IEvent, b: IEvent) =>
      new Date(a.date).getTime() - new Date(b.date).getTime(),
  );
};

// Function to update the time of an event
export const updateEventTime = async (
  event: IEvent,
  time: Date,
): Promise<IEvent | void> => {
  const updatedEventDate = moment(event.date)
    .tz('Europe/Madrid')
    .set({
      hour: moment(time).hour(),
      minute: 0,
      second: 0,
    })
    .toISOString();

  // Update the event if _id is present
  if (event._id) {
    return await ServerService.updateEvent(event._id, {
      ...event,
      date: updatedEventDate,
    });
  }
};

export const isValidEmail = (email: string): boolean | void => {
  return /\S+@\S+\.\S+/.test(email) || Alert.alert('Invalid email address');
};

export const isValidSignUp = (form: RegisterForm): boolean => {
  if (!form.email || !form.password || !form.username || !form.dogName) {
    Alert.alert('All fields are required');
    return false;
  } else return true;
};

export const eventListByDate = (events: IEvent[]): Record<string, IEvent[]> => {
  return events.reduce(
    (acc, event) => {
      const dateKey: string = moment(event.date)
        .tz('Europe/Madrid')
        .format('YYYY-MM-DD');
      const existEvents = acc[dateKey] || [];
      acc[dateKey] = [...existEvents, event];
      return acc;
    },
    {} as Record<string, IEvent[]>,
  );
};

export const dateAndTimeToString = (date: Moment, time: string): string => {
  return moment
    .tz(`${dateToString(date)} ${time}`, 'YYYY-MM-DD HH:mm', 'Europe/Madrid')
    .toISOString();
};

export const dateToString = (date: Moment): string => {
  return date.format('YYYY-MM-DD');
};

export const dayHoursAsString = (): string[] => {
  return Array.from({ length: 24 }, (_, i) =>
    moment({ hour: i }).tz('Europe/Madrid').format('HH:00'),
  );
};

export const timeToString = (time: Date): string => {
  return moment(time).tz('Europe/Madrid').minute(0).format('HH:mm');
};

export const getEventsByDate = (
  events: Record<string, IEvent[]>,
  date: Moment,
): IEvent[] | [] => {
  const dateKey: string = dateToString(date);
  if (events[dateKey]) {
    return events[dateKey];
  } else return [];
};

export const isDayBeforeToday = (
  selectedDate: Moment,
  date: Moment,
): boolean => {
  return selectedDate.isSameOrBefore(date, 'day');
};

export const filterEventsByDateHour = (
  date: Moment,
  hour: string,
  events: IEvent[] | [],
): IEvent[] | [] => {
  return events.filter((event) =>
    moment(event.date)
      .tz('Europe/Madrid')
      .isSame(date.clone().hour(moment(hour, 'HH:mm').hour()), 'hour'),
  );
};

export const today = (): Moment => {
  return moment().tz('Europe/Madrid');
};
