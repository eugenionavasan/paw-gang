import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Image, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';
import debounce from 'lodash.debounce';
import Constants from 'expo-constants';
import ErrorBoundary from './errorBoundary.jsx';
import CustomButton from './customButton.jsx';

const DogParks = () => {
  const [locationInput, setLocationInput] = useState('');
  const [dogParks, setDogParks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiKey = Constants.expoConfig.extra.googleMapsApiKey;

  const fetchDogParks = async (location) => {
    if (location.trim() === '') {
      setDogParks([]);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const geocodeResponse = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${apiKey}`
      );

      const geocodeResults = geocodeResponse.data.results;
      if (geocodeResults?.length > 0) {
        const { lat, lng } = geocodeResults[0].geometry.location;

        const placesResponse = await axios.get(
          `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=park&keyword=dog%20park&key=${apiKey}`
        );

        setDogParks(placesResponse.data.results || []);
      } else {
        setDogParks([]);
        setError('Location not found.');
      }
    } catch (err) {
      setError(err.message || 'An error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const getPhotoUrl = (photoReference) => {
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${apiKey}`;
  };

  const debouncedFetchDogParks = debounce(fetchDogParks, 1000);

  useEffect(() => {
    debouncedFetchDogParks(locationInput);
    return () => {
      debouncedFetchDogParks.cancel();
    };
  }, [locationInput]);

  return (
    <View style={styles.container}>
      <View style={styles.logoDiv}>
        <Image source={require('./assets/logo.jpg')} style={styles.logo} />
      </View>
      <Text style={styles.label}>Search for a dog park near you:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter location..."
        value={locationInput}
        onChangeText={(text) => setLocationInput(text)}
      />
      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
      {error && <Text style={styles.errorText}>Error: {error}</Text>}
      <FlatList
        data={dogParks}
        keyExtractor={(item) => item.place_id}
        renderItem={({ item }) => (
          <View style={styles.parkItem}>
            <Text style={styles.parkName}>{item.name}</Text>
            {item.photos && item.photos.length > 0 && (
              <Image
                style={styles.parkImage}
                source={{ uri: getPhotoUrl(item.photos[0].photo_reference) }}
              />
            )}
            <Text>{item.vicinity}</Text>
            <Text>Rating: {item.rating}</Text>
            <CustomButton title="Plan visit🐾" onPress={() => {}} />
          </View>
        )}
      />
    </View>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <DogParks />
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    paddingTop: 50,
  },
  logoDiv: {
    backgroundColor: '#cfcec9',
    padding: 10,
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 100,
    resizeMode: 'contain',
  },
  label: {
    fontSize: 18,
    marginVertical: 20,
    marginLeft: 20,
    color: '#f9f9f9',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    marginLeft: 20,
    marginRight: 20,
    color: '#f9f9f9',
  },
  errorText: {
    color: 'red',
    marginBottom: 20,
    marginLeft: 20,
  },
  parkItem: {
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  parkName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  parkImage: {
    width: '100%',
    height: 200,
    borderRadius: 5,
    marginBottom: 10,
    objectFit: 'cover',
  },
});