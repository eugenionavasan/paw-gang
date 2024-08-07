import {
  Image,
  View,
} from 'react-native';
import {IEvent} from '../../Types/DataTypes';
import styles from './ScheduleEventStyles'

const ScheduleEvent = (prop: {item: IEvent}) => {
  const {item} = prop
  return (
    <View style={styles.event}>
      <Image source={{uri: item.dog_avatar}} style={styles.dogAvatar} />
    </View>
  );
}

export default ScheduleEvent
