import ScheduleEvent from "../ScheduleEvent/ScheduleEvent";
import {
  FlatList,
  Text,
  View,
  Image,
} from 'react-native';
import styles from "./ScheduleItemStyles";
import {IEvent} from "../../Types/DataTypes";
import moment, {Moment} from 'moment-timezone';
import {filterEventsByDateHour} from "../../services/UtilServices";



const ScheduleItem = (props: {hour: string, selectedDate: Moment, events: IEvent[] | []}): JSX.Element => {
  const {hour, selectedDate, events} = props;

  const eventsInHour: IEvent[] | [] = filterEventsByDateHour(selectedDate, hour, events)

  return (
    <View
      style={[styles.slot, eventsInHour.length > 0 && styles.slotWithEvent]}
    >
      <Text style={styles.time}>{hour}</Text>
      {eventsInHour.length > 0 && (
        <FlatList
          horizontal
          data={eventsInHour}
          renderItem={({item}) => <ScheduleEvent item={item} />}
          keyExtractor={(event) => event._id as string}
          style={styles.eventList}
        />
      )}
    </View>
  );
};

export default ScheduleItem
