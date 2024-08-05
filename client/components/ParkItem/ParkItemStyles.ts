import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  parkImage: {
    borderRadius: 5,
    height: 200,
    marginBottom: 10,
    objectFit: 'cover',
    width: '100%',
  },
  parkItem: {
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    marginBottom: 20,
    marginHorizontal: 20,
    padding: 10,
  },
  parkName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default styles
