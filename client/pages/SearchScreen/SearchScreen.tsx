import {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import * as Location from 'expo-location';
import Icon from 'react-native-vector-icons/Ionicons';
import ParkList from '../../components/ParkList/ParkList';
import {GoogleService} from '../../services/GoogleApiServices';
import styles from './SearchScreenStyles';

function SearchScreen () {
  const [locationInput, setLocationInput] = useState('');
  const [dogParks, setDogParks] = useState<google.maps.places.PlaceResult[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const fetchDogParks = async (location: string) => {
    if (location.trim() === '') {
      setDogParks([]);
      return;
    }
    setIsLoading(true);
    const geocodeResults = await GoogleService.getGeocode(location)
    if (geocodeResults && geocodeResults.length > 0) {
      const {lat, lng} = geocodeResults[0].geometry.location;
      const locations = await GoogleService.getDogParks(lat, lng)

      setDogParks(locations || []);
    } else {
      setDogParks([]);
      setError('Location not found.');
    }
    setIsLoading(false);
    setError(null);
  };


  const handleLocationSubmit = () => {
    fetchDogParks(locationInput);
  };

  const handleLocateMe = async () => {
    setIsLoading(true);
    try {
      // ! implement service
      const {status} = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Permission to access location was denied');
        setIsLoading(false);
        return;
      }
      // ! implement service
      const location = await Location.getCurrentPositionAsync({});
      const {latitude, longitude} = location.coords;
      const locations = await GoogleService.getDogParks(latitude, longitude)
      setDogParks(locations || []);
    } catch (error) {
      setDogParks([]);
      setError('Unable to get location');
    }
    setIsLoading(false);
    setError(null)
  };

  // place type
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Search for a dog park near you:</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter location..."
          placeholderTextColor="#9DA2AB"
          value={locationInput}
          onChangeText={(text) => setLocationInput(text)}
        />
        <TouchableOpacity style={styles.button} onPress={handleLocationSubmit}>
          <Icon name="search" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLocateMe}>
          <Icon name="locate" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      {isLoading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      )}
      {error && <Text style={styles.errorText}>Error: {error}</Text>}
      <ParkList dogParks={dogParks} />
    </View>
  );
}

export default SearchScreen
