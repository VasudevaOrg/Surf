import { PermissionsAndroid, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/ApiConfig';

export interface LocationInfo {
  latitude: number;
  longitude: number;
  address: string;
  city: string;
}

export const requestLocationPermission = async (): Promise<boolean> => {
  if (Platform.OS === 'ios') {
    const auth = await Geolocation.requestAuthorization('whenInUse');
    return auth === 'granted';
  }

  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message: 'Surf Malta needs access to your location to show nearby products and delivery info.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.warn(err);
    return false;
  }
};

export const getCurrentLocation = (
  enableHighAccuracy: boolean = true,
): Promise<{ latitude: number; longitude: number }> => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      error => {
        // If high accuracy failed, try again with low accuracy
        if (enableHighAccuracy) {
          console.log(
            'High accuracy location failed, retrying with low accuracy...',
          );
          Geolocation.getCurrentPosition(
            pos =>
              resolve({
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude,
              }),
            err => reject(err),
            {
              enableHighAccuracy: false,
              timeout: 20000,
              maximumAge: 10000,
            },
          );
        } else {
          reject(error);
        }
      },
      {
        enableHighAccuracy,
        timeout: 15000,
        maximumAge: 10000,
        forceRequestLocation: true, // Forces Google Play Services to try and get a location fix
        showLocationDialog: true, // Show the GPS prompt if not enabled
      },
    );
  });
};

export const getAddressFromCoords = async (
  latitude: number,
  longitude: number,
): Promise<{ address: string; city: string }> => {
  try {
    // 1. Fetch API Key from backend
    const keyResponse = await axios.get(API_ENDPOINTS.GET_MAP_KEY);
    const apiKey =
      keyResponse.data?.key || 'AIzaSyARG70FxQ0jRcAQMymHstMiFccbW0BN8Lo'; // Fallback to manifest key if backend fails

    // 2. Call Google Geocoding API
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`,
    );

    if (response.data.status === 'OK' && response.data.results.length > 0) {
      const result = response.data.results[0];
      const address = result.formatted_address;

      // Extract city (locality)
      let city = 'Malta';
      const cityComponent = result.address_components.find(
        (comp: any) =>
          comp.types.includes('locality') ||
          comp.types.includes('administrative_area_level_2'),
      );
      if (cityComponent) {
        city = cityComponent.long_name;
      }

      return { address, city };
    }

    return { address: 'Unknown Location', city: 'Malta' };
  } catch (error) {
    console.error('Error during reverse geocoding:', error);
    return { address: 'Error fetching location', city: 'Malta' };
  }
};
