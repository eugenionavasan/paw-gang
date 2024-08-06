// import Constants from 'expo-constants';
import axios from 'axios';
import { GOOGLE_MAPS_API_KEY } from '../config';
import { IGmapsPlace, IGoogleService } from '../types';

// Ensure GOOGLE_MAPS_API_KEY is correctly set in your configuration
// ! Delete:
const apiKey = GOOGLE_MAPS_API_KEY;

// Export GoogleService object with methods to interact with Google APIs
export const GoogleService: IGoogleService = {
  getPhoto,
  getDogParks,
  getGeocode,
};

// Function to get a photo URL for a place using Google Maps API
function getPhoto(reference: string): string {
  const imgMaxPxWidth = 800;
  return `https://places.googleapis.com/v1/${reference}/media?key=${apiKey}&maxWidthPx=${imgMaxPxWidth}`;
}
``;
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
  lat: number | (() => number),
  lng: number | (() => number),
): Promise<IGmapsPlace[] | void> {
  // Determine the latitude and longitude values
  const latitude = typeof lat === 'function' ? lat() : lat;
  const longitude = typeof lng === 'function' ? lng() : lng;

  const location = { latitude, longitude };
  const radius = 500;

  const requestBody = {
    includedTypes: ['park'],
    maxResultCount: 10,
    locationRestriction: {
      circle: {
        center: location,
        radius: radius,
      },
    },
  };

  const headers = {
    'Content-Type': 'application/json',
    'X-Goog-Api-Key': apiKey,
    'X-Goog-FieldMask': '*',
  };

  const response = await fetch(
    'https://places.googleapis.com/v1/places:searchNearby',
    {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(requestBody),
    },
  );
  const result = await response.json();
  return result.places as IGmapsPlace[];
}
