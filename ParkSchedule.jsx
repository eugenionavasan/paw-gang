import { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, TextInput, Modal, TouchableOpacity, Alert } from 'react-native';
import moment from 'moment';

const initialEvents = {};

const ParkSchedule = ({ route }) => {
  const { place_id } = route.params;
  const [selectedDate, setSelectedDate] = useState(moment());
  const [events, setEvents] = useState(initialEvents);
  const [modalVisible, setModalVisible] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', startTime: '' });

  const handlePrevDay = () => {
    const newDate = selectedDate.clone().subtract(1, 'day');
    if (newDate.isSameOrAfter(moment(), 'day')) {
      setSelectedDate(newDate);
    }
  };

  const handleNextDay = () => {
    setSelectedDate(selectedDate.clone().add(1, 'day'));
  };

  const handleSaveEvent = () => {
    const startTime = moment(newEvent.startTime, 'HH:mm').startOf('hour').format('HH:00');
    const endTime = moment(startTime, 'HH:mm').add(1, 'hour').format('HH:00');
    const eventToAdd = { ...newEvent, startTime, endTime };
    const dateKey = selectedDate.format('YYYY-MM-DD');

    if (selectedDate.isBefore(moment(), 'day')) {
      Alert.alert('Error', 'You cannot add events to past days.');
      return;
    }

    setEvents({
      ...events,
      [dateKey]: [...(events[dateKey] || []), eventToAdd],
    });
    setModalVisible(false);
    setNewEvent({ title: '', startTime: '' });
  };

  const renderEvent = ({ item }) => (
    <View style={styles.event}>
      <Text style={styles.eventTitle}>{item.title}</Text>
    </View>
  );

  const renderItem = ({ item }) => {
    const dayEvents = events[selectedDate.format('YYYY-MM-DD')] || [];
    const slotEvents = dayEvents.filter(event => moment(event.startTime, 'HH:mm').isSame(moment(item, 'HH:mm'), 'hour'));

    return (
      <View style={styles.slot}>
        <Text style={styles.time}>{item}</Text>
        {slotEvents.length > 0 && (
          <FlatList
            horizontal
            data={slotEvents}
            renderItem={renderEvent}
            keyExtractor={(event) => event.startTime + event.title}
            style={styles.eventList}
          />
        )}
      </View>
    );
  };

  const hours = Array.from({ length: 24 }, (_, i) => moment({ hour: i }).format('HH:00'));

  return (
    <View style={styles.container}>
      <Text style={styles.placeId}>Place ID: {place_id}</Text>
      <View style={styles.header}>
        <Button title="Prev Day" onPress={handlePrevDay} disabled={selectedDate.isSameOrBefore(moment(), 'day')} />
        <Text style={styles.date}>{selectedDate.format('dddd, D MMM')}</Text>
        <Button title="Next Day" onPress={handleNextDay} />
      </View>
      <FlatList
        data={hours}
        renderItem={renderItem}
        keyExtractor={(item) => item}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>Add Event</Text>
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Plan your visit!</Text>
          <TextInput
            style={styles.input}
            placeholder="Title"
            value={newEvent.title}
            onChangeText={(text) => setNewEvent({ ...newEvent, title: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Start Time (HH:00)"
            value={newEvent.startTime}
            onChangeText={(text) => setNewEvent({ ...newEvent, startTime: text })}
            keyboardType="numeric"
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
  eventTitle: {
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
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ParkSchedule;