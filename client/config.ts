import Constants from 'expo-constants';

const { extra } = Constants.expoConfig || {};

export const LOCAL_IP_ADDRESS: string = extra?.localIpAddress || '127.0.0.1';
export const GOOGLE_MAPS_API_KEY: string = extra?.googleMapsApiKey || '';
export const SERVER_PORT: number | string = extra?.serverPort || 3000;
