import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { RootStackParamList } from '../../types/navigation';
import { OnboardingNavigator } from './stacks/OnboardingNavigator';
import { AuthNavigator } from './stacks/AuthNavigator';
import { MainNavigator } from './stacks/MainNavigator';
import WebViewScreen from '../Screens/MainScreens/WebViewScreen/WebViewScreen';

import { useSelector } from 'react-redux';
import { RootState } from '../store';

const Stack = createStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const { isAuthenticated, isGuest } = useSelector(
    (state: RootState) => state.auth,
  );

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {!isAuthenticated && !isGuest && (
        <Stack.Screen name="Onboarding" component={OnboardingNavigator} />
      )}
      <Stack.Screen name="MainScreens" component={MainNavigator} />
      <Stack.Screen name="Authentication" component={AuthNavigator} />
      <Stack.Screen name="WebViewScreen" component={WebViewScreen} />
    </Stack.Navigator>
  );
};