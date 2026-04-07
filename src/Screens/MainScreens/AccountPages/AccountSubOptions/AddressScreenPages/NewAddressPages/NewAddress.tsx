import React, { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  PermissionsAndroid,
  Platform,
  ScrollView,
  View,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { requestLocationPermission } from '../../../../../../services/LocationService';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import ArrowLeftIcon from '../../../../../../assets/icons/ArrowLeft';
import LocationPinIcon from '../../../../../../assets/icons/LocationPinIcon';
import QuestionMarkIcon from '../../../../../../assets/icons/QuestionMarkIcon';
import { Header } from '../../../../../../components/CustomComponents/Header/Header';
import { SlidingBar } from '../../../../../../components/CustomComponents/SlidingBar/SlidingBar';
import {
  Button,
  ButtonSize,
  ButtonState,
  ButtonType,
  ButtonVariant,
} from '../../../../../../components/MainComponents/Button';
import AnimatedTextInput from '../../../../../../components/MainComponents/TextInput/TextInput';
import { Typography } from '../../../../../../components/MainComponents/Typography/Typography';
import { TypographyVariant } from '../../../../../../components/MainComponents/Typography/Typography.types';
import ColorPalette from '../../../../../../config/ColorPalette';
import { Spacing } from '../../../../../../config/globalStyles';
import {
  getScreenHeight,
  getScreenWidth,
} from '../../../../../../helpers/screenSize';
import { goBack } from '../../../../../../utils/navigationref';
import { styles } from './NewAddress.styles';
import ScreenWrapper from '../../../../../../components/CustomComponents/ScreenWrapper/ScreenWrapper';

const NewAddress = () => {
  const [houseNo, setHouseNo] = useState('');
  const [streetName, setStreetName] = useState('');
  const [landMark, setLandMark] = useState('');
  const [currentPosition, setCurrentPosition] = useState<{
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);

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
    const fetchLocation = async () => {
      setLoading(true);
      const hasPermission = await requestLocationPermission();

      if (hasPermission) {
        Geolocation.getCurrentPosition(
          position => {
            setCurrentPosition({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            });
            setLoading(false);
          },
          error => {
            console.log('Location Error:', error.code, error.message);
            // Retry with low accuracy if high accuracy fails
            Geolocation.getCurrentPosition(
              pos => {
                setCurrentPosition({
                  latitude: pos.coords.latitude,
                  longitude: pos.coords.longitude,
                  latitudeDelta: 0.005,
                  longitudeDelta: 0.005,
                });
                setLoading(false);
              },
              err => {
                console.log('Low Accuracy Error:', err);
                setLoading(false);
              },
              {
                enableHighAccuracy: false,
                timeout: 15000,
                maximumAge: 10000,
              },
            );
          },
          {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 10000,
            forceRequestLocation: true,
            showLocationDialog: true,
          },
        );
      } else {
        setLoading(false);
      }
    };

    fetchLocation();
  }, []);

  return (
    // <SafeAreaView style={{flex: 1}} edges={['bottom']}>
    <ScreenWrapper
      backgroundColor={ColorPalette.WHITE}
      edges={['top', 'bottom']}>
      <Header
        name="Add new address"
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
          {loading ? (
            <ActivityIndicator
              size="large"
              color={ColorPalette.ROSE_PURPLE_300}
            />
          ) : currentPosition ? (
            <MapView
              provider={PROVIDER_GOOGLE}
              style={{ width: '100%', height: '100%' }}
              initialRegion={currentPosition}
              showsUserLocation={true}
              followsUserLocation={true}>
              <Marker coordinate={currentPosition} />
            </MapView>
          ) : (
            <Image
              source={require('../../../../../../assets/images/maps.png')}
              style={styles.image}
            />
          )}
        </View>
        <View style={styles.currentLocation}>
          <View style={styles.locationText}>
            <View style={styles.rowContainer}>
              <LocationPinIcon style={undefined} size={16} />
              <Typography
                text="Current Location"
                variant={TypographyVariant.H6_MEDIUM}
                customTextStyles={{ color: ColorPalette.TEXT_GREY_500 }}
              />
            </View>
            <Typography
              text={
                currentPosition
                  ? `Lat: ${currentPosition.latitude.toFixed(
                    4,
                  )}, Lon: ${currentPosition.longitude.toFixed(4)}`
                  : 'Location not available'
              }
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
          text="Save Address"
          onPress={goBack}
          variant={ButtonVariant.PRIMARY}
          state={ButtonState.DEFAULT}
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
