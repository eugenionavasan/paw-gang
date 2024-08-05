import { LOCAL_IP_ADDRESS, SERVER_PORT } from '../config';
import { LoginForm, IEvent } from '../types';

// Define the URL for the sign-up endpoint
const SIGNUP_URL = `http://${LOCAL_IP_ADDRESS}:${SERVER_PORT}/users`;

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

    // Parse and return the response data
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error during sign-up:', error);
    throw error;
  }
};

// Import necessary types and services
import { LoginScreenNavigationProp } from '../types';
import moment, { Moment } from 'moment-timezone';
import { ServerService } from './ServerApiServices';

// Function to handle user sign-in and navigate to the main screen
export const handleSignIn = (
  navigation: LoginScreenNavigationProp // Ensure this type matches the actual navigation prop type
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
