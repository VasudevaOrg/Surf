import messaging from '@react-native-firebase/messaging';
import { PermissionsAndroid, Platform } from 'react-native';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/ApiConfig';
import { mapApiError } from '../utils/ErrorUtils';

export const requestUserPermission = async () => {
  try {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (Platform.OS === 'android' && Platform.Version >= 33) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      console.log('Post Notification Permission:', granted);
    }

    if (enabled) {
      console.log('Authorization status:', authStatus);
      await getFcmToken();
    }
  } catch (e) {
    console.warn('requestUserPermission error:', e);
  }
};

const getFcmToken = async () => {
  try {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log('Your Firebase Token is:', fcmToken);
    } else {
      console.log('Failed to get FCM token');
    }
  } catch (error) {
    console.log('Error getting FCM token:', error);
  }
};

let onRefreshCallback: (() => void) | null = null;

export const setOnNotificationRefresh = (callback: (() => void) | null) => {
  onRefreshCallback = callback;
};

export const notificationListener = () => {
  try {
    // Foreground message handler
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
      if (onRefreshCallback) {
        onRefreshCallback();
      }
    });

    // Background/Quit state handler
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
    });

    // Check whether an initial notification is available (Quit state)
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      });

    return unsubscribe;
  } catch (e) {
    console.warn('notificationListener error:', e);
    return () => { };
  }
};

// ✅ Must be called AFTER Firebase is ready — call this from AppDelegate/index.js
// NOT at module level
export const registerBackgroundHandler = () => {
  try {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });
  } catch (e) {
    console.warn('registerBackgroundHandler error:', e);
  }
};

export const getNotifications = async (userId: string | number) => {
  try {
    const response = await axios.get(API_ENDPOINTS.GET_NOTIFICATIONS(userId));
    return { success: true, notifications: response.data.notifications || [] };
  } catch (error: any) {
    console.error('Error in getNotifications:', error.message);
    return { success: false, message: mapApiError(error.message) };
  }
};

export const markNotificationsRead = async (
  userId: string | number,
  notificationId?: string | number,
) => {
  try {
    const payload: any = {
      user_id: userId,
      mark_all_read: notificationId ? 'N' : 'Y',
    };
    if (notificationId) {
      payload.notification_id = notificationId;
    }
    const response = await axios.post(API_ENDPOINTS.NOTIFICATION_ACTION, payload);
    return { success: true, data: response.data };
  } catch (error: any) {
    console.error('Error in markNotificationsRead:', error.message);
    return { success: false, message: mapApiError(error.message) };
  }
};

export const deleteNotifications = async (
  userId: string | number,
  notificationId?: string | number,
) => {
  try {
    const payload: any = {
      user_id: userId,
      delete_all: notificationId ? 'N' : 'Y',
    };
    if (notificationId) {
      payload.notification_id = notificationId;
    }
    const response = await axios.post(API_ENDPOINTS.NOTIFICATION_ACTION, payload);
    return { success: true, data: response.data };
  } catch (error: any) {
    console.error('Error in deleteNotifications:', error.message);
    return { success: false, message: mapApiError(error.message) };
  }
};