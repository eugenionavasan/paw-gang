import { View, Text, StyleSheet } from 'react-native';

function PlanScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the Plan Screen</Text>
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
});
