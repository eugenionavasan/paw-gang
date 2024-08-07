import {FC} from "react";
import {IEvent} from "../../types";
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import styles from './EventItemStyles'
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment-timezone';
import { EventItemProps } from "../../types";


const EventItem: FC<EventItemProps> = ({item, handleDelete, handleEdit}): JSX.Element => {


  if (item._id) {}
  const handleItemDelete = () => {
    if (item._id) {
      handleDelete(item._id)
    }
  }
  return (
    <View style={styles.eventItem}>
      <Text style={styles.eventText}>Park Name: {item.park_name}</Text>
      <Text style={styles.eventText}>Address: {item.address}</Text>
      <Text style={styles.eventText}>
        Date:{' '}
        {moment(item.date).tz('Europe/Madrid').format('MMMM Do YYYY, HH:mm')}
      </Text>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => handleEdit(item)}
      >
        <Icon name="hammer-outline" size={20} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={handleItemDelete}
      >
        <Icon name="trash" size={20} color="#fff" testID='delete-btn' />
      </TouchableOpacity>
    </View>
  )
};

export default EventItem
