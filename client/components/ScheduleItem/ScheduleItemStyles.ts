import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  eventList: {
    flex: 1,
    paddingLeft: 0,
  },
  slot: {
    alignItems: 'center',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 35,
  },
  slotWithEvent: {
    paddingVertical: 0,
  },
  time: {
    fontSize: 16,
    fontWeight: 'bold',
    width: 60,
  },
});

export default styles
