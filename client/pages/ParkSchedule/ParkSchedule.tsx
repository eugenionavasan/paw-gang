import {Moment} from 'moment-timezone';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Button,
  FlatList,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {fetchEvents, saveEvent} from '../../services/ServerApiServices';
import {IEvent} from '../../Types/DataTypes';
import {styles} from './ParkScheduleStyles'; // Import styles from the new file
import ScheduleItem from '../../components/ScheduleItem/ScheduleItem';
import {dateAndTimeToString, dateToString, dayHoursAsString, eventListByDate, getEventsByDate, isDayBeforeToday, timeToString, today} from '../../services/UtilServices';
import {ParkScheduleProps} from '../../Types/PropTypes';

const ParkSchedule: React.FC<ParkScheduleProps> = ({route}): JSX.Element => {
  const {park} = route.params; // send place

  const [selectedDate, setSelectedDate] = useState<Moment>(today());
  const [events, setEvents] = useState<Record<string, IEvent[] | []>>({
    [dateToString(selectedDate)]: []
  });
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [newEventDate, setNewEventDate] = useState<string>('');
  const [isTimePickerVisible, setTimePickerVisibility] = useState<boolean>(false);
  const [isPrevDayDisabled, setIsPrevDayDisabled] = useState<boolean>(true);

  useEffect((): void => {
    fetchEventData();
  }, [park]);

  useEffect((): void => {
    setIsPrevDayDisabled(isDayBeforeToday(selectedDate, today().startOf('day')));
  }, [selectedDate]);

  async function fetchEventData (): Promise<void> {
    try {
      const eventData: IEvent[] | [] = await fetchEvents(park.id);
      if (eventData.length > 0) {
        setEvents(eventListByDate(eventData));
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handlePrevDay = (): void => {
    setSelectedDate(selectedDate.clone().subtract(1, 'day'));
  };

  const handleNextDay = (): void => {
    setSelectedDate(selectedDate.clone().add(1, 'day'));
  };

  const handleSaveEvent = async (): Promise<void> => {
    const eventDate: string = dateAndTimeToString(selectedDate, newEventDate)
    try {
      const res: IEvent = await saveEvent({
        date: eventDate,
        place_id: park.id,
        park_name: park.displayName.text,
        address: park.shortFormattedAddress,
        user: 'eugenio',
        dog_avatar:
          'https://i.ibb.co/86gL7yK/Whats-App-Image-2024-07-25-at-15-20-30-modified.png',
      });
      // check successful post
      if ('_id' in res) {
        const dateKey: string = dateToString(selectedDate);
        setEvents((prevEvents: Record<string, IEvent[]>): Record<string, IEvent[]> => ({
          ...prevEvents,
          [dateKey]: [...prevEvents[dateKey], res],
        }));
      } else Alert.alert('Error', 'An error occurred while saving the event.');
      setModalVisible(false);
      setNewEventDate('');
    } catch (error) {
      console.error('Error saving event:', error);
      Alert.alert('Error', 'An error occurred while saving the event.');
    }
  };

  const toggleTimePicker = (visible: boolean): void => {
    setTimePickerVisibility(!visible)
  }

  const handleConfirm = (time: Date): void => {
    setNewEventDate(timeToString(time));
    toggleTimePicker(isTimePickerVisible)
  };

  return (
    <>
      {
        <View style={styles.container}>
          <View style={styles.header}>
            <Button
              title="Prev Day"
              onPress={handlePrevDay}
              disabled={isPrevDayDisabled}
            />
            <Text style={styles.date}>{selectedDate.format('dddd, D MMM')}</Text>
            <Button title="Next Day" onPress={handleNextDay} />
          </View>
          <FlatList
            data={dayHoursAsString() as string[]}
            renderItem={({item}) => <ScheduleItem hour={item} selectedDate={selectedDate} events={getEventsByDate(events, selectedDate)} />}
            keyExtractor={(item) => item}
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.addButtonText}>Add visit 🐕</Text>
          </TouchableOpacity>
          <Modal
            visible={modalVisible}
            animationType="slide"
            onRequestClose={() => setModalVisible(false)}
            testID="modal"
          >
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Plan your visit 🐶</Text>
              <TouchableOpacity onPress={() => toggleTimePicker(isTimePickerVisible)} style={styles.input}>
                <Text
                  style={newEventDate ? styles.inputText : styles.placeholderText}
                >
                  {newEventDate || 'Start Time (HH:00)'}
                </Text>
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isTimePickerVisible}
                mode="time"
                onConfirm={handleConfirm}
                onCancel={() => toggleTimePicker(isTimePickerVisible)}
                minuteInterval={30}
              />
              <View style={styles.modalButtons}>
                <Button title="Cancel" onPress={() => setModalVisible(false)} />
                <Button title="Save" onPress={handleSaveEvent} />
              </View>
            </View>
          </Modal>
        </View>
      }
    </>
  );
};

export default ParkSchedule;
