import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { RootNavigator } from './src/navigation/RootNavigator';
import { persistor, store } from './src/store';
import { navigationRef } from './src/utils/navigationref';
import {
  notificationListener,
  requestUserPermission,
} from './src/services/NotificationService';
import Toast from 'react-native-toast-message';
import { ToastComponent } from './src/components/MainComponents/Toast/ToastComponent';

export const toastConfig = {
  appToast: (props: any) => <ToastComponent {...props} />,
};

const App = () => {
  React.useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    const timer = setTimeout(async () => {
      try {
        await requestUserPermission?.();
      } catch (e) {
        console.warn('requestUserPermission error:', e);
      }
    }, 5000);

    try {
      unsubscribe = notificationListener?.();
    } catch (e) {
      console.warn('notificationListener error:', e);
    }

    return () => {
      clearTimeout(timer);
      unsubscribe?.();
    };
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaProvider initialMetrics={initialWindowMetrics}>
            <NavigationContainer ref={navigationRef}>
              <RootNavigator />
              <Toast config={toastConfig} />
            </NavigationContainer>
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;