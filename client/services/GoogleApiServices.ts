// import Constants from 'expo-constants';
import axios from 'axios';
import {GOOGLE_MAPS_API_KEY} from '../config';
import { IGoogleService } from '../types';

// ! revisit
// const apiKey = Constants.expoConfig.extra.googleMapsApiKey;
const apiKey = GOOGLE_MAPS_API_KEY

export const GoogleService: IGoogleService = {
  getPhoto,
  getDogParks,
  getGeocode,
};

function getPhoto(path: string): string {
  return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${path}&key=${apiKey}`;
}

// ! types
async function getGeocode(
  location: string,
): Promise<google.maps.GeocoderResult[] | null | void> {
  try {
    const geocodeResponse: google.maps.GeocoderResponse = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${apiKey}`,
    );
    return geocodeResponse.results as google.maps.GeocoderResult[] | null;
  } catch (error) {
    console.error('Error fetching geo codes', error);
  }
}

async function getDogParks(
  lat: number | (() => number),
  lng: number | (() => number),
): Promise<google.maps.places.PlaceResult[] | void> {
  try {
    // ! type
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=park&keyword=dog%20park&key=${apiKey}`,
    );
    return response.data.results as google.maps.places.PlaceResult[];
  } catch (error) {
    console.error('Error fetching dog parks', error);
  }
}
