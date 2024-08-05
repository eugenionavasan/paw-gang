// import Constants from 'expo-constants';
import axios from 'axios';
import { GOOGLE_MAPS_API_KEY } from '../config';
import { IGoogleService } from '../types';

// ! revisit:
// Ensure GOOGLE_MAPS_API_KEY is correctly set in your configuration
const apiKey = GOOGLE_MAPS_API_KEY;

// Export GoogleService object with methods to interact with Google APIs
export const GoogleService: IGoogleService = {
  getPhoto,
  getDogParks,
  getGeocode,
};

// Function to get a photo URL for a place using Google Maps API
function getPhoto(path: string): string {
  return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${path}&key=${apiKey}`;
}

// Function to get geocode data for a location using Google Maps API
async function getGeocode(
  location: string,
): Promise<google.maps.GeocoderResult[] | null | void> {
  try {
    const geocodeResponse = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${apiKey}`,
    );
    // Return geocode results
    return geocodeResponse.data.results as google.maps.GeocoderResult[] | null;
  } catch (error) {
    // Log any errors encountered during the API call
    console.error('Error fetching geo codes:', error);
  }
}

// Function to get nearby dog parks based on latitude and longitude using Google Maps API
async function getDogParks(
  lat: number | (() => number), // Handle function or number for latitude
  lng: number | (() => number)  // Handle function or number for longitude
): Promise<google.maps.places.PlaceResult[] | void> {
  try {
    // Determine the latitude and longitude values
    const latitude = typeof lat === 'function' ? lat() : lat;
    const longitude = typeof lng === 'function' ? lng() : lng;

    // Make API call to get nearby dog parks
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=park&keyword=dog%20park&key=${apiKey}`,
    );
    // Return the list of dog parks
    return response.data.results as google.maps.places.PlaceResult[];
  } catch (error) {
    // Log any errors encountered during the API call
    console.error('Error fetching dog parks:', error);
  }
}
