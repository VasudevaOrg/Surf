import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, TouchableOpacity, View} from 'react-native';
import Svg, {Path, G, Circle} from 'react-native-svg';
import {Typography} from '../../../components/MainComponents/Typography/Typography';
import {TypographyVariant} from '../../../components/MainComponents/Typography/Typography.types';
import ColorPalette from '../../../config/ColorPalette';
import {getScreenWidth} from '../../../helpers/screenSize';

const SparkleIcon = ({size = 20, color = '#FFFFFF'}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2L14.4 7.2L20 9.6L14.8 12L12 17.2L9.2 12L4 9.6L9.6 7.2L12 2Z"
      fill={color}
    />
    <Path
      d="M18 14L18.9 16.1L21 17L18.9 17.9L18 20L17.1 17.9L15 17L17.1 16.1L18 14Z"
      fill={color}
    />
  </Svg>
);

interface SurfyChatButtonProps {
  onPress: () => void;
}

const SurfyChatButton: React.FC<SurfyChatButtonProps> = ({onPress}) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]),
    );
    pulse.start();
    return () => pulse.stop();
  }, [pulseAnim]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{scale: pulseAnim}],
        },
      ]}>
      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
        activeOpacity={0.9}>
        <View style={styles.content}>
          <SparkleIcon />
          <Typography
            text="Lucy!"
            variant={TypographyVariant.PMEDIUM_BOLD}
            customTextStyles={styles.text}
          />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 90,
    right: 20,
    zIndex: 9999,
  },
  button: {
    backgroundColor: ColorPalette.PURPLE_200 as string,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    // Shadow on the solid-background element (avoids RCTView shadow warning)
    shadowColor: ColorPalette.PURPLE_200 as string,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default SurfyChatButton;
