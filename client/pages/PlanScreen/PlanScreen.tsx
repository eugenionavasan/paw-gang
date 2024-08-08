import {
  View,
  Text,
} from 'react-native';
import React, {useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {IEvent} from '../../Types/DataTypes';
import {ServerService} from '../../services/ServerApiServices';
import {filterSortUpcomingEvents} from '../../services/UtilServices';
import styles from './PlanScreenStyles';
import EventList from '../../components/EventList/EventList';

function PlanScreen (): JSX.Element {
  const [events, setEvents] = useState<IEvent[] | []>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useFocusEffect(
    React.useCallback(() => {
      fetchEvents();
    }, []),
  );


  // functions
  const fetchEvents = async (): Promise<void> => {
    try {
      const response: IEvent[] | void = await ServerService.getEvents('eugenio')
      if (response) {
        const upcomingEvents: IEvent[] = filterSortUpcomingEvents(response)
        setEvents(upcomingEvents);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading ?
        <Text style={styles.text}>Loading...</Text>
        :
        <EventList events={events} setEvents={setEvents} />
      }
    </View>
  );
}

export default PlanScreen;
