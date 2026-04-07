import {
  useFocusEffect,
  useRoute,
  useNavigation,
} from '@react-navigation/native';
import React, {useState, useEffect, useCallback} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  View,
  ActivityIndicator,
  Platform,
  ToastAndroid,
} from 'react-native';
import axios from 'axios';
import ArrowLeft from '../../../../../assets/icons/ArrowLeft';
import {Header} from '../../../../../components/CustomComponents/Header/Header';
import AnimatedTextInput from '../../../../../components/MainComponents/TextInput/TextInput';
import {Typography} from '../../../../../components/MainComponents/Typography/Typography';
import {TypographyVariant} from '../../../../../components/MainComponents/Typography/Typography.types';
import ColorPalette from '../../../../../config/ColorPalette';
import {API_ENDPOINTS, AUTH_HEADER} from '../../../../../config/ApiConfig';
import {Alert} from 'react-native';
import {
  getScreenHeight,
  getScreenWidth,
} from '../../../../../helpers/screenSize';
import {goBack, navigate} from '../../../../../utils/navigationref';
import {styles} from './PerosanlInfo.styles';
import {MenuItem} from '../../../../../components/CustomComponents/MenuItem/MenuItem';
import ArrowRightIcon from '../../../../../assets/icons/ArrowRightIcon';
import {BorderRadius, Spacing} from '../../../../../config/globalStyles';
import DeleteIcon from '../../../../../assets/icons/DeleteIcon';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../../../../store';
import {ConfirmationModal} from '../../../../../components/CustomComponents/ConfirmationModal/ConfirmationModal';
import {logout} from '../../../../../store/slices/authSlice';
import ScreenWrapper from '../../../../../components/CustomComponents/ScreenWrapper/ScreenWrapper';
import {
  Button,
  ButtonSize,
  ButtonState,
  ButtonType,
  ButtonVariant,
} from '../../../../../components/MainComponents/Button';
import Toast from 'react-native-toast-message';
import {Badge} from '../../../../../components/MainComponents/Badges/Badge';
import {
  BadgeType,
  BadgeVariant,
} from '../../../../../components/MainComponents/Badges/Badge.types';
import {SelectCountryModal} from '../../../../../components/CustomComponents/SelectCountryModal/SelectCountryModal';
import {showToast} from '../../../../../components/MainComponents/Toast/ToastHelper';
import {ToastMessages} from '../../../../../components/MainComponents/Toast/ToastMessages';

const INITIAL_COUNTRY_CODE = '+356';
const MALTA_FLAG_URL =
  'https://cdn.countryflags.com/thumbs/malta/flag-round-250.png';

const COUNTRY_FLAGS: Record<string, string> = {
  '+356': MALTA_FLAG_URL,
  '+91': 'https://cdn.countryflags.com/thumbs/india/flag-round-250.png',
  '+971':
    'https://cdn.countryflags.com/thumbs/united-arab-emirates/flag-round-250.png',
  '+44':
    'https://cdn.countryflags.com/thumbs/united-kingdom/flag-round-250.png',
  '+61': 'https://cdn.countryflags.com/thumbs/australia/flag-round-250.png',
  '+1': 'https://cdn.countryflags.com/thumbs/united-states-of-america/flag-round-250.png',
};

