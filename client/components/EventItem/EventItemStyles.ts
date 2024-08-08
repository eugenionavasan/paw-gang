import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  eventItem: {
    backgroundColor: '#ccc',
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

export default styles
