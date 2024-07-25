import { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button, TextInput, Modal, TouchableOpacity, Alert } from 'react-native';
import moment from 'moment-timezone';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const initialEvents = {};

const ParkSchedule = ({ route }) => {
  const { place_id } = route.params;
  const [selectedDate, setSelectedDate] = useState(moment().tz('Europe/Madrid'));
  const [events, setEvents] = useState(initialEvents);
  const [modalVisible, setModalVisible] = useState(false);
  const [newEvent, setNewEvent] = useState({ user: '', date: '' });
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`http://localhost:3000/events/park/${place_id}`);
        const data = await response.json();
        const formattedEvents = data.reduce((acc, event) => {
          const dateKey = moment(event.date.$date).tz('Europe/Madrid').format('YYYY-MM-DD');
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
    if (newDate.isSameOrAfter(moment().tz('Europe/Madrid'), 'day')) {
      setSelectedDate(newDate);
    }
  };

  const handleNextDay = () => {
    setSelectedDate(selectedDate.clone().add(1, 'day'));
  };

  const handleSaveEvent = () => {
    const eventDate = moment.tz(`${selectedDate.format('YYYY-MM-DD')} ${newEvent.date}`, 'YYYY-MM-DD HH:mm', 'Europe/Madrid');
    const eventToAdd = {
      ...newEvent,
      date: eventDate.toISOString(),
      id: `${selectedDate.format('YYYY-MM-DD')}-${newEvent.date}-${newEvent.user}`, // Unique key
    };
    const dateKey = selectedDate.format('YYYY-MM-DD');

    if (selectedDate.isBefore(moment().tz('Europe/Madrid'), 'day')) {
      Alert.alert('Error', 'You cannot add events to past days.');
      return;
    }

    setEvents((prevEvents) => ({
      ...prevEvents,
      [dateKey]: [...(prevEvents[dateKey] || []), eventToAdd],
    }));
    setModalVisible(false);
    setNewEvent({ user: '', date: '' });
  };

  const renderEvent = ({ item }) => (
    <View style={styles.event}>
      <Text style={styles.eventUser}>{item.user}</Text>
    </View>
  );

  const renderItem = ({ item }) => {
    const dayEvents = events[selectedDate.format('YYYY-MM-DD')] || [];
    const slotEvents = dayEvents.filter(event =>
      moment.tz(event.date, 'Europe/Madrid').isSame(selectedDate.clone().hour(moment(item, 'HH:mm').hour()), 'hour') // Adjust time zone
    );

    console.log('Rendering slot:', item, 'with events:', slotEvents); // Debugging the render logic

    return (
      <View style={styles.slot}>
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
    const formattedTime = moment(time).tz('Europe/Madrid').minute(0).format('HH:mm'); 
    setNewEvent({ ...newEvent, date: formattedTime });
    hideTimePicker();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.placeId}>Place ID: {place_id}</Text>
      <View style={styles.header}>
        <Button title="Prev Day" onPress={handlePrevDay} disabled={selectedDate.isSameOrBefore(moment().tz('Europe/Madrid'), 'day')} />
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
          <TextInput
            style={styles.input}
            placeholder="User"
            value={newEvent.user}
            onChangeText={(text) => setNewEvent({ ...newEvent, user: text })}
          />
          <TouchableOpacity onPress={showTimePicker} style={styles.input}>
            <Text style={newEvent.date ? styles.inputText : styles.placeholderText}>
              {newEvent.date ? newEvent.date : 'Start Time (HH:00)'}
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
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  time: {
    width: 50,
    fontSize: 16,
    fontWeight: 'bold',
  },
  eventList: {
    flex: 1,
    paddingLeft: 10,
  },
  event: {
    backgroundColor: '#e3f2fd',
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 5,
  },
  eventUser: {
    fontSize: 16,
    fontWeight: 'bold',
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