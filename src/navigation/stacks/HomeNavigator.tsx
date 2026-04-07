import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {HomeNavigatorParamList} from '../../../types/navigation';
import BottomNavigation from './BottomTabNavigator/BottomTabNavigator';
import WishListScreen from '../../Screens/MainScreens/HomePages/WishListPages/WishListScreen';
import NotificationScreen from '../../Screens/MainScreens/HomePages/NotificationPages/NotificationScreen';
import BrandsPage from '../../Screens/MainScreens/HomePages/BrandsPage/BrandsPage';
import VendorDetailsScreen from '../../Screens/MainScreens/HomePages/VendorDetailsScreen/VendorDetailsScreen';

const Stack = createStackNavigator<HomeNavigatorParamList>();

export const HomeNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="HomeScreen" component={BottomNavigation} />
      <Stack.Screen name="WishList" component={WishListScreen} />
      <Stack.Screen name="Notification" component={NotificationScreen} />
      <Stack.Screen name="BrandsPage" component={BrandsPage} />
      <Stack.Screen name="VendorDetails" component={VendorDetailsScreen} />
    </Stack.Navigator>
  );
};
