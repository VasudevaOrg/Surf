import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import SplashScreen from '../../Screens/OnBoardingScreens/SplashPages/SplashScreen';

import {OnboardingStackParamList} from '../../../types/navigation';
import WelcomeScreen from '../../Screens/OnBoardingScreens/WelcomeStepPages/WelcomeScreen';

const Stack = createStackNavigator<OnboardingStackParamList>();

export const OnboardingNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
    </Stack.Navigator>
  );
};
