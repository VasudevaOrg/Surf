import React, { useMemo, useState } from 'react';
import { Image, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ArrowLeftIcon from '../../../../assets/icons/ArrowLeft';
import LocationPinIcon from '../../../../assets/icons/LocationPinIcon';
import QuestionMarkIcon from '../../../../assets/icons/QuestionMarkIcon';
import { Header } from '../../../../components/CustomComponents/Header/Header';
import { SlidingBar } from '../../../../components/CustomComponents/SlidingBar/SlidingBar';
import {
  Button,
  ButtonSize,
  ButtonState,
  ButtonType,
  ButtonVariant,
} from '../../../../components/MainComponents/Button';
import AnimatedTextInput from '../../../../components/MainComponents/TextInput/TextInput';
import { Typography } from '../../../../components/MainComponents/Typography/Typography';
import { TypographyVariant } from '../../../../components/MainComponents/Typography/Typography.types';
import ColorPalette from '../../../../config/ColorPalette';
import { Spacing } from '../../../../config/globalStyles';
import { getScreenHeight, getScreenWidth } from '../../../..//helpers/screenSize';
import { goBack } from '../../../../utils/navigationref';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { API_ENDPOINTS } from '../../../../config/ApiConfig';
import { useRoute } from '@react-navigation/native';
import { useEffect } from 'react';
import { styles } from './NewAddress.styles';
import { ToastAndroid, Platform, Alert } from 'react-native';
import ScreenWrapper from '../../../../components/CustomComponents/ScreenWrapper/ScreenWrapper';
import { showToast } from '../../../../components/MainComponents/Toast/ToastHelper';
import { ToastMessages } from '../../../../components/MainComponents/Toast/ToastMessages';

const NewAddress = () => {
  const route = useRoute<any>();
  const { type, data } = route.params || {};
  const userId = useSelector((state: RootState) => state.auth.userId);

  const [houseNo, setHouseNo] = useState('');
  const [streetName, setStreetName] = useState('');
  const [landMark, setLandMark] = useState('');
  const [loading, setLoading] = useState(false);

  const filterOptions = useMemo(
    () => [
      { id: 'home', label: 'Home' },
      { id: 'office', label: 'Office' },
      { id: 'other', label: 'Other' },
    ],
    [],
  );
  const [selectedFilter, setSelectedFilter] = useState(filterOptions[0]);

  useEffect(() => {
    if (type === 'edit' && data) {
      setHouseNo(data.s_address || '');
      // Try to extract street name from the combined streetName if possible,
      // but here we have rawData so we use s_address_2
      setStreetName(data.s_address_2 || '');
      setLandMark(data.s_city || '');

      const foundFilter = filterOptions.find(
        opt =>
          opt.label.toLowerCase() === (data.profile_name || '').toLowerCase(),
      );
      if (foundFilter) {
        setSelectedFilter(foundFilter);
      } else if (data.profile_name) {
        setSelectedFilter({ id: 'other', label: data.profile_name });
      }
    }
  }, [type, data, filterOptions]);

  const handleSave = async () => {
    if (!userId) {
      if (Platform.OS === 'android') {
        showToast(ToastMessages.NewAddressScreen.loginToSaveAddress);
      } else {
        showToast(ToastMessages.NewAddressScreen.loginToSaveAddress);
      }
      return;
    }

    if (!houseNo || !streetName) {
      if (Platform.OS === 'android') {
        showToast(ToastMessages.CommonToastMessages.fillRequiredFields);
      } else {
        showToast(ToastMessages.CommonToastMessages.fillRequiredFields);
      }
      return;
    }

    try {
      setLoading(true);
      const payload = {
        user_id: String(userId),
        profile_name: selectedFilter.label,
        s_address: houseNo,
        s_address_2: streetName,
        s_city: landMark || 'Malta',
        s_country: 'MT',
        s_zipcode: '1234',
        // Use existing names if editing, otherwise fallback
        firstname: data?.s_firstname || data?.firstname || 'User',
        lastname: data?.s_lastname || data?.lastname || '',
        s_firstname: data?.s_firstname || data?.firstname || 'User',
        s_lastname: data?.s_lastname || data?.lastname || '',
      };

      let response;
      if (type === 'edit' && data?.profile_id) {
        response = await axios.put(
          API_ENDPOINTS.UPDATE_USER(data.profile_id),
          payload,
        );
      } else {
        response = await axios.post(API_ENDPOINTS.CREATE_USER, payload);
      }

      if (response.data) {
        const msg =
          type === 'edit'
            ? ToastMessages.NewAddressScreen.addressUpdated
            : ToastMessages.NewAddressScreen.addressSaved;
        if (Platform.OS === 'android') {
          showToast(msg);
        }
        goBack();
      }
    } catch (error: any) {
      console.error('Error saving address:', error.message);
      if (Platform.OS === 'android') {
        showToast(ToastMessages.CommonToastMessages.saveAddressFailed);
      } else {
        showToast(ToastMessages.CommonToastMessages.saveAddressFailed);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    // <SafeAreaView style={{flex: 1}} edges={['bottom']}>
    <ScreenWrapper
      backgroundColor={ColorPalette.WHITE}
      edges={['top', 'bottom']}>
      <Header
        name={type === 'edit' ? 'Edit address' : 'Add new address'}
        variant={TypographyVariant.H6_MEDIUM}
        textColor={ColorPalette.TEXT_GREY_500}
        leftIcon={
          <ArrowLeftIcon style={undefined} onPress={goBack} size={22} />
        }
      // rightIcons={[
      //   {
      //     icon: QuestionMarkIcon,
      //     onPress: () => console.log('Search pressed'),
      //     size: 24,
      //     color: ColorPalette.TEXT_GREY_400,
      //     strokeWidth: 2,
      //   },
      // ]}
      />
      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: getScreenHeight(4) },
        ]}
        showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../../../assets/images/maps.png')}
            style={styles.image}
          />
        </View>
        <View style={styles.currentLocation}>
          <View style={styles.locationText}>
            <View style={styles.rowContainer}>
              <LocationPinIcon style={undefined} size={16} />
              <Typography
                text="Zebbug"
                variant={TypographyVariant.H6_MEDIUM}
                customTextStyles={{ color: ColorPalette.TEXT_GREY_500 }}
              />
            </View>
            <Typography
              text="10 Triq San Pawl , Valletta, Malta"
              variant={TypographyVariant.PSMALL_REGULAR}
              customTextStyles={{ color: ColorPalette.TEXT_GREY_100 }}
            />
          </View>
          <Button
            text="Change"
            size={ButtonSize.SMALL}
            variant={ButtonVariant.PRIMARY}
            state={ButtonState.DEFAULT}
            type={ButtonType.OUTLINED}
            customStyles={{
              borderRadius: Spacing.Small,
              borderColor: ColorPalette.ROSE_PURPLE_300,
              borderWidth: 1.5,
            }}
            customTextStyles={{ color: ColorPalette.ROSE_PURPLE_300 }}
            onPress={undefined}
          />
        </View>
        <View style={styles.textInputContainer}>
          <Typography
            text="Enter complete address"
            variant={TypographyVariant.H6_MEDIUM}
            customTextStyles={{
              color: ColorPalette.TEXT_GREY_500,
              paddingHorizontal: getScreenWidth(4),
            }}
          />
          <AnimatedTextInput
            label="House No. & Floor*"
            value={houseNo}
            onChangeText={setHouseNo}
            keyboardType="default"
            showCountrySection={false}
            customContainerStyles={{ paddingHorizontal: getScreenWidth(4) }}
          />
          <AnimatedTextInput
            label="Street Name*"
            value={streetName}
            onChangeText={setStreetName}
            keyboardType="default"
            showCountrySection={false}
            customContainerStyles={{ paddingHorizontal: getScreenWidth(4) }}
          />
          <AnimatedTextInput
            label="Landmark & Area Name (Optional)"
            value={landMark}
            onChangeText={setLandMark}
            keyboardType="default"
            showCountrySection={false}
            customContainerStyles={{ paddingHorizontal: getScreenWidth(4) }}
          />
        </View>
        <View style={styles.labelContainer}>
          <Typography
            text="Add Address Label"
            variant={TypographyVariant.H6_MEDIUM}
            customTextStyles={{ color: ColorPalette.TEXT_GREY_500 }}
          />
          <View style={styles.badgeContainer}>
            <SlidingBar
              options={filterOptions}
              selectedOption={selectedFilter}
              onOptionSelect={setSelectedFilter}
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottomSection}>
        <Button
          text={type === 'edit' ? 'Update Address' : 'Save Address'}
          onPress={handleSave}
          variant={ButtonVariant.PRIMARY}
          state={loading ? ButtonState.LOADING : ButtonState.DEFAULT}
          size={ButtonSize.MEDIUM}
          customStyles={[{ borderRadius: Spacing.Medium }]}
          withShadow
          bgColor={ColorPalette.ROSE_PURPLE_300}
        />
      </View>
    </ScreenWrapper>
  );
};

export default NewAddress;
