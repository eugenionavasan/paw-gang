import 'ts-node/register';
import {ExpoConfig} from 'expo/config';
import dotenv from 'dotenv';
dotenv.config({path: '../.env'})

const config: ExpoConfig = {
  name: 'paw-gang',
  slug: 'paw-gang',
  version: '1.0.0',
  extra: {
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    localIpAddress: process.env.LOCAL_IP_ADDRESS,
    serverPort: process.env.SERVER_PORT,
  },
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/logo.jpg',
    resizeMode: 'contain',
    backgroundColor: '#cfcec9',
  },
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/icon.png',
      backgroundColor: '#ffffff',
    },
  },
  web: {
    favicon: './assets/icon.png',
  },
};

export default config;
