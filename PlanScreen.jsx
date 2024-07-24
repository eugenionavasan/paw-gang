import { View, Text, StyleSheet } from 'react-native';

const PlanScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the Plan Screen</Text>
    </View>
  );
};

export default PlanScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
  },
  text: {
    color: '#fff',
    fontSize: 20,
  },
});