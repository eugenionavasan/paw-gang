import 'dotenv/config';

export default {
  "expo": {
    "name": "paw-gang",
    "slug": "paw-gang",
    "version": "1.0.0",
    "extra": {
      "googleMapsApiKey": process.env.GOOGLE_MAPS_API_KEY,
    },
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      }
    },
    "web": {
      "favicon": "./assets/favicon.png"
    }
  }
}