const PersonalInfo = () => {
  const route = useRoute();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  // Dispatching Address (S fields)
  const [address, setAddress] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [stateName, setStateName] = useState('');
  const [country, setCountry] = useState('');
  const [zipcode, setZipcode] = useState('');

  // Billing Address (B fields)
  const [bAddress, setBAddress] = useState('');
  const [bAddress2, setBAddress2] = useState('');
  const [bCity, setBCity] = useState('');
  const [bStateName, setBStateName] = useState('');
  const [bCountry, setBCountry] = useState('');
  const [bZipcode, setBZipcode] = useState('');

  const [fullProfile, setFullProfile] = useState<any>(null);

  const [initialPhoneNumber, setInitialPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState(INITIAL_COUNTRY_CODE);
  const [countryFlag, setCountryFlag] = useState(MALTA_FLAG_URL);
  const [shippingAddressType, setShippingAddressType] = useState('residential');
  const [initialEmail, setInitialEmail] = useState('');

  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [pendingSave, setPendingSave] = useState(false);
  const navigation = useNavigation<any>();
  const userId = useSelector((state: RootState) => state.auth.userId);
  const dispatch = useDispatch();

  const fetchProfile = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const response = await axios.get(API_ENDPOINTS.USER_PROFILE(userId));
      if (response.data && response.data.profile) {
        const profile = response.data.profile;

        //personal info
        setFullProfile(profile);
        setFirstName(profile.firstname);
        setLastName(profile.lastname);

        //contact info
        setEmail(profile.email);
        setInitialEmail(profile.email);

        // Parse phone: strip country code prefix for display
        const rawPhone = profile.phone || '';
        // Country codes to detect (longest digit-sequences first to avoid partial matches)
        const knownCodes = ['971', '356', '91', '44', '61', '1'];
        let detectedCode = INITIAL_COUNTRY_CODE;
        let localNumber = rawPhone;

        // Normalize: strip leading '+' for matching
        const normalized = rawPhone.startsWith('+')
          ? rawPhone.substring(1)
          : rawPhone;
        for (const digits of knownCodes) {
          if (normalized.startsWith(digits)) {
            detectedCode = `+${digits}`;
            localNumber = normalized.substring(digits.length);
            break;
          }
        }

        setPhoneNumber(localNumber);
        setCountryCode(detectedCode);
        setCountryFlag(COUNTRY_FLAGS[detectedCode] || MALTA_FLAG_URL);
        setInitialPhoneNumber(rawPhone);

        // shipping address fields
        setAddress(profile.s_address || '');
        setAddress2(profile.s_address_2 || '');
        setCity(profile.s_city || '');
        setStateName(profile.s_state || '');
        setCountry(profile.s_country_descr || '');
        setZipcode(profile.s_zipcode || '');
        setShippingAddressType(profile.s_address_type || '');

        // Billing address fields
        setBAddress(profile.b_address || '');
        setBAddress2(profile.b_address_2 || '');
        setBCity(profile.b_city || '');
        setBStateName(profile.b_state || '');
        setBCountry(profile.b_country_descr || '');
        setBZipcode(profile.b_zipcode || '');
      }
    } catch (error) {
      console.error('Error fetching user profile in PersonalInfo:', error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    // Skip initial fetch if we are returning from OTP (params will have data)
    const params = route.params as any;
    if (!params?.otpVerified) {
      fetchProfile();
    }
  }, [fetchProfile, route.params]);

  useEffect(() => {
    const params = route.params as any;
    if (params?.otpVerified && params?.returnData) {
      const data = params.returnData;
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setEmail(data.email);
      setPhoneNumber(data.phoneNumber);
      setCountryCode(data.countryCode);
      setCountryFlag(data.countryFlag);
      setAddress(data.address);
      setAddress2(data.address2);
      setCity(data.city);
      setZipcode(data.zipcode);
      setCountry(data.country);
      setShippingAddressType(data.shippingAddressType);

      // Directly update initialPhoneNumber to prevent OTP triggering again for the same number
      setInitialPhoneNumber(
        data.phoneNumber.startsWith('+')
          ? data.phoneNumber
          : `${data.countryCode}${data.phoneNumber}`.replace(/\D/g, ''),
      );

      setInitialEmail(data.email);

      // Schedule save after state updates settle
      setPendingSave(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.params]);

  useEffect(() => {
    if (pendingSave) {
      setPendingSave(false);
      handleSaveProfile(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingSave]);

  const handleCountryPress = useCallback(() => {
    setIsModalVisible(true);
  }, []);

  const handleCountryCode = async (newCode: any, newFlag: any) => {
    try {
      setCountryCode(newCode);
      setCountryFlag(newFlag);
    } catch (error: any) {
      console.error('OrderDetail - Failed to update status:', error);
    }
  };

  const handleConfirmDelete = async () => {
    if (!userId) return;
    try {
      setLoading(true);
      const response = await axios.delete(
        API_ENDPOINTS.DELETE_PROFILE(userId),
        {
          headers: {
            Authorization: AUTH_HEADER,
          },
        },
      );

      if (response.data && response.data.result === true) {
        setDeleteModalVisible(false);
        setLoading(false);
        Alert.alert(
          'Success',
          response.data.message || 'Account deleted successfully',
          [
            {
              text: 'OK',
              onPress: () => {
                dispatch(logout());
                navigate('Authentication', {
                  screen: 'WhatsAppAndEmailLogInScreen',
                });
              },
            },
          ],
        );
      } else {
        setLoading(false);
        showToast(
          ToastMessages.PersonalInfoScreen.deleteAccountFailed(
            response.data?.message,
          ),
          'error',
        );
      }
    } catch (error: any) {
      setLoading(false);
      console.error('Error deleting account:', error.message);
      showToast(ToastMessages.PersonalInfoScreen.deleteAccountError, 'error');
    }
  };

  const handleSaveProfile = async (isVerified = false) => {
    try {
      if (!userId) return;

      const formattedPhone = `${countryCode.replace(
        /\D/g,
        '',
      )}${phoneNumber.replace(/\D/g, '')}`;

      const digitsOnlyNew = formattedPhone.replace(/\D/g, '');
      const digitsOnlyInitial = initialPhoneNumber.replace(/\D/g, '');

      console.log('=== SAVE PROFILE DEBUG ===');
      console.log('isVerified:', isVerified);
      console.log('phoneNumber (raw):', phoneNumber);
      console.log('countryCode:', countryCode);
      console.log('formattedPhone:', formattedPhone);
      console.log('initialPhoneNumber:', initialPhoneNumber);
      console.log('digitsOnlyNew:', digitsOnlyNew);
      console.log('digitsOnlyInitial:', digitsOnlyInitial);
      console.log('are they different?', digitsOnlyNew !== digitsOnlyInitial);

      const emailChanged = email !== initialEmail;
      const phoneChanged = digitsOnlyNew !== digitsOnlyInitial;

      if (!isVerified && emailChanged && phoneChanged) {
        showToast('Please change Contact information one by one', 'error');
        return;
      }

      // Trigger OTP if email changed and not yet verified
      if (!isVerified && email !== initialEmail) {
        try {
          setLoading(true);
          const {
            sendEmailOtpForSignup,
          } = require('../../../../../services/AuthService');
          console.log('Sending OTP for email update to:', email);
          const response = await sendEmailOtpForSignup(email);

          if (response.generated_otp || response.message === 'Success') {
            navigation.navigate('OTPScreen', {
              email: email,
              flow: 'profile_update',
              screenType: 'createAccount', // Use this to differentiate from legacy Auth flow
              verificationMethod: 'email',
              returnScreen: 'PersonalInfo',
              returnData: {
                firstName,
                lastName,
                email,
                phoneNumber,
                countryCode,
                countryFlag,
                address,
                address2,
                city,
                zipcode,
                country,
                shippingAddressType,
              },
            });
            return;
          } else {
            Alert.alert('Error', response.message || 'Failed to send OTP');
            return;
          }
        } catch (otpErr) {
          console.error('Email OTP Send Error:', otpErr);
          Alert.alert('Error', 'Failed to initiate email verification');
          return;
        } finally {
          setLoading(false);
        }
      }

      // Trigger OTP if phone changed and not yet verified
      if (!isVerified && digitsOnlyNew !== digitsOnlyInitial) {
        try {
          setLoading(true);
          const {
            sendWhatsAppOtpForSignup,
          } = require('../../../../../services/AuthService');
          console.log('Sending OTP for profile update to:', formattedPhone);
          const response = await sendWhatsAppOtpForSignup(formattedPhone);

          if (response.generated_otp || response.message === '') {
            navigation.navigate('OTPScreen', {
              phoneNumber: formattedPhone,
              flow: 'profile_update',
              screenType: 'whatsapp',
              returnScreen: 'PersonalInfo',
              returnData: {
                firstName,
                lastName,
                email,
                phoneNumber,
                countryCode,
                countryFlag,
                address,
                address2,
                city,
                zipcode,
                country,
                shippingAddressType,
              },
            });
            return;
          } else {
            Alert.alert('Error', response.message || 'Failed to send OTP');
            return;
          }
        } catch (otpErr) {
          console.error('OTP Send Error:', otpErr);
          Alert.alert('Error', 'Failed to initiate verification');
          return;
        } finally {
          setLoading(false);
        }
      }

      setLoading(true);
      Toast.show({
        type: 'appToast',
        text1: `Saving Profile Changes`,
        props: {variant: 'loading'},
        position: 'bottom',
        autoHide: true,
        visibilityTime: 2000,
      });

      const payload = {
        user_id: userId,
        user_data: {
          ...fullProfile,

          // ✅ Basic Info (Corrected field names for API)
          firstname: firstName,
          lastname: lastName,
          email,
          phone: formattedPhone,

          // ✅ Dispatching Address (S)
          s_address: address,
          s_address_2: address2,
          s_city: city,
          s_state: stateName,
          s_zipcode: zipcode,
          s_address_type: shippingAddressType,

          // ⚠️ API expects country CODE not descr
          s_country: fullProfile?.s_country || 'MT',

          // ✅ Billing Address (B)
          b_address: bAddress,
          b_address_2: bAddress2,
          b_city: bCity,
          b_state: bStateName,
          b_zipcode: bZipcode,

          // ⚠️ API expects country CODE not descr
          b_country: fullProfile?.b_country || 'MT',
        },
      };

      const response = await axios.put(
        API_ENDPOINTS.NT_USERS_ACCOUNT_API(userId),
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: AUTH_HEADER,
          },
        },
      );

      if (response.data?.result) {
        await fetchProfile(); // Refresh UI with actual server data
        Toast.show({
          type: 'appToast',
          text1: `Profile Updated Successfully`,
          props: {variant: 'success'},
          position: 'bottom',
          autoHide: true,
          visibilityTime: 2000,
        });
      } else {
        Toast.show({
          type: 'appToast',
          text1: `Error Saving Profile`,
          props: {variant: 'error'},
          position: 'bottom',
          autoHide: true,
          visibilityTime: 2000,
        });
      }
    } catch (error: any) {
      Toast.show({
        type: 'appToast',
        text1: `Error Saving Profile`,
        props: {variant: 'error'},
        position: 'bottom',
        autoHide: true,
        visibilityTime: 2000,
      });

      console.error('Error saving profile:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper
      backgroundColor={ColorPalette.WHITE}
      edges={['top', 'bottom']}>
      <Header
        name="Edit Profile"
        variant={TypographyVariant.H6_MEDIUM}
        textColor={ColorPalette.AgreeTerms as string}
        leftIcons={[
          {
            icon: ArrowLeft as any,
            size: 22,
            onPress: () => navigation.goBack(),
            color: ColorPalette.AgreeTerms as string,
          },
        ]}
        rightIcons={[]}
      />
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color={ColorPalette.PRIMARY} />
        </View>
      ) : (
        <View style={{flex: 1}}>
          <ScrollView
            style={[styles.mainContainer, {flex: 1}]}
            contentContainerStyle={[styles.scrollContent]}
            showsVerticalScrollIndicator={false}>
            <View style={styles.mainContainerTwo}>
              <View style={{gap: Spacing.Small}}>
                <Typography
                  text="Personal Information"
                  variant={TypographyVariant.LMEDIUM_MEDIUM}
                  customTextStyles={{
                    color: ColorPalette.TEXT_GREY_300,
                    paddingVertical: getScreenHeight(0.1),
                    paddingHorizontal: getScreenWidth(4),
                  }}
                />
                <View style={styles.sectionContainer}>
                  <AnimatedTextInput
                    label="First name"
                    value={firstName}
                    onChangeText={setFirstName}
                    keyboardType="default"
                    customContainerStyles={{
                      paddingHorizontal: getScreenWidth(4),
                      marginVertical: Spacing.Small,
                    }}
                  />
                  <AnimatedTextInput
                    label="Last name"
                    value={lastName}
                    onChangeText={setLastName}
                    keyboardType="default"
                    customContainerStyles={{
                      paddingHorizontal: getScreenWidth(4),
                      marginVertical: Spacing.Small,
                    }}
                  />
                </View>
              </View>

              <View style={{gap: Spacing.Small}}>
                <Typography
                  text="Contact Information"
                  variant={TypographyVariant.LMEDIUM_MEDIUM}
                  customTextStyles={{
                    color: ColorPalette.TEXT_GREY_300,
                    paddingVertical: getScreenHeight(0.1),
                    paddingHorizontal: getScreenWidth(4),
                  }}
                />
                <View style={styles.sectionContainer}>
                  <AnimatedTextInput
                    label="Email ID"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="default"
                    customContainerStyles={{
                      paddingHorizontal: getScreenWidth(4),
                      marginVertical: Spacing.Small,
                    }}
                  />
                  <AnimatedTextInput
                    label="WhatsApp number"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    keyboardType="phone-pad"
                    showCountrySection={true}
                    countryCode={countryCode}
                    countryFlag={countryFlag}
                    onCountryPress={handleCountryPress}
                    customContainerStyles={{
                      paddingHorizontal: getScreenWidth(4),
                      marginVertical: Spacing.Small,
                    }}
                  />
                </View>
              </View>

              <View style={{gap: Spacing.Small}}>
                <Typography
                  text="Shipping Address"
                  variant={TypographyVariant.LMEDIUM_MEDIUM}
                  customTextStyles={{
                    color: ColorPalette.TEXT_GREY_300,
                    paddingVertical: getScreenHeight(0.1),
                    paddingHorizontal: getScreenWidth(4),
                  }}
                />
                <View style={styles.sectionContainer}>
                  <AnimatedTextInput
                    label="Flat and Floor Number"
                    value={address}
                    onChangeText={setAddress}
                    keyboardType="default"
                    customContainerStyles={{
                      paddingHorizontal: getScreenWidth(4),
                      marginVertical: Spacing.Small,
                    }}
                  />
                  <AnimatedTextInput
                    label="Street Name"
                    value={address2}
                    onChangeText={setAddress2}
                    keyboardType="default"
                    customContainerStyles={{
                      paddingHorizontal: getScreenWidth(4),
                      marginVertical: Spacing.Small,
                    }}
                  />
                  <View style={{flexDirection: 'row', gap: getScreenWidth(4)}}>
                    <AnimatedTextInput
                      label="City"
                      value={city}
                      onChangeText={setCity}
                      keyboardType="default"
                      customContainerStyles={{
                        flex: 1,
                        paddingLeft: getScreenWidth(4),
                        marginVertical: Spacing.Small,
                      }}
                    />
                    <AnimatedTextInput
                      label="Postal Code"
                      value={zipcode}
                      onChangeText={setZipcode}
                      keyboardType="default"
                      customContainerStyles={{
                        flex: 1,
                        paddingRight: getScreenWidth(4),
                        marginVertical: Spacing.Small,
                      }}
                    />
                  </View>
                  {/* <AnimatedTextInput
                  label="State"
                  value={stateName}
                  onChangeText={setStateName}
                  keyboardType="default"
                  customLabelColorFocused={ColorPalette.TEXT_GREY_400 as string}
                  customLabelColorUnfocused={ColorPalette.TEXT_GREY_400 as string}
                  // rightText="Edit"
                  // onRightTextPress={() => handleEditState(false)}
                  customBorderColor={ColorPalette.TEXT_GREY_400 as string}
                  customBorderWidth={1}
                  customContainerStyles={{
                    paddingHorizontal: getScreenWidth(4),
                    marginVertical: Spacing.Small,
                  }}
                /> */}
                  <AnimatedTextInput
                    label="Country"
                    value={country}
                    onChangeText={setCountry}
                    keyboardType="default"
                    customContainerStyles={{
                      paddingHorizontal: getScreenWidth(4),
                      marginVertical: Spacing.Small,
                    }}
                  />
                  {/* Address Type Section */}
                  <View
                    style={{
                      marginVertical: Spacing.XSmall,
                      paddingHorizontal: getScreenWidth(4),
                    }}>
                    <Typography
                      text="Address Type"
                      variant={TypographyVariant.LMEDIUM_MEDIUM}
                      customTextStyles={{
                        color: ColorPalette.TEXT_GREY_300,
                        marginBottom: Spacing.Small,
                        paddingHorizontal: getScreenWidth(4),
                      }}
                    />

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        gap: getScreenWidth(3),
                      }}>
                      {/* Home */}
                      <Badge
                        text="Home"
                        onPress={() => setShippingAddressType('residential')}
                        textVariant={TypographyVariant.PSMALL_REGULAR}
                        customContainerStyle={[
                          styles.badge,
                          {
                            backgroundColor:
                              shippingAddressType === 'residential'
                                ? ColorPalette.BLACK
                                : ColorPalette.BACKGROUND_GREY_100,
                          },
                        ]}
                        customTextStyles={{
                          textAlign: 'center',
                          color:
                            shippingAddressType === 'residential'
                              ? ColorPalette.WHITE
                              : ColorPalette.TEXT_GREY_500,
                        }}
                      />

                      {/* Office */}
                      <Badge
                        text="Office"
                        onPress={() => setShippingAddressType('office')}
                        textVariant={TypographyVariant.PSMALL_REGULAR}
                        customContainerStyle={[
                          styles.badge,
                          {
                            backgroundColor:
                              shippingAddressType === 'office'
                                ? ColorPalette.BLACK
                                : ColorPalette.BACKGROUND_GREY_100,
                          },
                        ]}
                        customTextStyles={{
                          textAlign: 'center',
                          color:
                            shippingAddressType === 'office'
                              ? ColorPalette.WHITE
                              : ColorPalette.TEXT_GREY_500,
                        }}
                      />
                    </View>
                  </View>
                </View>
              </View>

              <View style={{gap: Spacing.Small}}>
                <Typography
                  text="Billing Address"
                  variant={TypographyVariant.LMEDIUM_MEDIUM}
                  customTextStyles={{
                    color: ColorPalette.TEXT_GREY_300,
                    paddingVertical: getScreenHeight(0.1),
                    paddingHorizontal: getScreenWidth(1),
                  }}
                />
                <View style={styles.sectionContainer}>
                  <AnimatedTextInput
                    label="Flat and Floor Number"
                    value={bAddress}
                    onChangeText={setBAddress}
                    keyboardType="default"
                    customLabelColorFocused={
                      ColorPalette.TEXT_GREY_400 as string
                    }
                    customLabelColorUnfocused={
                      ColorPalette.TEXT_GREY_400 as string
                    }
                    // rightText="Edit"
                    // onRightTextPress={() => handleEditAddress(true, false)}
                    customBorderColor={ColorPalette.TEXT_GREY_400 as string}
                    customBorderWidth={1}
                    customContainerStyles={{
                      paddingHorizontal: getScreenWidth(4),
                      marginVertical: Spacing.Small,
                    }}
                  />
                  <View
                    style={{
                      height: 1,
                      backgroundColor: ColorPalette.BACKGROUND_GREY_100,
                      marginVertical: getScreenHeight(0.8),
                    }}
                  />
                  <AnimatedTextInput
                    label="Street Name"
                    value={bAddress2}
                    onChangeText={setBAddress2}
                    keyboardType="default"
                    customLabelColorFocused={
                      ColorPalette.TEXT_GREY_400 as string
                    }
                    customLabelColorUnfocused={
                      ColorPalette.TEXT_GREY_400 as string
                    }
                    // rightText="Edit"
                    // onRightTextPress={() => handleEditAddress(true, true)}
                    customBorderColor={ColorPalette.TEXT_GREY_400 as string}
                    customBorderWidth={1}
                    customContainerStyles={{
                      paddingHorizontal: getScreenWidth(4),
                      marginVertical: Spacing.Small,
                    }}
                  />
                  <View
                    style={{
                      height: 1,
                      backgroundColor: ColorPalette.BACKGROUND_GREY_100,
                      marginVertical: getScreenHeight(0.8),
                    }}
                  />
                  <View style={{flexDirection: 'row', gap: getScreenWidth(4)}}>
                    <AnimatedTextInput
                      label="City"
                      value={bCity}
                      onChangeText={setBCity}
                      keyboardType="default"
                      customLabelColorFocused={
                        ColorPalette.TEXT_GREY_400 as string
                      }
                      customLabelColorUnfocused={
                        ColorPalette.TEXT_GREY_400 as string
                      }
                      // rightText="Edit"
                      // onRightTextPress={() => handleEditCity(true)}
                      customBorderColor={ColorPalette.TEXT_GREY_400 as string}
                      customBorderWidth={1}
                      customContainerStyles={{
                        flex: 1,
                        paddingLeft: getScreenWidth(4),
                        marginVertical: Spacing.Small,
                      }}
                    />
                    <AnimatedTextInput
                      label="Postal Code"
                      value={bZipcode}
                      onChangeText={setBZipcode}
                      keyboardType="default"
                      customLabelColorFocused={
                        ColorPalette.TEXT_GREY_400 as string
                      }
                      customLabelColorUnfocused={
                        ColorPalette.TEXT_GREY_400 as string
                      }
                      // rightText="Edit"
                      // onRightTextPress={() => handleEditZipcode(true)}
                      customBorderColor={ColorPalette.TEXT_GREY_400 as string}
                      customBorderWidth={1}
                      customContainerStyles={{
                        flex: 1,
                        paddingRight: getScreenWidth(4),
                        marginVertical: Spacing.Small,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      height: 1,
                      backgroundColor: ColorPalette.BACKGROUND_GREY_100,
                      marginVertical: getScreenHeight(0.8),
                    }}
                  />
                  {/* <AnimatedTextInput
                  label="State"
                  value={bStateName}
                  onChangeText={setBStateName}
                  keyboardType="default"
                  customLabelColorFocused={ColorPalette.TEXT_GREY_400 as string}
                  customLabelColorUnfocused={ColorPalette.TEXT_GREY_400 as string}
                  // rightText="Edit"
                  // onRightTextPress={() => handleEditState(true)}
                  customBorderColor={ColorPalette.TEXT_GREY_400 as string}
                  customBorderWidth={1}
                  customContainerStyles={{
                    paddingHorizontal: getScreenWidth(4),
                    marginVertical: Spacing.Small,
                  }}
                /> */}
                  <AnimatedTextInput
                    label="Country"
                    value={bCountry}
                    onChangeText={setBCountry}
                    keyboardType="default"
                    customLabelColorFocused={
                      ColorPalette.TEXT_GREY_400 as string
                    }
                    customLabelColorUnfocused={
                      ColorPalette.TEXT_GREY_400 as string
                    }
                    // rightText="Edit"
                    // onRightTextPress={() => handleEditCountry(true)}
                    customBorderColor={ColorPalette.TEXT_GREY_400 as string}
                    customBorderWidth={1}
                    customContainerStyles={{
                      paddingHorizontal: getScreenWidth(4),
                      marginVertical: Spacing.Small,
                    }}
                  />
                </View>
              </View>
            </View>

            {/* <MenuItem
            label="Delete Account"
            variant={TypographyVariant.PMEDIUM_MEDIUM}
            leftIcon={
              <View
                style={{
                  backgroundColor: ColorPalette.WelcomeBack as string,
                  padding: 10,
                  borderRadius: Spacing.Large,
                }}>
                <DeleteIcon
                  color={ColorPalette.RED_400 as string}
                  size={20}
                  style={undefined}
                  onPress={() => { }}
                />
              </View>
            }
            rightIcon={
              <ArrowRightIcon
                style={undefined}
                color={ColorPalette.TEXT_GREY_400 as string}
              />
            }
            onPress={() => setDeleteModalVisible(true)}
            textStyle={{ color: ColorPalette.TEXT_GREY_500 as string }}
            containerStyle={{
              paddingVertical: getScreenHeight(1),
              marginHorizontal: getScreenWidth(4),
              borderRadius: Spacing.Small,
              backgroundColor: ColorPalette.WHITE as string,
            }}
          /> */}
          </ScrollView>
          <View
            style={{
              backgroundColor: ColorPalette.WHITE,
              paddingVertical: getScreenHeight(2),
            }}>
            <Button
              text="Save Changes"
              onPress={() => handleSaveProfile()}
              variant={ButtonVariant.PRIMARY}
              state={ButtonState.DEFAULT}
              size={ButtonSize.MEDIUM}
              bgColor={ColorPalette.ROSE_PURPLE_200 as string}
              customStyles={{
                marginHorizontal: getScreenWidth(4),
                // marginBottom: getScreenHeight(2),
              }}
              customTextStyles={{
                textAlign: 'center',
                // fontFamily: 'Inter',
                // fontSize: 14,
              }}
              withShadow
            />
          </View>
        </View>
      )}
      <ConfirmationModal
        isVisible={isDeleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Account"
        message="Are you sure you want to delete your account? This action is irreversible."
        confirmText="Delete"
        cancelText="Cancel"
      />

      <SelectCountryModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSubmit={(code: string, flag: string) => {
          handleCountryCode(code, flag);
          setIsModalVisible(false);
        }}
        showSearch={true}
      />
    </ScreenWrapper>
  );
};

export default PersonalInfo;
