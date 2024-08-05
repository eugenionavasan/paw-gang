import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#008CBA',
    borderRadius: 5,
    justifyContent: 'center',
    marginLeft: 10,
    padding: 10,
  },
  container: {
    backgroundColor: '#333',
    flex: 1,
  },
  errorText: {
    color: 'red',
    marginBottom: 20,
    marginLeft: 20,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    color: '#f9f9f9',
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  inputContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 20,
    marginHorizontal: 20,
  },
  label: {
    color: '#f9f9f9',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 20,
    marginVertical: 20,
  },
  loaderContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

export default styles;
