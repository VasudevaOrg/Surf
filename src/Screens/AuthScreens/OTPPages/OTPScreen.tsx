import React, { useEffect, useState } from 'react';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import ArrowLeftIcon from '../../../assets/icons/ArrowLeft';
import FlowBite from '../../../assets/icons/FlowBite';
import { Button } from '../../../components/MainComponents/Button/Button';
import {
  ButtonSize,
  ButtonState,
  ButtonVariant,
} from '../../../components/MainComponents/Button/Button.types';
import { OtpInput } from '../../../components/MainComponents/OtpInput/OtpInput';
import { TextButton } from '../../../components/MainComponents/TextButton/TextButton';
import { Typography } from '../../../components/MainComponents/Typography/Typography';
import { TypographyVariant } from '../../../components/MainComponents/Typography/Typography.types';
import ColorPalette from '../../../config/ColorPalette';
import { globalStyles } from '../../../config/globalStyles';
import { STATIC_TEXT } from '../../../config/staticText';
import { goBack } from '../../../utils/navigationref';
import { styles } from './OTPScreen.styles';
import { setAuth } from '../../../store/slices/authSlice';
import { API_ENDPOINTS } from '../../../config/ApiConfig';
import { syncGuestCart } from '../../../services/CartService';
import { clearGuestCart } from '../../../store/slices/cartSlice';
import Toast from 'react-native-toast-message';
import { showToast } from '../../../components/MainComponents/Toast/ToastHelper';
import { ToastMessages } from '../../../components/MainComponents/Toast/ToastMessages';
import { mapApiError } from '../../../utils/ErrorUtils';

const { promptTitleWhatsapp, promptTitleEmail, otpSent, resendText, verifyText } =
  STATIC_TEXT.screens.otpScreen;
// const OTP_LENGTH = 5;
const emailScreenType = STATIC_TEXT.screens.screenType.email;
const whatsAppScreenType = STATIC_TEXT.screens.screenType.whatsApp;
const createAccountScreenType = STATIC_TEXT.screens.screenType.createAccount;

