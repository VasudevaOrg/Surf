import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { DashboardStackParamList } from '../../../types/navigation';
import ProductDetailScreen from '../../Screens/ProductDetailsPages/ProductDetailScreen';
import {AccountScreenNavigator} from './AccountScreenNavigator';
import {CartNavigator} from './CartNavigator';
import {CategoryNavigator} from './CategoryNavigator';
import {HomeNavigator} from './HomeNavigator';
import {SearchNavigator} from './SearchNavigator';
import WebViewScreen from '../../Screens/MainScreens/WebViewScreen/WebViewScreen';

const Stack = createStackNavigator<DashboardStackParamList>();

export const MainNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={HomeNavigator} />
      <Stack.Screen name="Search" component={SearchNavigator} />
      <Stack.Screen name="Categories" component={CategoryNavigator} />
      <Stack.Screen name="Account" component={AccountScreenNavigator} />
      <Stack.Screen name="Cart" component={CartNavigator} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      <Stack.Screen name="WebViewScreen" component={WebViewScreen} />
    </Stack.Navigator>
  );
};
