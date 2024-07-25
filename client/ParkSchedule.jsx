import { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Modal, TouchableOpacity, Alert, Image } from 'react-native';
import moment from 'moment-timezone';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import axios from 'axios';

const SERVER_URL = 'http://192.168.1.102:3000';

const initialEvents = {};

const ParkSchedule = ({ route }) => {
  const { place_id, name, vicinity } = route.params;
  const [selectedDate, setSelectedDate] = useState(moment().tz('Europe/Madrid'));
  const [events, setEvents] = useState(initialEvents);
  const [modalVisible, setModalVisible] = useState(false);
  const [newEventDate, setNewEventDate] = useState('');
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/events/park/${place_id}`);
        const data = await response.json();
        const formattedEvents = data.reduce((acc, event) => {
          const dateKey = moment(event.date.$date || event.date).tz('Europe/Madrid').format('YYYY-MM-DD');
          if (!acc[dateKey]) {
            acc[dateKey] = [];
          }
          acc[dateKey].push(event);
          return acc;
        }, {});
        setEvents(formattedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, [place_id]);

  const handlePrevDay = () => {
    const newDate = selectedDate.clone().subtract(1, 'day');
    setSelectedDate(newDate);
  };

  const handleNextDay = () => {
    const newDate = selectedDate.clone().add(1, 'day');
    setSelectedDate(newDate);
  };

  const handleSaveEvent = async () => {
    const eventDate = moment.tz(`${selectedDate.format('YYYY-MM-DD')} ${newEventDate}`, 'YYYY-MM-DD HH:mm', 'Europe/Madrid').toISOString();
  
    const eventToAdd = {
      place_id,
      park_name: name,
      adress: vicinity,
      date: eventDate,
      user: 'eugenio',
      dog_avatar: 'https://i.ibb.co/86gL7yK/Whats-App-Image-2024-07-25-at-15-20-30-modified.png',
    };
  
    try {
      await axios.post(`${SERVER_URL}/events`, eventToAdd);
  
      const dateKey = selectedDate.format('YYYY-MM-DD');
      setEvents((prevEvents) => ({
        ...prevEvents,
        [dateKey]: [...(prevEvents[dateKey] || []), eventToAdd],
      }));
  
      setModalVisible(false);
      setNewEventDate('');
    } catch (error) {
      console.error('Error saving event:', error);
      Alert.alert('Error', 'An error occurred while saving the event.');
    }
  };
  const renderEvent = ({ item }) => (
    <View style={styles.event}>
      <Image source={{ uri: item.dog_avatar }} style={styles.dogAvatar} />
    </View>
  );

  const renderItem = ({ item }) => {
    const dayEvents = events[selectedDate.format('YYYY-MM-DD')] || [];
    const slotEvents = dayEvents.filter(event =>
      moment.tz(event.date, 'Europe/Madrid').isSame(selectedDate.clone().hour(moment(item, 'HH:mm').hour()), 'hour')
    );

    return (
      <View style={[styles.slot, slotEvents.length > 0 && styles.slotWithEvent]}>
        <Text style={styles.time}>{item}</Text>
        {slotEvents.length > 0 && (
          <FlatList
            horizontal
            data={slotEvents}
            renderItem={renderEvent}
            keyExtractor={(event) => `${event._id}-${event.date}-${event.user}`}
            style={styles.eventList}
          />
        )}
      </View>
    );
  };

  const hours = Array.from({ length: 24 }, (_, i) => moment({ hour: i }).tz('Europe/Madrid').format('HH:00'));

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirm = (time) => {
    const formattedTime = moment(time).tz('Europe/Madrid').minute(0).format('HH:mm'); // Adjust time zone
    setNewEventDate(formattedTime);
    hideTimePicker();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button title="Prev Day" onPress={handlePrevDay} />
        <Text style={styles.date}>{selectedDate.format('dddd, D MMM')}</Text>
        <Button title="Next Day" onPress={handleNextDay} />
      </View>
      <FlatList
        data={hours}
        renderItem={renderItem}
        keyExtractor={(item) => item}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>Add visit 🐕</Text>
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Plan your visit 🐶</Text>
          <TouchableOpacity onPress={showTimePicker} style={styles.input}>
            <Text style={newEventDate ? styles.inputText : styles.placeholderText}>
              {newEventDate ? newEventDate : 'Start Time (HH:00)'}
            </Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={handleConfirm}
            onCancel={hideTimePicker}
            minuteInterval={60}
          />
          <View style={styles.modalButtons}>
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
            <Button title="Save" onPress={handleSaveEvent} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  placeId: {
    textAlign: 'center',
    fontSize: 16,
    padding: 10,
    backgroundColor: '#ddd',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  date: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  slot: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 35,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  slotWithEvent: {
    paddingVertical: 0,
  },
  time: {
    width: 60,
    fontSize: 16,
    fontWeight: 'bold',
  },
  eventList: {
    flex: 1,
    paddingLeft: 0,
  },
  event: {
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 0,
  },
  dogAvatar: {
    width: 90, 
    height: 90, 
    borderRadius: 40,
  },
  addButton: {
    backgroundColor: '#007bff',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
  },
  modalContent: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  inputText: {
    fontSize: 16,
    color: '#000',
  },
  placeholderText: {
    fontSize: 16,
    color: '#ccc',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ParkSchedule;