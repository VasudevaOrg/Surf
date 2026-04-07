import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import ColorPalette from '../../config/ColorPalette';
import { getScreenWidth } from '../../helpers/screenSize';

interface LoadingProgressBarProps {
  isLoading: boolean;
}

const LoadingProgressBar: React.FC<LoadingProgressBarProps> = ({ isLoading }) => {
  const animation = useRef(new Animated.Value(-getScreenWidth(100))).current;

  useEffect(() => {
    if (isLoading) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animation, {
            toValue: getScreenWidth(100),
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(animation, {
            toValue: -getScreenWidth(100),
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    } else {
      animation.stopAnimation();
    }
  }, [isLoading, animation]);

  if (!isLoading) return null;

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.bar,
          {
            transform: [{ translateX: animation }],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 3,
    width: '100%',
    backgroundColor: ColorPalette.BACKGROUND_GREY_30,
    overflow: 'hidden',
    zIndex: 1000,
  },
  bar: {
    height: '100%',
    width: '100%',
    backgroundColor: ColorPalette.HOME_BLUE || '#007AFF',
  },
});

export default LoadingProgressBar;
