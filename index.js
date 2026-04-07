import 'react-native-gesture-handler';
import { AppRegistry, LogBox } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { registerBackgroundHandler } from './src/services/NotificationService';

AppRegistry.registerComponent(appName, () => App);

// Register Firebase background handler after app is registered
registerBackgroundHandler();

LogBox.ignoreLogs([
    'FlashList only supports padding',
    'estimatedItemSize FlashList',
    'View has a shadow set but cannot calculate',
    'setBackgroundColor is only available on Android',
]);