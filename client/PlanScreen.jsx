import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment-timezone';
import Icon from 'react-native-vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native';

const SERVER_URL = 'http://192.168.1.103:3000/events/user/eugenio';

function PlanScreen() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(SERVER_URL);
      const currentTime = moment().tz('Europe/Madrid');
      const upcomingEvents = response.data.filter(event =>
        moment(event.date).tz('Europe/Madrid').isSameOrAfter(currentTime, 'minute')
      );
      setEvents(upcomingEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchEvents();
    }, [])
  );

  const handleDelete = async (_id) => {
    try {
      await axios.delete(`http://192.168.1.103:3000/events/${_id}`);
      setEvents((prevEvents) => prevEvents.filter((item) => item._id !== _id));
    } catch (error) {
      console.error('Error deleting event:', error);
      Alert.alert('Error', 'An error occurred while deleting the event.');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.eventItem}>
      <Text style={styles.eventText}>Park Name: {item.park_name}</Text>
      <Text style={styles.eventText}>Address: {item.adress}</Text>
      <Text style={styles.eventText}>
        Date: {moment(item.date).tz('Europe/Madrid').format('MMMM Do YYYY, HH:mm')}
      </Text>
      <TouchableOpacity style={styles.editButton}>
        <Icon name="hammer-outline" size={20} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item._id)}>
        <Icon name="trash" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={events}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={<Text style={styles.text}>No upcoming events found</Text>}
      />
    </View>
  );
}

export default PlanScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#333',
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 20,
  },
  eventItem: {
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    position: 'relative',
  },
  eventText: {
    fontSize: 16,
    color: '#000',
    marginBottom: 5,
  },
  deleteButton: {
    backgroundColor: 'red',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  editButton: {
    backgroundColor: 'orange',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    right: 50,
  },
});