import Constants from 'expo-constants';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  logo: {
    height: 75,
    resizeMode: 'contain',
    width: 150,
  },
  logoDiv: {
    alignItems: 'center',
    backgroundColor: '#cfcec9',
    padding: 10,
    paddingTop: Constants.statusBarHeight,
    width: '100%',
  },
});

export default styles;
