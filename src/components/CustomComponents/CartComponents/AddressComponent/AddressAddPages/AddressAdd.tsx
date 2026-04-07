import React, { useState } from 'react';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../../../Header/Header';
import { TypographyVariant } from '../../../../MainComponents/Typography/Typography.types';
import ColorPalette from '../../../../../config/ColorPalette';
import { goBack } from '../../../../../utils/navigationref';
import QuestionMarkIcon from '../../../../../assets/icons/QuestionMarkIcon';
import ArrowLeftIcon from '../../../../../assets/icons/ArrowLeft';
import {
  getScreenHeight,
  getScreenWidth,
} from '../../../../../helpers/screenSize';
import { styles } from './AddressAdd.styles';
import { Typography } from '../../../../MainComponents/Typography/Typography';
import AnimatedTextInput from '../../../../MainComponents/TextInput/TextInput';
import LockIcon from '../../../../../assets/icons/LockIcon';
import {
  Button,
  ButtonSize,
  ButtonState,
  ButtonType,
  ButtonVariant,
} from '../../../../MainComponents/Button';
import { Spacing } from '../../../../../config/globalStyles';
import ScreenWrapper from '../../../ScreenWrapper/ScreenWrapper';

const INITIAL_COUNTRY_CODE = '+356';
const MALTA_FLAG_URL =
  'https://cdn.countryflags.com/thumbs/malta/flag-round-250.png';

const AddressAdd = () => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState(INITIAL_COUNTRY_CODE);
  const [house, setHouse] = useState('');
  const [roadName, setRoadName] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [city, setCity] = useState('');
  const [landMark, setLandMark] = useState('');
  const [country, setCountry] = useState('Malta');

  const handleSaveAddress = () => {
    console.log('Save Address');
    goBack();
  };

  return (
    // <SafeAreaView style={{flex: 1}} edges={['bottom']}>
    <ScreenWrapper
      backgroundColor={ColorPalette.WHITE}
          edges={['top', 'bottom']}
    >
      <Header
        name="Add new address"
        variant={TypographyVariant.H6_SEMIBOLD}
        textColor={ColorPalette.AgreeTerms}
        leftIcon={
          <ArrowLeftIcon style={undefined} size={22} onPress={goBack} />
        }
        // rightIcons={[
        //   {
        //     icon: QuestionMarkIcon,
        //     color: ColorPalette.TEXT_GREY_400,
        //     size: 24,
        //   },
        // ]}
      />
      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: getScreenHeight(15) },
        ]}
        showsVerticalScrollIndicator={false}>
        <View style={styles.firstContainer}>
          <Typography
            text="Contact Details"
            variant={TypographyVariant.H6_SEMIBOLD}
            customTextStyles={{
              color: ColorPalette.TEXT_GREY_500,
              paddingHorizontal: getScreenWidth(4),
            }}
          />
          <View style={styles.inputContainer}>
            <AnimatedTextInput
              label="Full name"
              value={fullName}
              onChangeText={setFullName}
              keyboardType="default"
              showCountrySection={false}
              customContainerStyles={{ paddingHorizontal: getScreenWidth(4) }}
            />
            <AnimatedTextInput
              label="Whatsapp Number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
              showCountrySection
              countryCode={countryCode}
              countryFlag={MALTA_FLAG_URL}
              customContainerStyles={{ paddingHorizontal: getScreenWidth(4) }}
            />
          </View>
        </View>
        <View style={styles.firstContainer}>
          <Typography
            text="Address"
            variant={TypographyVariant.H6_SEMIBOLD}
            customTextStyles={{
              color: ColorPalette.TEXT_GREY_500,
              paddingHorizontal: getScreenWidth(4),
            }}
          />
          <View style={styles.inputContainer}>
            <AnimatedTextInput
              label="House no./ Building Name"
              value={house}
              onChangeText={setHouse}
              keyboardType="default"
              showCountrySection={false}
              customContainerStyles={{ paddingHorizontal: getScreenWidth(4) }}
            />
            <AnimatedTextInput
              label="Road Name / Area / Colony"
              value={roadName}
              onChangeText={setRoadName}
              keyboardType="default"
              showCountrySection={false}
              customContainerStyles={{ paddingHorizontal: getScreenWidth(4) }}
            />
            <AnimatedTextInput
              label="Pincode"
              value={pinCode}
              onChangeText={setPinCode}
              keyboardType="number-pad"
              showCountrySection={false}
              customContainerStyles={{ paddingHorizontal: getScreenWidth(4) }}
            />
            <AnimatedTextInput
              label="City"
              value={city}
              onChangeText={setCity}
              keyboardType="default"
              showCountrySection={false}
              customContainerStyles={{ paddingHorizontal: getScreenWidth(4) }}
            />
            <AnimatedTextInput
              label="Landmark/Shop/School etc.(optional)"
              value={landMark}
              onChangeText={setLandMark}
              keyboardType="default"
              showCountrySection={false}
              customContainerStyles={{ paddingHorizontal: getScreenWidth(4) }}
            />
            <AnimatedTextInput
              label="Country"
              value={country}
              onChangeText={setCountry}
              keyboardType="default"
              showCountrySection
              countryFlag={MALTA_FLAG_URL}
              onCountryPress={() => { }}
              customBorderWidth={1}
              disabled={true}
              rightIcons={[
                {
                  icon: (
                    <LockIcon size={20} color="#4A4A4A" style={undefined} />
                  ),
                  onPress: () => { },
                },
              ]}
              customContainerStyles={{ paddingHorizontal: getScreenWidth(4) }}
            />
          </View>
        </View>
      </ScrollView>

      {/* Bottom Button Container */}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: ColorPalette.WHITE,
          paddingHorizontal: getScreenWidth(4),
          paddingVertical: getScreenHeight(2),
        }}>
        <Button
          text="Save & Continue"
          variant={ButtonVariant.PRIMARY}
          size={ButtonSize.LARGE}
          type={ButtonType.PRIMARY}
          onPress={handleSaveAddress}
          state={ButtonState.DEFAULT}
          customStyles={{
            borderRadius: Spacing.Medium,
          }}
          bgColor={ColorPalette.ROSE_PURPLE_300}
        />
      </View>
    </ScreenWrapper>
    );
};

export default AddressAdd;
