import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import {AuthStackParamList} from '../../../types/navigation';
import PhoneNumberScreen from '../../Screens/AuthScreens/NumberLoginPages/PhoneNumberScreen';
import OTPScreen from '../../Screens/AuthScreens/OTPPages/OTPScreen';
import AuthSuccessScreen from '../../Screens/AuthScreens/AuthSuccessScreen/AuthSuccessScreen';
import CreateNewAccountScreen from '../../Screens/AuthScreens/CreateNewAccountPages/CreateNewAccountScreen';
import WhatsAppAndEmailLogInScreen from '../../Screens/AuthScreens/WhatsAppAndEmailLogInPages/WhatsAppAndEmailLogInScreen';
const Stack = createStackNavigator<AuthStackParamList>();

export const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="PhoneNumberScreen" component={PhoneNumberScreen} />
      <Stack.Screen name="OTPScreen" component={OTPScreen} />
      <Stack.Screen
        name="CreateNewAccountScreen"
        component={CreateNewAccountScreen}
      />
      <Stack.Screen
        name="WhatsAppAndEmailLogInScreen"
        component={WhatsAppAndEmailLogInScreen}
      />
      <Stack.Screen name="AuthSuccessScreen" component={AuthSuccessScreen} />
    </Stack.Navigator>
  );
};
