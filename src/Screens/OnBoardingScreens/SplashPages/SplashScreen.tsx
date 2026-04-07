import React, { useEffect, useRef } from 'react';
import { Animated, View, Image } from 'react-native';
import { Typography } from '../../../components/MainComponents/Typography/Typography';
import { TypographyVariant } from '../../../components/MainComponents/Typography/Typography.types';
import { globalStyles } from '../../../config/globalStyles';
import { styles } from './SplashScreen.styles';
import { STATIC_TEXT } from '../../../config/staticText';

import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { CommonActions } from '@react-navigation/native';

const { surfCaption } = STATIC_TEXT.screens.onboarding;

const SplashScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        if (isAuthenticated) {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'MainScreens' }],
            }),
          );
        } else {
          navigation.replace('WelcomeScreen');
        }
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation, fadeAnim, isAuthenticated]);

  return (
    <Animated.View
      style={[
        { ...globalStyles.primaryContainer, ...styles.mainContainer },
        { opacity: fadeAnim },
      ]}>
      <Image
        source={require('../../../assets/images/SurfSplash.png')}
        style={styles.surfSplashImage}
        resizeMode="contain"
      />
      <View style={styles.footerContainer}>
        <Typography
          variant={TypographyVariant.PMEDIUM_REGULAR}
          text={surfCaption}
          customTextStyles={styles.footerText}
        />
      </View>
    </Animated.View>
  );
};

export default SplashScreen;
