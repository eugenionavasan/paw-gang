import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment-timezone';

const SERVER_URL = 'http://192.168.1.103:3000/events/user/eugenio';

function PlanScreen() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    fetchEvents();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.eventItem}>
      <Text style={styles.eventText}>Park Name: {item.park_name}</Text>
      <Text style={styles.eventText}>Address: {item.adress}</Text>
      <Text style={styles.eventText}>
        Date: {moment(item.date).tz('Europe/Madrid').format('MMMM Do YYYY, HH:mm a')}
      </Text>
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
    backgroundColor: '#444',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  eventText: {
    color: '#fff',
    fontSize: 16,
  },
});