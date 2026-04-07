import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {SearchNavigatorParamList} from '../../../types/navigation';
import SearchResultScreen from '../../Screens/MainScreens/SearchPages/SearchResultScreen';

const Stack = createStackNavigator<SearchNavigatorParamList>();

export const SearchNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="SearchScreen" component={SearchResultScreen} />
      <Stack.Screen name="SearchResultScreen" component={SearchResultScreen} />
    </Stack.Navigator>
  );
};
