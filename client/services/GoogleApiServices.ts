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
  lng: number | (() => number), // Handle function or number for longitude
): Promise<google.maps.places.PlaceResult[] | void> {
    // Determine the latitude and longitude values
    // const latitude = typeof lat === 'function' ? lat() : lat;
    // const longitude = typeof lng === 'function' ? lng() : lng;

    // Make API call to get nearby dog parks
    // const response = await axios.get(
    //   `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=park&keyword=dog%20park&key=${apiKey}`,
    // );
    // console.log(apiKey);
    // const response = await axios({
    //   url: `https://places.googleapis.com/v1/places:searchNearby`,
    //   method: 'POST',
    //   data: {
    //     includedTypes: ['Dog Park'],
    //     location: { latitude, longitude },
    //     locationRestriction: {
    //       circle: {
    //         center: {
    //           latitude: 37.7937,
    //           longitude: -122.3965,
    //         },
    //         radius: 5000,
    //       },
    //     },
    //   },
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'X-Goog-Api-Key': apiKey,
    //     'X-Goog-FieldMask': 'places.displayName',
    //   },
    // });
    const location = { latitude: 37.7937, longitude: -122.3965 }; // Latitude and Longitude of search center
    const radius = 500; // Search radius in meters
    
    const requestBody = {
      includedTypes: ["restaurant"],
      maxResultCount: 10, // Using maxResults instead of maxResultCount for consistency with Axios
      locationRestriction: {
        circle: {
          center: location,
          radius: radius,
        }
      }
    };
    
  console.log(apiKey);

    const headers = {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask': 'places.displayName', // Using snake_case for field mask
    };
    
    fetch('https://places.googleapis.com/v1/places:searchNearby', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(requestBody)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data.places);
      })
      .catch(error => {
        console.error('Error:', error);   
    
      });
}
