import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {AccountNavigatorParamList} from '../../../types/navigation';
import AccountScreen from '../../Screens/MainScreens/AccountPages/AccountScreen';
import OrderScreen from '../../Screens/MainScreens/AccountPages/AccountSubOptions/OrderScreenPages/OrderScreen';
import AddressScreen from '../../Screens/MainScreens/AccountPages/AccountSubOptions/AddressScreenPages/AddressScreen';
import NewAddress from '../../Screens/MainScreens/AccountPages/AccountSubOptions/AddressScreenPages/NewAddressPages/NewAddress';
import EditFieldScreen from '../../components/CustomComponents/Screens/EditFieldScreen/EditFieldScreen';
import PersonalInfo from '../../Screens/MainScreens/AccountPages/AccountSubOptions/PersonalInfoPages/PersonalInfo';
import BankDetail from '../../Screens/MainScreens/AccountPages/BankDetailPages/BankDetail';
import NewBankDetails from '../../Screens/MainScreens/AccountPages/NewBankDetailsPages/NewBankDetails';
import HelpSupport from '../../Screens/MainScreens/AccountPages/HelpSupportPages/HelpSupport';
import MyOrderDetails from '../../components/CustomComponents/AccountComponents/MyOrderDetails/MyorderDetails';
import CancellationScreen from '../../components/CustomComponents/AccountComponents/Cancellation/CancellationScreen';
import OrderCancelled from '../../components/CustomComponents/AccountComponents/OrderCancelled/OrderCancelled';
import RateOrderScreen from '../../Screens/MainScreens/AccountPages/AccountSubOptions/OrderScreenPages/RateOrderPages/RateOrderScreen';
import OTPScreen from '../../Screens/AuthScreens/OTPPages/OTPScreen';

const Stack = createStackNavigator<AccountNavigatorParamList>();

export const AccountScreenNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="AccountScreen" component={AccountScreen} />
      <Stack.Screen name="OrderScreen" component={OrderScreen} />
      <Stack.Screen name="AddressScreen" component={AddressScreen} />
      <Stack.Screen name="NewAddress" component={NewAddress} />
      <Stack.Screen name="NewBankDetails" component={NewBankDetails} />
      <Stack.Screen name="EditField" component={EditFieldScreen} />
      <Stack.Screen name="PersonalInfo" component={PersonalInfo} />
      <Stack.Screen name="BankDetail" component={BankDetail} />
      <Stack.Screen name="HelpSupport" component={HelpSupport} />
      <Stack.Screen name="MyOrderDetails" component={MyOrderDetails} />
      <Stack.Screen name="CancellationScreen" component={CancellationScreen} />
      <Stack.Screen name="OrderCancelled" component={OrderCancelled} />
      <Stack.Screen name="RateOrder" component={RateOrderScreen} />
      <Stack.Screen name="OTPScreen" component={OTPScreen} />
    </Stack.Navigator>
  );
};
