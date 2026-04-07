import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Sentry from '@sentry/react-native';

export const storageKeys = {
  USER_DATA: 'user_data',
  APP_SETTINGS: 'app_settings',
};

export const storeData = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    return true;
  } catch (error) {
    Sentry.captureException(error);
    console.error('Error storing data:', error);
    return false;
  }
};

export const getData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    Sentry.captureException(error);
    console.error('Error retrieving data:', error);
    return null;
  }
};

export const removeData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    Sentry.captureException(error);
    console.error('Error removing data:', error);
    return false;
  }
};

export const clearAll = async () => {
  try {
    await AsyncStorage.clear();
    return true;
  } catch (error) {
    Sentry.captureException(error);
    console.error('Error clearing all data:', error);
    return false;
  }
};
