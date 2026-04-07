import React, {useCallback, useEffect, useRef, useState} from 'react';
import {ScrollView, View, Alert, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Header} from '../../../components/CustomComponents/Header/Header';
import {TypographyVariant} from '../../../components/MainComponents/Typography/Typography.types';
import ColorPalette from '../../../config/ColorPalette';
import {goBack, navigate} from '../../../utils/navigationref';
import ArrowLeftIcon from '../../../assets/icons/ArrowLeft';
import {getScreenHeight, getScreenWidth} from '../../../helpers/screenSize';
import {Typography} from '../../../components/MainComponents/Typography/Typography';
import {TextButton} from '../../../components/MainComponents/TextButton/TextButton';
import {STATIC_TEXT} from '../../../config/staticText';
import {
  Button,
  ButtonSize,
  ButtonState,
  ButtonType,
  ButtonVariant,
} from '../../../components/MainComponents/Button';
import GoogleLogo from '../../../assets/icons/GoogleLogo';
import AnimatedTextInput from '../../../components/MainComponents/TextInput/TextInput';
import {styles} from './WhatsAppAndEmailLogInScreen.styles';
import {BorderRadius, Spacing} from '../../../config/globalStyles';
import {SelectCountryModal} from '../../../components/CustomComponents/SelectCountryModal/SelectCountryModal';
import {useDispatch} from 'react-redux';
import {setGuest, setAuth} from '../../../store/slices/authSlice';
import {googleLogin} from '../../../services/AuthService';
import {Badge} from '../../../components/MainComponents/Badges/Badge';
import {
  BadgeType,
  BadgeVariant,
} from '../../../components/MainComponents/Badges/Badge.types';
import {navigateToMain} from '../../../utils/navigationref';
import {API_ENDPOINTS} from '../../../config/ApiConfig';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import CheckIcon from '../../../assets/icons/CheckIcon';
import Toast from 'react-native-toast-message';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store';
import {showToast} from '../../../components/MainComponents/Toast/ToastHelper';
import {ToastMessages} from '../../../components/MainComponents/Toast/ToastMessages';

const INITIAL_COUNTRY_CODE = '+356';
const MALTA_FLAG_URL = '🇲🇹';
const whatsAppScreenType = STATIC_TEXT.screens.screenType.whatsApp;
const emailScreenType = STATIC_TEXT.screens.screenType.email;

