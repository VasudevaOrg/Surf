import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {CartNavigatorParamList} from '../../../types/navigation';
import CartScreen from '../../Screens/MainScreens/CartPages/CartScreen';
import AddressAdd from '../../components/CustomComponents/CartComponents/AddressComponent/AddressAddPages/AddressAdd';
import ConfirmOrder from '../../Screens/MainScreens/CartPages/ProgressStepperPages/CartStepPages/ConfirmOrderPages/ConfirmOrder';
import AddPaymentScreen from '../../Screens/MainScreens/CartPages/ProgressStepperPages/PaymentPages/AddPaymentPages/AddPaymentScreen';
import AddCardScreen from '../../Screens/MainScreens/CartPages/ProgressStepperPages/PaymentPages/AddCardPages/AddCardScreen';
import CVVCardScreen from '../../Screens/MainScreens/CartPages/ProgressStepperPages/PaymentPages/CVVCardPages/CVVCardScreen';

const Stack = createStackNavigator<CartNavigatorParamList>();

export const CartNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="CartScreen" component={CartScreen} />
      <Stack.Screen name="AddressAdd" component={AddressAdd} />
      <Stack.Screen name="ConfirmOrder" component={ConfirmOrder} />
      <Stack.Screen name="AddPayment" component={AddPaymentScreen} />
      <Stack.Screen name="AddCard" component={AddCardScreen} />
      <Stack.Screen name="CVVCard" component={CVVCardScreen} />
    </Stack.Navigator>
  );
};
