import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { RootStackParamList } from '../../types/navigation';
import { OnboardingNavigator } from './stacks/OnboardingNavigator';
import { AuthNavigator } from './stacks/AuthNavigator';
import { MainNavigator } from './stacks/MainNavigator';
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
      {isAuthenticated ? (
        <Stack.Screen name="MainScreens" component={MainNavigator} />
      ) : (
        <>
          {!isGuest && (
            <Stack.Screen name="Onboarding" component={OnboardingNavigator} />
          )}
          <Stack.Screen name="MainScreens" component={MainNavigator} />
          <Stack.Screen name="Authentication" component={AuthNavigator} />
        </>
      )}
    </Stack.Navigator>
  );
};