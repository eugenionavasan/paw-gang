import {
  Text,
  FlatList,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import moment from 'moment-timezone';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {IEvent} from '../../Types/DataTypes';
import {ServerService} from '../../services/ServerApiServices';
import {updateEventTime} from '../../services/services';
import EventItem from '../../components/EventItem/EventItem';
import styles from './EventListStyles';
import {EventlistProps} from '../../Types/DataTypes';

function EventList (props: EventlistProps): JSX.Element {
  const {events, setEvents} = props
  const [isTimePickerVisible, setTimePickerVisibility] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);
  // const [newEventTime, setNewEventTime] = useState<string>('') // ! check if works without null


  // functions
  const handleDelete = async (id: string): Promise<void> => {
    const response = await ServerService.deleteEvent(id)
    if (response) {
      setEvents((prevEvents) => prevEvents.filter((item) => item._id !== id));
    } else {
      Alert.alert('Error', 'An error occurred while deleting the event.');
    }
  };

  const handleEdit = (event: IEvent): void => {
    setSelectedEvent(event);
    setTimePickerVisibility(true);
  };

  const handleConfirm = async (time: Date): Promise<void> => {
    // ! what is state needed for?
    // const newTime = moment(time).tz('Europe/Madrid').format('HH:mm');
    // setNewEventTime(newTime);

    if (selectedEvent) {
      const response = await updateEventTime(selectedEvent, time)
      if (response) {
        const filteredEvents: IEvent[] = events.filter((event: IEvent) => event._id !== selectedEvent._id)
        setEvents([...filteredEvents, response])
      } else {
        Alert.alert('Error', 'An error occured while updated the event.')
      }
      setTimePickerVisibility(false);
      setSelectedEvent(null);
    }
  };

  return (
    <>
      <FlatList
        data={events}
        renderItem={({item}) => <EventItem item={item} handleEdit={handleEdit} handleDelete={handleDelete} />}
        keyExtractor={(item) => item._id as string} /* ! Better way ? */
        ListEmptyComponent={
          <Text style={styles.text}>No upcoming events found</Text>
        }
      />
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={() => setTimePickerVisibility(false)}
        minuteInterval={30} /* ! Revisit to check if intended functionality */
      />
    </>
  );
}

export default EventList;
