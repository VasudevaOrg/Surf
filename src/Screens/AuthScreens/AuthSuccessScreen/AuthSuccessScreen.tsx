import React, { useEffect } from 'react';
import { Animated, SafeAreaView, View } from 'react-native';
import axios from 'axios';
import { API_ENDPOINTS } from '../../../config/ApiConfig';
import { Typography } from '../../../components/MainComponents/Typography/Typography';
import { TypographyVariant } from '../../../components/MainComponents/Typography/Typography.types';
import { globalStyles } from '../../../config/globalStyles';
import { STATIC_TEXT } from '../../../config/staticText';
import { styles } from './AuthSuccessScreen.styles';
import { navigateToMain } from '../../../utils/navigationref';
import SuccessTickIcon from '../../../assets/icons/SuccessTickIcon';

const successTitle = STATIC_TEXT.screens.authSuccess.successTitle;
const successDesc = STATIC_TEXT.screens.authSuccess.successDesc;
const registrationSuccessTitle =
  STATIC_TEXT.screens.authSuccess.registrationSuccessTitle;
const registrationSuccessDesc =
  STATIC_TEXT.screens.authSuccess.registrationSuccessDesc;
const createAccountScreenType = STATIC_TEXT.screens.screenType.createAccount;

import { useDispatch } from 'react-redux';
import { setAuth } from '../../../store/slices/authSlice';

const AuthSuccessScreen = ({ route }: { route: any }) => {
  const { screenType, authData } = route.params;
  const dispatch = useDispatch();
  const scaleValue = new Animated.Value(0);
  const opacityValue = new Animated.Value(0);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacityValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(scaleValue, {
        toValue: 1,
        friction: 4,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setTimeout(() => {
        if (authData) {
          dispatch(setAuth(authData));

          const { returnTo } = route.params || {};
          if (returnTo === 'Cart') {
            navigateToMain('Cart');
          } else {
            navigateToMain();
          }
        } else {
          navigateToMain();
        }
      }, 500);
    });
  }, [authData, dispatch, route.params]);

  const animatedStyle = {
    transform: [{ scale: scaleValue }],
    opacity: opacityValue,
  };

  return (
    <SafeAreaView style={[globalStyles.secondaryContainer, styles.container]}>
      {/* <Animated.Image
        source={require('../../../assets/images/success.png')}
        style={[styles.successImage, animatedStyle]}
        resizeMode="contain"
      /> */}
      <Animated.View style={[animatedStyle]}>
        <SuccessTickIcon size={120} />
      </Animated.View>
      {/* <View style={styles.textContainer}>
        <Typography
          variant={TypographyVariant.H6_BOLD}   
          text={successTitle}
          customTextStyles={styles.title}
        />
      </View> */}

      <View style={styles.textContainer}>
        <Typography
          variant={TypographyVariant.H6_BOLD}
          text={
            screenType === createAccountScreenType
              ? registrationSuccessTitle
              : successTitle
          }
          customTextStyles={styles.title}
        />
        <Typography
          variant={TypographyVariant.PSMALL_REGULAR}
          text={
            screenType === createAccountScreenType
              ? registrationSuccessDesc
              : successDesc
          }
          customTextStyles={styles.desc}
        />
      </View>
    </SafeAreaView>
  );
};

export default AuthSuccessScreen;
