import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  addButton: {
    alignItems: 'center',
    backgroundColor: '#008CBA',
    justifyContent: 'center',
    padding: 15,
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
  },
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
  date: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dogAvatar: {
    borderRadius: 40,
    height: 90,
    width: 90,
  },
  event: {
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    marginHorizontal: 0,
    padding: 10,
  },
  eventList: {
    flex: 1,
    paddingLeft: 0,
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    height: 40,
    justifyContent: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  inputText: {
    color: '#000',
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 20,
  },
  placeholderText: {
    color: '#ccc',
    fontSize: 16,
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