const OTPScreen = ({ route, navigation }: any) => {
  const {
    phoneNumber,
    email,
    screenType,
    returnScreen,
    returnData,
    verificationMethod,
  } = route.params;
  console.log('OTPScreen received params:', route.params);
  const [otp, setOtp] = useState('');
  const [buttonState, setButtonState] = useState(ButtonState.DISABLED);
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  const [canResend, setCanResend] = useState(true);
  const OTP_LENGTH = 5;

  const dispatch = useDispatch();
  const { guestCartItems } = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    if (secondsLeft === null) return;

    if (secondsLeft === 0) {
      setCanResend(true);
      setSecondsLeft(null); // stop timer
      return;
    }

    const timer = setTimeout(() => {
      setSecondsLeft(prev => (prev ?? 1) - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [secondsLeft]);

  useEffect(() => {
    if (verificationMethod === 'email') {
      setTitle(promptTitleEmail);
    } else if (
      verificationMethod === 'whatsApp' ||
      verificationMethod === 'phone'
    ) {
      setTitle(promptTitleWhatsapp);
    } else {
      // Fallback to legacy screenType logic
      if (screenType === emailScreenType && email) setTitle(promptTitleEmail);
      if (
        (screenType?.toLowerCase() === whatsAppScreenType.toLowerCase() ||
          screenType === createAccountScreenType) &&
        phoneNumber
      )
        setTitle(promptTitleWhatsapp);
    }
  }, [screenType, email, phoneNumber, verificationMethod]);

  useEffect(() => {
    setButtonState(
      otp.length === OTP_LENGTH ? ButtonState.DEFAULT : ButtonState.DISABLED,
    );
  }, [otp]);

  const handleOtpChange = (text: string) => setOtp(text);

  const handleResendOtp = async () => {
    if (!canResend) return;

    console.log('resend otp clicked');
    try {
      if (
        screenType === whatsAppScreenType ||
        screenType === createAccountScreenType
      ) {
        if (verificationMethod === 'email') {
          const {
            sendEmailOtpForSignup,
          } = require('../../../services/AuthService');
          console.log('Resending Email OTP for signup to:', email);
          showToast(ToastMessages.OTPScreen.resendingOtp, 'loading');

          const response = await sendEmailOtpForSignup(email);

          if (response.generated_otp) {
            console.log('Resent Email OTP:', response.generated_otp);
          }

          if (
            response.generated_otp ||
            response.message === '' ||
            response.message === 'Success'
          ) {
            showToast(ToastMessages.OTPScreen.otpResent);
            setCanResend(false);
            setSecondsLeft(30);
          } else {
            showToast(
              ToastMessages.OTPScreen.otpResendFailed(mapApiError(response.message)),
              'error',
            );
          }
        } else {
          const { flow } = route.params;
          const {
            sendWhatsAppOtp,
            sendWhatsAppOtpForSignup,
          } = require('../../../services/AuthService');

          console.log(`Resending WhatsApp OTP (${flow}) to:`, phoneNumber);

          showToast(ToastMessages.OTPScreen.resendingOtp, 'loading');

          const response =
            flow === 'signup'
              ? await sendWhatsAppOtpForSignup(phoneNumber)
              : await sendWhatsAppOtp(phoneNumber);

          if (response.generated_otp) {
            console.log('Resent WhatsApp OTP:', response.generated_otp);
          }

          if (response.generated_otp || response.message === '') {
            showToast(ToastMessages.OTPScreen.otpResent);

            setCanResend(false);
            setSecondsLeft(30);
          } else {
            showToast(
              ToastMessages.OTPScreen.otpResendFailed(mapApiError(response.message)),
              'error',
            );
          }
        }
      } else if (screenType === emailScreenType) {
        console.log('Resending Email OTP to:', email);
        showToast(ToastMessages.OTPScreen.resendingOtp, 'loading');

        const response = await fetch(API_ENDPOINTS.LOGIN_EMAIL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: email }),
        });
        const data = await response.json();

        if (data.generated_otp || data.debugging_generated_otp) {
          console.log(
            'Resent Email OTP:',
            data.generated_otp || data.debugging_generated_otp,
          );
        }

        if (
          response.ok &&
          (data.generated_otp || data.debugging_generated_otp)
        ) {
          showToast(ToastMessages.OTPScreen.otpResent);
          setCanResend(false);
          setSecondsLeft(30);
        } else {
          showToast(
            ToastMessages.OTPScreen.otpResendFailed(mapApiError(data.message)),
            'error',
          );
        }
      }
    } catch (err: any) {
      console.error('Resend OTP error:', err);
      showToast(
        ToastMessages.OTPScreen.otpResendFailed(mapApiError(err.message)),
        'error',
      );
    }
  };

  const handleVerifyOtp = async () => {
    try {
      setIsLoading(true);
      showToast(ToastMessages.OTPScreen.verifyingOtp, 'loading');
      setError('');

      const { flow, userId, returnTo } = route.params;
      console.log('OTPScreen Params:', route.params);
      console.log('Bypass Check:', { flow, userId });

      // Bypass verification for signup flow if userId is present
      if (flow === 'signup' && userId) {
        navigation.navigate('AuthSuccessScreen', {
          screenType,
          authData: { userId: userId.toString(), email: email || phoneNumber },
          returnTo,
        });
        setIsLoading(false);
        return;
      }

      let data;
      let isSuccess = false;

      console.log(
        'Verifying OTP. Flow:',
        flow,
        'Verification Method:',
        verificationMethod,
      );

      if (
        (flow === 'signup' || flow === 'profile_update') &&
        verificationMethod === 'email'
      ) {
        const {
          verifyEmailOtpForSignup,
        } = require('../../../services/AuthService');
        data = await verifyEmailOtpForSignup(email, otp);
        // The API returns "true"/"false" as strings for is_verifield
        isSuccess =
          data?.is_verifield === true || data?.is_verifield === 'true';
      } else if (
        screenType?.toLowerCase() === whatsAppScreenType.toLowerCase() ||
        screenType === createAccountScreenType ||
        (flow === 'profile_update' && verificationMethod === 'phone')
      ) {
        if (flow === 'signup' || flow === 'profile_update') {
          const {
            verifyWhatsAppOtpForSignup,
          } = require('../../../services/AuthService');
          data = await verifyWhatsAppOtpForSignup(phoneNumber, otp);
        } else {
          const { verifyWhatsAppOtp } = require('../../../services/AuthService');
          data = await verifyWhatsAppOtp(phoneNumber, otp);
        }

        // Handle PHP warnings contaminating the JSON response
        if (typeof data === 'string') {
          const jsonMatch = data.match(/\{[\s\S]*\}$/);
          if (jsonMatch) {
            try {
              data = JSON.parse(jsonMatch[0]);
            } catch (e) {
              console.error('Failed to parse JSON from response string:', e);
            }
          }
        }

        if (flow === 'signup' || flow === 'profile_update') {
          isSuccess = data?.result === true || data?.result === 'true';
        } else {
          // Explicitly require user_id for login, as invalid OTPs might return result: true with message: "not_found"
          isSuccess = (data?.result === true || data?.result === 'true') && data?.message !== 'not_found' && !!(data?.user_id || data?.userId);
        }
      } else {
        const response = await fetch(API_ENDPOINTS.VERIFY_OTP, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            otp: otp,
          }),
        });
        data = await response.json();
        isSuccess =
          response.ok && (data.result === true || data.result === 'true') && data?.message !== 'not_found' && !!(data?.user_id || data?.userId);
        console.log('Verify Email OTP Response (Legacy):', data);
      }

      console.log('OTP Verification Result Data:', data);
      console.log('Final isSuccess:', isSuccess);

      if (isSuccess) {
        // If it's the signup flow, we now create the account
        if (flow === 'signup') {
          const {
            firstName,
            lastName,
            email: signupEmail,
            countryCode,
          } = route.params;
          const { createAccountV2 } = require('../../../services/AuthService');

          // Ensure phone number format is correct (it might be passed as consolidated or separate)
          // In handleCreateNewAccount we passed `fullPhoneNumber` as `phoneNumber`
          // Signup API expects + prefix
          const targetPhone = phoneNumber.startsWith('+')
            ? phoneNumber
            : `+${phoneNumber}`;

          const signupData = {
            firstname: firstName,
            lastname: lastName,
            email: signupEmail,
            phone: targetPhone,
            ...(verificationMethod === 'email'
              ? { nt_email_verify: 'Y' }
              : { phone_verified: 'Y' }),
          };

          console.log('Hitting Create Account API with data:', signupData);

          const signupResponse = await createAccountV2(signupData);

          console.log('Signup Response:', signupResponse);

          if (signupResponse.result) {
            const newUserId = signupResponse.user_id;
            navigation.navigate('AuthSuccessScreen', {
              screenType,
              authData: { userId: newUserId.toString(), email: signupEmail },
              returnTo,
            });
          } else {
            const rawMessage = signupResponse.message || 'otp_not_verified';
            const errorMessage = mapApiError(
              rawMessage === 'not_found' ? 'otp_not_verified' : rawMessage,
            );
            setError(errorMessage);
            showToast(errorMessage, 'error');
          }
          return; // Stop further processing
        }

        const userId = data?.user_id || data?.userId || '';
        showToast(ToastMessages.OTPScreen.otpVerified);

        if (flow === 'profile_update') {
          const { returnData, returnScreen } = route.params as any;
          navigation.reset({
            index: 1,
            routes: [
              { name: 'AccountScreen' },
              {
                name: returnScreen,
                params: {
                  returnData: { ...returnData, otpVerified: true },
                  otpVerified: true,
                },
              },
            ],
          });
          return;
        }

        navigation.navigate('AuthSuccessScreen', {
          screenType,
          authData: {
            userId: userId.toString(),
            phoneNumber,
          },
          returnTo,
        });

        return;
      } else {
        const rawMessage = data?.message || 'otp_not_verified';
        const errorMessage = mapApiError(
          rawMessage === 'not_found' ? 'otp_not_verified' : rawMessage,
        );
        setError(errorMessage);
        showToast(errorMessage, 'error');
      }

      if (screenType === emailScreenType) {
        const response = await fetch(API_ENDPOINTS.VERIFY_OTP, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            otp: otp,
          }),
        });

        const data = await response.json();
        console.log('Verify OTP Response:', data);

        if (response.ok && (data.result === true || data.result === 'true') && data?.message !== 'not_found' && !!(data?.user_id || data?.userId)) {
          const userId = data.user_id || data.userId;

          // Perform guest cart sync in the middle process
          if (userId && guestCartItems.length > 0) {
            try {
              console.log(
                'Syncing guest cart for user:',
                userId,
                'Items count:',
                guestCartItems.length,
              );
              const syncResult = await syncGuestCart(userId, guestCartItems);
              console.log('Sync result:', syncResult);
              dispatch(clearGuestCart());
            } catch (syncError) {
              console.error(
                'Failed to sync guest cart in OTPScreen:',
                syncError,
              );
            }
          } else {
            console.log(
              'Skipping sync. guestCartItems length:',
              guestCartItems?.length,
              'userId:',
              userId,
            );
          }

          if (flow === 'Authentication' || flow === 'login') {
            showToast(ToastMessages.OTPScreen.otpVerified);
            navigation.navigate('AuthSuccessScreen', {
              screenType,
              authData: { userId: userId.toString(), email: email },
              returnTo,
            });
          } else if (flow === 'update' || flow === 'profile_update') {
            dispatch(setAuth({ userId: userId.toString(), email: email }));
            const { returnData, returnScreen } = route.params;
            navigation.replace('MainScreens', {
              screen: 'Account',
              params: {
                screen: returnScreen,
                params: {
                  returnData,
                  otpVerified: true,
                },
              },
            });
          } else {
            navigation.navigate('AuthSuccessScreen', {
              screenType,
              authData: { userId: userId.toString(), email: email },
              returnTo,
            });
          }
        } else {
          const rawMessage = data?.message || 'otp_not_verified';
          setError(
            mapApiError(
              rawMessage === 'not_found' ? 'otp_not_verified' : rawMessage,
            ),
          );
        }
        return;
      }
    } catch (err) {
      console.error('Verification error:', err);
      setError('Failed to verify OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={[globalStyles.secondaryContainer, styles.container]}>
      <TouchableOpacity
        style={styles.bannerContainer}
        onPress={goBack}>
        <ArrowLeftIcon
          size={22}
          color={ColorPalette.TEXT_GREY_400 as string}
          strokeWidth={2}
          style={undefined}
          onPress={undefined}
        />
      </TouchableOpacity>
      <View>
        <View style={styles.contentWrapper}>
          <Typography
            text={title || `Enter verification code`}
            variant={TypographyVariant.H5_BOLD}
            customTextStyles={styles.heading}
          />
          <View style={styles.containerTwo}>
            <View style={styles.subContainer}>
              <Typography
                text={otpSent}
                variant={TypographyVariant.PSMALL_MEDIUM}
                customTextStyles={styles.subCaption}
              />
              <Typography
                text={
                  verificationMethod === 'email' ? email : phoneNumber || email
                }
                variant={TypographyVariant.LMEDIUM_MEDIUM}
                customTextStyles={styles.subCaptionTwo}
              />
            </View>
            <View style={styles.iconContainer}>
              <FlowBite
                size={20}
                color={ColorPalette.TEXT_GREY_400 as string}
                strokeWidth={2}
                style={undefined}
                onPress={goBack}
              />
            </View>
          </View>
        </View>
        <View style={styles.mainTwoContainer}>
          <View style={styles.otpContainer}>
            <OtpInput
              numberOfDigits={OTP_LENGTH}
              onTextChange={handleOtpChange}
              autoFocus
              focusColor={ColorPalette.TEXT_GREY_400 as string}
              theme={{
                containerStyle: styles.otpInputContainer,
                pinCodeContainerStyle: styles.otpBox,
                focusedPinCodeContainerStyle: styles.otpBoxFocused,
                filledPinCodeContainerStyle: styles.otpBoxFilled,
              }}
            />
          </View>
          {error ? (
            <Typography
              text={error}
              variant={TypographyVariant.LSMALL_MEDIUM}
              customTextStyles={{
                color: ColorPalette.RED_200,
                marginTop: 8,
                textAlign: 'center',
              }}
            />
          ) : null}

          <View style={styles.resendContainer}>
            <View style={styles.resendRow}>
              <Typography
                text="Didn't receive a code?"
                variant={TypographyVariant.LSMALL_REGULAR}
                customTextStyles={styles.caption}
              />

              <TextButton
                text="Resend OTP"
                onPress={handleResendOtp}
                disabled={!canResend}
                variant={TypographyVariant.LSMALL_REGULAR}
                customTextStyles={[
                  styles.linkText,
                  !canResend && { opacity: 0.5 },
                ]}
              />
            </View>

            {!canResend && (
              <View style={styles.resendRow}>
                <Typography
                  text={`Resend in`}
                  variant={TypographyVariant.PSMALL_REGULAR}
                  customTextStyles={[styles.resendTimer]}
                />
                <Typography
                  text={`${secondsLeft}s`}
                  variant={TypographyVariant.PSMALL_REGULAR}
                  customTextStyles={[
                    styles.resendTimer,
                    {
                      color: ColorPalette.BLUE_CUSTOM,
                    },
                  ]}
                />
              </View>
            )}
          </View>
        </View>
        <View style={styles.mainContainerTwo}>
          <Button
            text={isLoading ? 'Verifying...' : verifyText}
            onPress={handleVerifyOtp}
            variant={ButtonVariant.PRIMARY}
            state={isLoading ? ButtonState.DISABLED : buttonState}
            size={ButtonSize.MEDIUM}
            withShadow
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OTPScreen;