const WhatsAppAndEmailLogInScreen = ({route}: any) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState(INITIAL_COUNTRY_CODE);
  const [countryFlag, setCountryFlag] = useState(MALTA_FLAG_URL);
  const [email, setEmail] = useState('');
  const [activeTab, setActiveTab] = useState<'whatsapp' | 'email'>('whatsapp');
  const [buttonState, setButtonState] = useState(ButtonState.DISABLED);
  const [error, setError] = useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // useEffect(() => {
  //   GoogleSignin.configure({
  //     webClientId:
  //       '686147374218-djvuaehhrqu4mf9s3ugkvurhhog95kkt.apps.googleusercontent.com', // client ID of type WEB for your server
  //   });
  // }, []);

  useEffect(() => {
    if (activeTab === 'whatsapp') {
      // Allow 7 to 15 digits for international numbers
      const phoneRegex = /^[0-9]{7,15}$/;

      if (phoneNumber.length < 7) {
        setButtonState(ButtonState.DISABLED);
        setError('');
      } else if (!phoneRegex.test(phoneNumber)) {
        setButtonState(ButtonState.DISABLED);
        setError('Please enter a valid phone number');
      } else {
        setButtonState(ButtonState.DEFAULT);
        setError('');
      }
    }

    if (activeTab === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (email.length === 0) {
        setButtonState(ButtonState.DISABLED);
        setError('');
      } else if (!emailRegex.test(email)) {
        setButtonState(ButtonState.DISABLED);
        setError('Please enter a valid email address');
      } else {
        setButtonState(ButtonState.DEFAULT);
        setError('');
      }
    }
  }, [phoneNumber, email, activeTab]);

  const {pageIds} = useSelector((state: RootState) => state.app);

  const handleTermsPress = useCallback(() => {
    if (pageIds?.terms_and_conditions_page) {
      navigate('WebViewScreen' as any, {
        url: pageIds.terms_and_conditions_page,
        title: 'Terms & Conditions',
      });
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

  const handleSendCode = useCallback(async () => {
    const returnTo = route?.params?.returnTo;

    if (activeTab === 'whatsapp') {
      try {
        setIsLoading(true);
        const fullPhoneNumber = `${countryCode}${phoneNumber}`.replace('+', ''); // Ensure format is correct

        showToast(
          ToastMessages.WhatsAppAndEmailLogInScreen.sendingWhatsappOtp,
          'loading',
        );

        setError('');

        console.log('Sending WhatsApp OTP to:', fullPhoneNumber);

        // Dynamic import to avoid circular dependency issues if any, or just standard import
        const {sendWhatsAppOtp} = require('../../../services/AuthService');
        const response = await sendWhatsAppOtp(fullPhoneNumber);

        console.log('WhatsApp OTP Response:', response);
        if (response.generated_otp) {
          console.log('Generated WhatsApp OTP:', response.generated_otp);
        }

        if (response.generated_otp || response.message === '') {
          const time = new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          });

          showToast(ToastMessages.WhatsAppAndEmailLogInScreen.OtpSent(time));

          timeoutRef.current = setTimeout(() => {
            navigate('OTPScreen', {
              phoneNumber: fullPhoneNumber,
              flow: 'login',
              screenType: whatsAppScreenType,
              returnTo,
            });
          }, 1000);
        } else {
          setError(response.message || 'Failed to send OTP via WhatsApp');
        }
      } catch (err) {
        console.error('WhatsApp Login error:', err);
        setError('Failed to connect to the server.');
      } finally {
        setIsLoading(false);
      }
    } else {
      // Email flow
      try {
        setIsLoading(true);

        showToast(
          ToastMessages.WhatsAppAndEmailLogInScreen.sendingEmailOtp,
          'loading',
        );

        setError('');

        // Using centralized API configuration for email login
        const backendUrl = API_ENDPOINTS.LOGIN_EMAIL;

        const response = await fetch(backendUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({email: email}),
        });

        const data = await response.json();
        console.log('OTP Response:', data);

        if (
          response.ok &&
          (data.generated_otp || data.debugging_generated_otp)
        ) {
          const time = new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          });

          showToast(ToastMessages.WhatsAppAndEmailLogInScreen.OtpSent(time));

          navigate('OTPScreen', {
            email: email,
            flow: 'login',
            screenType: emailScreenType,
            returnTo,
          });
        } else {
          setError(data.message || 'Something went wrong. Please try again.');
        }
      } catch (err) {
        console.error('Login error:', err);
        setError(
          'Failed to connect to the server. Please tell the developer to run the backend server.',
        );
      } finally {
        setIsLoading(false);
      }
    }
  }, [activeTab, phoneNumber, email, countryCode, route]);

  // const handleGoogleSignIn = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const userInfo = await GoogleSignin.signIn();
  //     console.log('Google User Info:', userInfo);
  //     if (userInfo && userInfo.data && userInfo.data.user) {
  //       const {email, givenName, familyName} = userInfo.data.user;
  //       const returnTo = route?.params?.returnTo;
  //
  //       const result = await googleLogin(
  //         email,
  //         givenName || '',
  //         familyName || '',
  //       );
  //
  //       if (result.result && result.user_id) {
  //         dispatch(
  //           setAuth({
  //             userId: String(result.user_id),
  //             email: email,
  //           }),
  //         );
  //         navigate('AuthSuccessScreen', {
  //           authData: {
  //             userId: String(result.user_id),
  //             email: email,
  //           },
  //           returnTo: returnTo || 'Home',
  //         });
  //       } else {
  //         Alert.alert(
  //           'Login Failed',
  //           result.message || 'Failed to authenticate with backend',
  //         );
  //       }
  //     }
  //   } catch (error: any) {
  //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //       console.log('User cancelled the login flow');
  //     } else if (error.code === statusCodes.IN_PROGRESS) {
  //       console.log('Signin in progress');
  //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //       console.log('Play services not available or outdated');
  //     } else {
  //       console.log('Some other error happened:', error);
  //       Alert.alert(
  //         'Error',
  //         'An unexpected error occurred during Google Sign-In',
  //       );
  //     }
  //   }
  // };

  const handleCreateNewAccount = useCallback(() => {
    navigate('CreateNewAccountScreen', {
      // phoneNumber: `${countryCode}${phoneNumber}`,
      flow: 'login',
    });
  }, []);

  const dispatch = useDispatch();

  const handleSkip = useCallback(() => {
    dispatch(setGuest(true));
    navigateToMain();
  }, [dispatch]);

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
    <SafeAreaView style={{flex: 1}} edges={['top', 'bottom']}>
      <Header
        name=""
        variant={TypographyVariant.PMEDIUM_BOLD}
        textColor={ColorPalette.TEXT_GREY_500}
        leftIcon={
          <ArrowLeftIcon style={undefined} onPress={goBack} size={22} />
        }
        rightIcon={
          <Badge
            text="Skip"
            variant={BadgeVariant.OUTLINE}
            type={BadgeType.PRIMARY}
            onPress={handleSkip}
            customContainerStyle={{
              backgroundColor: ColorPalette.OPACITY_60,
              borderRadius: Spacing.XLarge,
              borderColor: ColorPalette.OPACITY_60,
              paddingHorizontal: getScreenWidth(6),
              paddingVertical: getScreenHeight(1.2),
            }}
            customTextColor={ColorPalette.WHITE}
            textVariant={TypographyVariant.LSMALL_MEDIUM}
          />
        }
      />
      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={[
          styles.scrollContent,
          {paddingBottom: getScreenHeight(4)},
        ]}
        showsVerticalScrollIndicator={false}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: ColorPalette.PURPLE_00,
            padding: 4,
            borderRadius: BorderRadius.Small,
            marginTop: getScreenHeight(2),
            alignSelf: 'center',
          }}>
          <TextButton
            text="WhatsApp"
            onPress={() => setActiveTab('whatsapp')}
            variant={TypographyVariant.LMEDIUM_SEMIBOLD}
            customContainerStyles={{
              flex: 1,
              backgroundColor:
                activeTab === 'whatsapp' ? ColorPalette.WHITE : 'transparent',
              paddingVertical: getScreenHeight(1.4),
              borderRadius: BorderRadius.Small,
              alignItems: 'center',
            }}
            customTextStyles={{
              color: ColorPalette.TEXT_GREY_500,
            }}
          />

          <TextButton
            text="Email"
            onPress={() => setActiveTab('email')}
            variant={TypographyVariant.LMEDIUM_SEMIBOLD}
            customContainerStyles={{
              flex: 1,
              backgroundColor:
                activeTab === 'email' ? ColorPalette.WHITE : 'transparent',
              paddingVertical: getScreenHeight(1.4),
              borderRadius: BorderRadius.Small,
              alignItems: 'center',
            }}
            customTextStyles={{
              color: ColorPalette.TEXT_GREY_500,
            }}
          />
        </View>

        {activeTab === 'whatsapp' && (
          <>
            <View
              style={{gap: getScreenHeight(1), marginTop: getScreenHeight(2)}}>
              <Typography
                variant={TypographyVariant.H5_SEMIBOLD}
                text="Enter your WhatsApp number"
                customTextStyles={{color: ColorPalette.TEXT_GREY_400}}
              />
              <Typography
                variant={TypographyVariant.LMEDIUM_REGULAR}
                text="We’ll send a verification code via WhatsApp"
                customTextStyles={{
                  color: ColorPalette.TEXT_GREY_300,
                  paddingVertical: 0.5,
                }}
              />
            </View>

            <View style={styles.mainContainerTwo}>
              <AnimatedTextInput
                label="Whatsapp Number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
                showCountrySection
                countryCode={countryCode}
                countryFlag={countryFlag}
                onCountryPress={handleCountryPress}
                error={error}
                // autoFocus
                // customContainerStyles={{  }}
              />
            </View>
          </>
        )}

        {activeTab === 'email' && (
          <>
            <View
              style={{gap: getScreenHeight(1), marginTop: getScreenHeight(2)}}>
              <Typography
                variant={TypographyVariant.H5_SEMIBOLD}
                text="Enter your email ID"
                customTextStyles={{color: ColorPalette.TEXT_GREY_400}}
              />
              <Typography
                variant={TypographyVariant.LMEDIUM_REGULAR}
                text="We will send an OTP to help you sign in securely."
                customTextStyles={{
                  color: ColorPalette.TEXT_GREY_300,
                  paddingVertical: 0.5,
                }}
              />
            </View>

            <View style={styles.mainContainerTwo}>
              <AnimatedTextInput
                label="Email id"
                value={email}
                onChangeText={setEmail}
                keyboardType="default"
                customLabelColorFocused={ColorPalette.TEXT_GREY_400}
                customBorderWidth={1}
                error={error}
                // customContainerStyles={{paddingHorizontal: getScreenWidth(4)}}
              />
            </View>
          </>
        )}

        {activeTab === 'whatsapp' && (
          <View style={styles.checkboxContainer}>
            <TouchableOpacity
              style={styles.checkboxRow}
              activeOpacity={0.7}
              onPress={() => setChecked(!checked)}>
              {checked ? (
                <CheckIcon
                  size={20}
                  backgroundColor={ColorPalette.ROSE_PURPLE_300}
                />
              ) : (
                <View style={styles.checkbox} />
              )}
            </TouchableOpacity>
            <Typography
              text="I consent to receive messages for verification via WhatsApp"
              variant={TypographyVariant.LSMALL_REGULAR}
              customTextStyles={styles.caption}
            />
          </View>
        )}

        <View style={{alignItems: 'center'}}>
          <Button
            text={isLoading ? 'Sending...' : 'Continue'}
            onPress={handleSendCode}
            variant={ButtonVariant.PRIMARY}
            size={ButtonSize.LARGE}
            state={
              isLoading || (activeTab === 'whatsapp' && !checked)
                ? ButtonState.DISABLED
                : buttonState
            }
            customStyles={styles.customButton}
            withShadow={true}
            customTextStyles={[styles.customText, {fontSize: 15}]}
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
        </View>

        <View style={{ alignItems: 'center' }}>
          <Button
            text="Sign in with Google"
            onPress={() => {}}
            // onPress={handleGoogleSignIn}
            variant={ButtonVariant.PRIMARY}
            size={ButtonSize.LARGE}
            state={ButtonState.DEFAULT}
            customStyles={[
              styles.customButton,
              { borderWidth: 1, borderColor: ColorPalette.BACKGROUND_GREY_100 },
            ]}
            type={ButtonType.OUTLINED}
            withShadow={true}
            customTextStyles={{ color: ColorPalette.TEXT_GREY_500, fontSize: 15 }}
            leftIcon={GoogleLogo}
          />
        </View> */}

        <View style={[styles.termsContainer, {marginTop: getScreenHeight(20)}]}>
          <Typography
            text={`Don't have an account? `}
            variant={TypographyVariant.LMEDIUM_REGULAR}
            customTextStyles={styles.caption}
          />
          <TextButton
            text={'Create one'}
            onPress={handleCreateNewAccount}
            variant={TypographyVariant.PMEDIUM_SEMIBOLD}
            customTextStyles={[
              styles.linkText,
              {textDecorationLine: 'underline', paddingVertical: 0.5},
            ]}
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

export default WhatsAppAndEmailLogInScreen;
