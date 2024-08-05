import { LOCAL_IP_ADDRESS, SERVER_PORT } from '../config';
import { LoginForm } from '../types';

const SIGNUP_URL = `${LOCAL_IP_ADDRESS}:${SERVER_PORT}/users`;

export const handleSignUp = async (form: LoginForm): Promise<any> => {
  try {
    const response = await fetch(SIGNUP_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error during sign-up:', error);
    throw error;
  }
};
import { IEvent, LoginScreenNavigationProp } from '../types';
import moment, { Moment } from 'moment-timezone';
import { ServerService } from './ServerApiServices';


// ! Andre?
export const handleSignIn = (
  navigation: LoginScreenNavigationProp['navigation'],
) => {
  navigation.replace('Main');
};

export const filterSortUpcomingEvents = (events: IEvent[]): IEvent[] => {
  const currentTime: Moment = moment().tz('Europe/Madrid');
  const upcomingEvents: IEvent[] = events.filter((event: IEvent) =>
    moment(event.date).tz('Europe/Madrid').isSameOrAfter(currentTime, 'minute'),
  );
  // ! check Date outputs with moment pre-parsing
  return upcomingEvents.sort(
    (a: IEvent, b: IEvent) =>
      Date.parse(a.date.toString()) - Date.parse(b.date.toString()),
  );
};

export const updateEventTime = async (
  event: IEvent,
  time: Date,
): Promise<IEvent | void> => {
  // ! potentially source out if repeatable
  const updatedEventDate = moment(event.date)
    .tz('Europe/Madrid')
    .set({
      hour: moment(time).hour(),
      minute: 0,
      second: 0,
    })
    .toISOString();
  if (event._id) {
    return await ServerService.updateEvent(event._id, {
      ...event,
      date: updatedEventDate,
    });
  }
};
