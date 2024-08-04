import Constants from 'expo-constants';

const { extra } = Constants.expoConfig || {};

export const LOCAL_IP_ADDRESS = extra?.localIpAddress || '192.168.0.8';
export const GOOGLE_MAPS_API_KEY = extra?.googleMapsApiKey || '';
export const SERVER_URL = extra?.serverUrl || 'http://192.168.0.8';
export const SERVER_PORT: number | string = extra?.serverPort || 3001;
