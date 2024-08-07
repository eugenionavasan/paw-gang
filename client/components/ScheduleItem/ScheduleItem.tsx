import ScheduleEvent from "../ScheduleEvent/ScheduleEvent";
import {
  FlatList,
  Text,
  View,
  Image,
} from 'react-native';
import styles from "./ScheduleItemStyles";
import {Event, IEvent} from "../../Types/DataTypes";
import moment, {Moment} from 'moment-timezone';



const ScheduleItem = (props: {hour: string, selectedDate: Moment, events: IEvent[] | []}) => {
  const {hour, selectedDate, events} = props;
  //   const dayEvents = events[selectedDate.format('YYYY-MM-DD')] || [];
  //   const slotEvents = dayEvents.filter((event) =>
  //     moment(event.date)
  //       .tz('Europe/Madrid')
  //       .isSame(
  //         selectedDate.clone().hour(moment(item, 'HH:mm').hour()),
  //         'hour',
  //       ),
  //   );

  const slotEvents: IEvent[] | [] = events.filter((event) =>
    moment(event.date)
      .tz('Europe/Madrid')
      .isSame(
        selectedDate.clone().hour(moment(hour, 'HH:mm').hour()),
        'hour',
      ),
  );

  return (
    <View
      style={[styles.slot, slotEvents.length > 0 && styles.slotWithEvent]}
    >
      <Text style={styles.time}>{hour}</Text>
      {slotEvents.length > 0 && (
        <FlatList
          horizontal
          data={slotEvents}
          renderItem={({item}) => <ScheduleEvent item={item} />}
          keyExtractor={(event) => event._id as string}
          style={styles.eventList}
        />
      )}
    </View>
  );
};

export default ScheduleItem
