import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppLogo from '../../../assets/icons/AppLogo';
import AppLogo2 from '../../../assets/icons/AppLogo2';
import AppName from '../../../assets/icons/AppName';
import { Badge } from '../../../components/MainComponents/Badges/Badge';
import {
  BadgeType,
  BadgeVariant,
} from '../../../components/MainComponents/Badges/Badge.types';
import { Button } from '../../../components/MainComponents/Button';
import {
  ButtonSize,
  ButtonState,
  ButtonType,
  ButtonVariant,
} from '../../../components/MainComponents/Button/Button.types';
import { TextButton } from '../../../components/MainComponents/TextButton/TextButton';
import AnimatedTextInput from '../../../components/MainComponents/TextInput/TextInput';
import { Typography } from '../../../components/MainComponents/Typography/Typography';
import { TypographyVariant } from '../../../components/MainComponents/Typography/Typography.types';
import ColorPalette, { Gradients } from '../../../config/ColorPalette';
import { STATIC_TEXT } from '../../../config/staticText';
import { styles } from './PhoneNumberScreen.styles';
import { getScreenHeight, getScreenWidth } from '../../../helpers/screenSize';
import { navigate, navigateToMain } from '../../../utils/navigationref';
import { Spacing } from '../../../config/globalStyles';
import GoogleLogo from '../../../assets/icons/GoogleLogo';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store';
import { setGuest, setAuth } from '../../../store/slices/authSlice';
import { googleLogin } from '../../../services/AuthService';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import axios from 'axios';
import { API_ENDPOINTS } from '../../../config/ApiConfig';
import { setSupportInfo, setPageIds } from '../../../store/slices/appSlice';
import { showToast } from '../../../components/MainComponents/Toast/ToastHelper';

const INITIAL_COUNTRY_CODE = '+356';
const MALTA_FLAG_URL =
  'https://cdn.countryflags.com/thumbs/malta/flag-round-250.png';

const { termsText, termsText2, and, privacyPolicy } =
  STATIC_TEXT.screens.phoneNumberScreen;

const images = [
  require('../../../assets/images/image1.png'),
  require('../../../assets/images/image2.png'),
  require('../../../assets/images/image3.png'),
  require('../../../assets/images/image4.png'),
  require('../../../assets/images/image5.png'),
  require('../../../assets/images/image6.png'),
  require('../../../assets/images/image7.png'),
  require('../../../assets/images/image8.png'),
  require('../../../assets/images/image9.png'),
  require('../../../assets/images/image10.png'),
  require('../../../assets/images/image11.png'),
  require('../../../assets/images/image12.png'),
  require('../../../assets/images/image13.png'),
  require('../../../assets/images/image14.png'),
  require('../../../assets/images/image15.png'),
  require('../../../assets/images/image16.png'),
  require('../../../assets/images/image17.png'),
  require('../../../assets/images/image18.png'),
];

const PhoneNumberScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState(INITIAL_COUNTRY_CODE);
  const [buttonState, setButtonState] = useState(ButtonState.DISABLED);

  // useEffect(() => {
  //   GoogleSignin.configure({
  //     webClientId:
  //       '686147374218-djvuaehhrqu4mf9s3ugkvurhhog95kkt.apps.googleusercontent.com',
  //   });
  // }, []);

  useEffect(() => {
    setButtonState(
      phoneNumber.replace(/[^0-9]/g, '').length >= 7
        ? ButtonState.DEFAULT
        : ButtonState.DISABLED,
    );
  }, [phoneNumber]);

  const dispatch = useDispatch();

  const { pageIds } = useSelector((state: RootState) => state.app);

  useEffect(() => {
    const fetchAppConfig = async () => {
      if (!pageIds) {
        try {
          // Fetch basic home layout to get page_ids and support info
          const response = await axios.get(
            API_ENDPOINTS.HOME_LAYOUT(400, '', ''),
          );
          if (response.data && response.data.page_ids) {
            dispatch(setPageIds(response.data.page_ids));
          }
          if (response.data && response.data.nt_support_whatsapp !== undefined) {
            dispatch(
              setSupportInfo({
                whatsapp: response.data.nt_support_whatsapp,
                email: response.data.nt_support_email,
              }),
            );
          }
        } catch (error) {
          console.error('Error fetching app config in PhoneNumberScreen:', error);
        }
      }
    };

    fetchAppConfig();
  }, [dispatch, pageIds]);

  const handleSkip = useCallback(() => {
    dispatch(setGuest(true));
    navigateToMain();
  }, [dispatch]);

  const handleSendCode = useCallback(() => {
    navigate('OTPScreen', {
      phoneNumber: `${countryCode}${phoneNumber}`,
      flow: 'login',
    });
  }, [countryCode, phoneNumber]);

  // const handleGoogleSignIn = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const userInfo = await GoogleSignin.signIn();
  //     console.log('Google User Info:', userInfo);
  //     if (userInfo && userInfo.data && userInfo.data.user) {
  //       const {email, givenName, familyName} = userInfo.data.user;
  //       const result = await googleLogin(
  //         email,
  //         givenName || '',
  //         familyName || '',
  //       );

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
  //           returnTo: 'Home',
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
  const handleWhatsAppAndEmailLogin = useCallback(() => {
    navigate('WhatsAppAndEmailLogInScreen', {
      // phoneNumber: `${countryCode}${phoneNumber}`,
      flow: 'login',
    });
  }, []);

  const handleCountryPress = useCallback(() => {
    console.log('Country selection pressed');
  }, []);

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
    else {
      showToast('Privacy Policy not available', 'info');
    }
  }, [pageIds]);

  const handlePhoneChange = useCallback(text => {
    setPhoneNumber(text);
  }, []);

  const row1 = images.slice(0, 6);
  const row2 = images.slice(6, 13);
  const row3 = images.slice(13, 19);

  // Auto scroll reusable hook
  const InfiniteRow = ({ data, reverse = false, speed = 40000 }) => {
    const translateX = useRef(new Animated.Value(0)).current;
    const loopDistance = data.length * 90; // card width * total images

    const duplicated = [...data, ...data, ...data]; // 3 copies is sufficient for seamless loop

    const animate = () => {
      translateX.setValue(0);
      Animated.timing(translateX, {
        toValue: reverse ? loopDistance : -loopDistance,
        duration: speed,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => animate()); // loop again
    };

    useEffect(() => {
      animate();
    }, []);

    return (
      <View style={{ overflow: 'hidden' }}>
        <Animated.View
          style={{
            flexDirection: 'row',
            transform: [{ translateX }],
          }}>
          {duplicated.map((img, index) => (
            <View key={index} style={styles.card}>
              <Image source={img} style={styles.icon} resizeMode="contain" />
            </View>
          ))}
        </Animated.View>
      </View>
    );
  };

  // const RowScroller = ({ data, scrollRef, reverse }) => {
  //   useAutoScroll(scrollRef, reverse);
  //   return (
  //     <ScrollView
  //       ref={scrollRef}
  //       horizontal
  //       showsHorizontalScrollIndicator={false}
  //       scrollEnabled={false}
  //       contentContainerStyle={{ paddingVertical: 6 }}
  //     >
  //       {[...data, ...data].map((img, i) => (
  //         <View key={i} style={styles.card}>
  //           <Image source={img} style={styles.icon} resizeMode="contain" />
  //         </View>
  //       ))}
  //     </ScrollView>
  //   );
  // };

  const renderHeader = useCallback(
    () => (
      <>
        <View style={styles.brandContainer}>
          <View style={styles.skipContainer}>
            <Badge
              text="Skip"
              variant={BadgeVariant.OUTLINE}
              type={BadgeType.PRIMARY}
              onPress={handleSkip}
              customContainerStyle={styles.skipBadge}
              customTextColor={ColorPalette.WHITE}
              textVariant={TypographyVariant.LMEDIUM_REGULAR}
            />
          </View>
          {/* Fades removed as per user request */}
          <View style={{ gap: 11 }}>
            <InfiniteRow data={row1} reverse={false} speed={10000} />
            <InfiniteRow data={row2} reverse={true} speed={10000} />
            <InfiniteRow data={row3} reverse={false} speed={10000} />
          </View>

          {/* Bottom Blur / Fade */}
          {/* Fades removed as per user request */}
        </View>
      </>
    ),
    [handleSkip],
  );

  const renderContent = useCallback(
    () => (
      <View style={styles.contentContainer}>
        <View
          style={{
            // marginTop: getScreenHeight(1),
            gap: getScreenHeight(1.5),
          }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <AppLogo2 style={undefined} />
            <AppName style={undefined} />
          </View>
          <Typography
            variant={TypographyVariant.H4_SEMIBOLD}
            text="Malta’s Smart and Easy Way to Shop."
            customTextStyles={[styles.title, styles.contentPadding]}
          />

          {/* <View style={[styles.dividerContainer, styles.contentPadding]}>
            <Typography
              variant={TypographyVariant.LMEDIUM_MEDIUM}
              text="Log in or sign up"
              customTextStyles={styles.dividerText}
            />
          </View> */}

          {/* <AnimatedTextInput
            label="Whatsapp Number"
            value={phoneNumber}
            onChangeText={handlePhoneChange}
            keyboardType="phone-pad"
            showCountrySection
            countryCode={countryCode}
            countryFlag={MALTA_FLAG_URL}
            onCountryPress={handleCountryPress}
            autoFocus
            customContainerStyles={{ paddingHorizontal: getScreenWidth(4) }}
          /> */}

          {/* <View style={[styles.mainContainerTwo]}>
            <Button
              text="SEND CODE"
              onPress={handleSendCode}
              variant={ButtonVariant.PRIMARY}
              size={ButtonSize.LARGE}
              state={ButtonState.DEFAULT}
              customStyles={styles.customButton}
              withShadow
            />
          </View> */}

          <View
            style={[styles.buttonContainer, { marginTop: getScreenHeight(1) }]}>
            <Button
              text="Create New Account"
              onPress={handleCreateNewAccount}
              variant={ButtonVariant.PRIMARY}
              size={ButtonSize.LARGE}
              state={ButtonState.DEFAULT}
              customStyles={styles.customButton}
              // withShadow={true}
              customTextStyles={styles.customText}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              text="Login With WhatsApp/Email"
              onPress={handleWhatsAppAndEmailLogin}
              variant={ButtonVariant.PRIMARY}
              size={ButtonSize.LARGE}
              state={ButtonState.DEFAULT}
              customStyles={[
                styles.customButton,
                { borderWidth: 1, borderColor: ColorPalette.BLUE_CUSTOM },
              ]}
              type={ButtonType.OUTLINED}
              // withShadow={true}
              customTextStyles={{ color: ColorPalette.BLUE_CUSTOM, fontSize: 15 }}
            />
          </View>
          {/* <View style={styles.buttonContainer}>
            <Button
              text="Sign up with Google"
              // onPress={handleGoogleSignIn}
              onPress={() => {}}
              variant={ButtonVariant.PRIMARY}
              size={ButtonSize.LARGE}
              state={ButtonState.DEFAULT}
              customStyles={[
                styles.customButton,
                { borderWidth: 1, borderColor: ColorPalette.BACKGROUND_GREY_100 },
              ]}
              type={ButtonType.OUTLINED}
              // withShadow={true}
              customTextStyles={{
                color: ColorPalette.TEXT_GREY_500,
                fontSize: 15,
              }}
              leftIcon={GoogleLogo}
            />
          </View> */}

          <View style={[styles.termsContainer, styles.contentPadding]}>
            <Typography
              text={termsText}
              variant={TypographyVariant.LXSMALL_REGULAR}
              customTextStyles={styles.caption}
            />
            <TextButton
              text={termsText2}
              onPress={handleTermsPress}
              variant={TypographyVariant.LXSMALL_REGULAR}
              customTextStyles={styles.linkText}
            />
            <Typography
              text={and}
              variant={TypographyVariant.LXSMALL_REGULAR}
              customTextStyles={styles.caption}
            />
            <TextButton
              text={privacyPolicy}
              onPress={handlePrivacyPress}
              variant={TypographyVariant.LXSMALL_REGULAR}
              customTextStyles={styles.linkText}
            />
          </View>
        </View>
      </View>
    ),
    [
      buttonState,
      countryCode,
      handleCountryPress,
      handlePhoneChange,
      handlePrivacyPress,
      handleSendCode,
      handleTermsPress,
      phoneNumber,
    ],
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      {/* <LinearGradient
        colors={
          Gradients.SELLER_PRIMARY_GRADIENT.colors || ['#9333EA', '#7928CA']
        }
        start={Gradients.SELLER_PRIMARY_GRADIENT.start || { x: 0, y: 0 }}
        end={Gradients.SELLER_PRIMARY_GRADIENT.end || { x: 1, y: 1 }}
        style={styles.gradientBackground}
      /> */}
      <StatusBar
        backgroundColor={ColorPalette.WHITE}
        barStyle="dark-content"
        translucent={false}
      />
      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {renderHeader()}
        {renderContent()}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PhoneNumberScreen;
