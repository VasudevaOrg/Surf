import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { CategoriesNavigatorParamList } from "../../../types/navigation";
import CategoriesScreen from "../../Screens/MainScreens/CategoriesPages/CategoriesScreen";
import ViewAllScreen from "../../Screens/MainScreens/CategoriesPages/ViewAllPages/ViewAllScreen";

const Stack = createStackNavigator<CategoriesNavigatorParamList>();

export const CategoryNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="CategoriesScreen" component={CategoriesScreen} />
      <Stack.Screen name="ViewAllScreen" component={ViewAllScreen} />
    </Stack.Navigator>
  );
};
