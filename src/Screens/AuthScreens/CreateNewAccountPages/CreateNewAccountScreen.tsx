import React, { useCallback, useState } from 'react';
import {
  Alert,
  Platform,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import { styles } from './CreateNewAccountScreen.styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { mapApiError } from '../../../utils/ErrorUtils';
import { Header } from '../../../components/CustomComponents/Header/Header';
import { TypographyVariant } from '../../../components/MainComponents/Typography/Typography.types';
import ColorPalette from '../../../config/ColorPalette';
import { goBack, navigate } from '../../../utils/navigationref';
import ArrowLeftIcon from '../../../assets/icons/ArrowLeft';
import { getScreenHeight, getScreenWidth } from '../../../helpers/screenSize';
import { Typography } from '../../../components/MainComponents/Typography/Typography';
import { TextButton } from '../../../components/MainComponents/TextButton';
import { STATIC_TEXT } from '../../../config/staticText';
import {
  Button,
  ButtonSize,
  ButtonState,
  ButtonType,
  ButtonVariant,
} from '../../../components/MainComponents/Button';
import GoogleLogo from '../../../assets/icons/GoogleLogo';
import AnimatedTextInput from '../../../components/MainComponents/TextInput/TextInput';
import { SelectCountryModal } from '../../../components/CustomComponents/SelectCountryModal/SelectCountryModal';
import { COUNTRY_PHONE_CODES } from '../../../components/CustomComponents/SelectCountryModal/SelectCountryModal';
import axios from 'axios';
import { API_ENDPOINTS } from '../../../config/ApiConfig';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { showToast } from '../../../components/MainComponents/Toast/ToastHelper';
import { ToastMessages } from '../../../components/MainComponents/Toast/ToastMessages';

const INITIAL_COUNTRY_CODE = '+356';
const MALTA_FLAG_URL = '🇲🇹';
const createAccountScreenType = STATIC_TEXT.screens.screenType.createAccount;

const CreateNewAccountScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState(INITIAL_COUNTRY_CODE);
  const [countryFlag, setCountryFlag] = useState(MALTA_FLAG_URL);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentStatus, setCurrentStatus] = useState();
  const [selectedMethod, setSelectedMethod] = useState('email');
  const [loading, setLoading] = useState(false);

  const { pageIds } = useSelector((state: RootState) => state.app);

  const handleTermsPress = useCallback(() => {
    if (pageIds?.terms_and_conditions_page) {
      navigate('WebViewScreen' as any, {
        url: pageIds.terms_and_conditions_page,
        title: 'Terms & Conditions',
      });
    } else {
      showToast('Terms & Conditions not available', 'info');
    }
  }, [pageIds]);

  const handlePrivacyPress = useCallback(() => {
    if (pageIds?.privacy_policy_page) {
      navigate('WebViewScreen' as any, {
        url: pageIds.privacy_policy_page,
        title: 'Privacy Policy',
      });
    }
  }, [pageIds]);

  const handleCountryPress = useCallback(() => {
    setIsModalVisible(true);
    console.log('Country selection pressed');
  }, []);

  const handleCreateNewAccount = useCallback(async () => {
    console.log('Create New Account pressed');

    if (!firstName || !lastName || !email || !phoneNumber) {
      if (Platform.OS === 'android') {
        showToast(ToastMessages.CreateNewAccountScreen.fillAllFields, 'error');
      } else {
        showToast(ToastMessages.CreateNewAccountScreen.fillAllFields, 'error');
      }
      return;
    }

    try {
      setLoading(true);
      // Dynamic import to avoid circular dependency
      const {
        sendWhatsAppOtpForSignup,
        sendEmailOtpForSignup,
      } = require('../../../services/AuthService');

      let response;
      const fullPhoneNumber = `${countryCode}${phoneNumber}`.replace('+', '');

      console.log('Selected OTP Method:', selectedMethod);
      if (selectedMethod === 'email') {
        console.log('Sending Email OTP for signup to:', email);
        response = await sendEmailOtpForSignup(email);
      } else {
        console.log('Sending WhatsApp OTP for signup to:', fullPhoneNumber);
        response = await sendWhatsAppOtpForSignup(fullPhoneNumber);
      }

      if (response.generated_otp) {
        console.log('Generated Signup OTP:', response.generated_otp);
      }

      if (
        response.generated_otp ||
        response.message === '' ||
        response.message === 'Success'
      ) {
        console.log(
          'Navigating to OTPScreen with verificationMethod:',
          selectedMethod,
        );
        navigate('OTPScreen' as any, {
          phoneNumber: fullPhoneNumber,
          email: email,
          firstName: firstName,
          lastName: lastName,
          countryCode: countryCode,
          flow: 'signup',
          screenType: createAccountScreenType, // Use consistent screen type
          verificationMethod: selectedMethod,
        });
      } else {
        const mappedMessage = mapApiError(response.message);
        if (Platform.OS === 'android') {
          showToast(
            ToastMessages.CreateNewAccountScreen.otpFailed(mappedMessage),
            'error',
          );
        } else {
          showToast(
            ToastMessages.CreateNewAccountScreen.otpFailed(mappedMessage),
            'error',
          );
        }
      }
    } catch (error: any) {
      console.error('Error initiating signup:', error);
      const mappedMessage = mapApiError(error.response?.data?.message);
      if (Platform.OS === 'android') {
        showToast(
          ToastMessages.CreateNewAccountScreen.signupFailed(mappedMessage),
          'error',
        );
      } else {
        showToast(
          ToastMessages.CreateNewAccountScreen.signupFailed(mappedMessage),
          'error',
        );
      }
    } finally {
      setLoading(false);
    }
  }, [
    phoneNumber,
    countryCode,
    firstName,
    lastName,
    email,
    selectedMethod,
    createAccountScreenType,
  ]);

  const handleLoginButton = useCallback(() => {
    navigate('WhatsAppAndEmailLogInScreen' as any, {
      // phoneNumber: `${countryCode}${phoneNumber}`,
      flow: 'login',
    });
  }, []);

  const handleCountryCode = async (newCode: any, newFlag: any) => {
    try {
      console.log('new country code selected:', newCode, newFlag);
      setCountryCode(newCode);
      setCountryFlag(newFlag);
    } catch (error: any) {
      console.error('OrderDetail - Failed to update status:', error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
      <Header
        name=""
        variant={TypographyVariant.PMEDIUM_BOLD}
        textColor={ColorPalette.TEXT_GREY_500 as string}
        leftIcon={
          <ArrowLeftIcon style={undefined} onPress={goBack} size={22} />
        }
      />
      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: getScreenHeight(4) },
        ]}
        showsVerticalScrollIndicator={false}>
        <View style={{ gap: getScreenHeight(1) }}>
          <Typography
            variant={TypographyVariant.H5_SEMIBOLD}
            text="Register for a new account"
            customTextStyles={{ color: ColorPalette.TEXT_GREY_400 }}
          />
          <Typography
            variant={TypographyVariant.LMEDIUM_REGULAR}
            text="Please fill in the details below to set up your new account."
            customTextStyles={{ color: ColorPalette.TEXT_GREY_300 }}
          />
        </View>

        <View style={styles.mainContainerTwo}>
          <AnimatedTextInput
            label="First name"
            value={firstName}
            onChangeText={setFirstName}
            keyboardType="default"
            customLabelColorFocused={ColorPalette.TEXT_GREY_400 as string}
            customBorderWidth={1}
          // customContainerStyles={{paddingHorizontal: getScreenWidth(4)}}
          />
          <AnimatedTextInput
            label="Last name"
            value={lastName}
            onChangeText={setLastName}
            keyboardType="default"
            customLabelColorFocused={ColorPalette.TEXT_GREY_400 as string}
            customBorderWidth={1}
          // customContainerStyles={{paddingHorizontal: getScreenWidth(4)}}
          />
          <AnimatedTextInput
            label="Email id"
            value={email}
            onChangeText={setEmail}
            keyboardType="default"
            customLabelColorFocused={ColorPalette.TEXT_GREY_400 as string}
            customBorderWidth={1}
          // customContainerStyles={{paddingHorizontal: getScreenWidth(4)}}
          />
          <AnimatedTextInput
            label="Whatsapp Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            showCountrySection
            countryCode={countryCode}
            countryFlag={countryFlag}
            onCountryPress={handleCountryPress}
          // autoFocus
          // customContainerStyles={{  }}
          />
          <View
            style={{
              gap: getScreenWidth(3),
              paddingVertical: getScreenHeight(1),
            }}>
            <Typography
              variant={TypographyVariant.PSMALL_REGULAR}
              customTextStyles={{ color: ColorPalette.TEXT_GREY_400 }}>
              Select Method To Receive OTP:
            </Typography>
            <View
              style={{
                flexDirection: 'row',
                gap: getScreenWidth(10),
                alignItems: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  gap: getScreenWidth(3),
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => setSelectedMethod('email')}
                  style={[
                    styles.radioButton,
                    selectedMethod === 'email' && styles.radioButtonSelected,
                  ]}>
                  <View
                    style={
                      selectedMethod === 'email' && styles.radioButtonInner
                    }
                  />
                </TouchableOpacity>
                <Typography
                  variant={TypographyVariant.PSMALL_REGULAR}
                  customTextStyles={{ color: ColorPalette.TEXT_GREY_400 }}>
                  via Email
                </Typography>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  gap: getScreenWidth(3),
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => setSelectedMethod('whatsApp')}
                  style={[
                    styles.radioButton,
                    selectedMethod === 'whatsApp' && styles.radioButtonSelected,
                  ]}>
                  <View
                    style={
                      selectedMethod === 'whatsApp' && styles.radioButtonInner
                    }
                  />
                </TouchableOpacity>
                <Typography
                  variant={TypographyVariant.PSMALL_REGULAR}
                  customTextStyles={{ color: ColorPalette.TEXT_GREY_400 }}>
                  via Phone
                </Typography>
              </View>
            </View>
          </View>
        </View>

        <View style={{ alignItems: 'center' }}>
          <Button
            text="Continue"
            onPress={handleCreateNewAccount}
            variant={ButtonVariant.PRIMARY}
            size={ButtonSize.LARGE}
            state={ButtonState.DEFAULT}
            customStyles={styles.customButton}
            withShadow={true}
            customTextStyles={[styles.customText, { fontSize: 15 }]}
            disabled={firstName.length === 0}
            loading={loading}
          />
        </View>

        <View style={[styles.termsContainer]}>
          <Typography
            text={'By continuing you agree to our '}
            variant={TypographyVariant.LSMALL_REGULAR}
            customTextStyles={styles.caption}
          />
          <TextButton
            text={'Terms & Conditions'}
            onPress={handleTermsPress}
            variant={TypographyVariant.LSMALL_REGULAR}
            customTextStyles={styles.linkText}
          />
          <Typography
            text={' and '}
            variant={TypographyVariant.LSMALL_REGULAR}
            customTextStyles={styles.caption}
          />
          <TextButton
            text={'Privacy Policy'}
            onPress={handlePrivacyPress}
            variant={TypographyVariant.LSMALL_REGULAR}
            customTextStyles={styles.linkText}
          />
        </View>

        {/* <View style={styles.dividerContainer}>
          <View style={styles.divider} />

          <Typography
            text={'OR'}
            variant={TypographyVariant.LMEDIUM_REGULAR}
            customTextStyles={styles.caption}
          />
          <View style={styles.divider} />
        </View> */}

        {/* <View style={{alignItems: 'center'}}>
          <Button
            text="Sign up with Google"
            onPress={() => {
              console.log('Google signup clicked');
            }}
            variant={ButtonVariant.PRIMARY}
            size={ButtonSize.LARGE}
            state={ButtonState.DEFAULT}
            customStyles={[
              styles.customButton,
              {borderWidth: 1, borderColor: ColorPalette.BACKGROUND_GREY_100},
            ]}
            type={ButtonType.OUTLINED}
            withShadow={true}
            customTextStyles={{color: ColorPalette.TEXT_GREY_500, fontSize: 15}}
            leftIcon={GoogleLogo}
          />
        </View> */}

        <View style={[styles.termsContainer, { marginTop: getScreenHeight(5) }]}>
          <Typography
            text={'Already have an account? '}
            variant={TypographyVariant.LMEDIUM_REGULAR}
            customTextStyles={styles.caption}
          />
          <TextButton
            text={'Login Here'}
            onPress={handleLoginButton}
            variant={TypographyVariant.PMEDIUM_SEMIBOLD}
            customTextStyles={[styles.linkText, { paddingVertical: 0.5 }]}
          />
        </View>

        <SelectCountryModal
          isVisible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          onSubmit={(code: string, flag: string) => {
            handleCountryCode(code, flag);
            setIsModalVisible(false);
          }}
          showSearch={true}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateNewAccountScreen;
