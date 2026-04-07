// ToastComponent.tsx
import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { styles } from './ToastComponent.styles';
import { TypographyVariant } from '../Typography/Typography.types';
import ColorPalette from '../../../config/ColorPalette';

type ToastVariant = 'loading' | 'success' | 'error';

export const ToastComponent = ({ text1, props }: any) => {
  const variant: ToastVariant = props?.variant || 'success';

  const getIcon = () => {
    switch (variant) {
      case 'loading':
        return <ActivityIndicator size="small" color={ColorPalette.PURPLE_200_LIGHT} />;

      case 'error':
        return <Text style={{ color: ColorPalette.WHITE, fontSize: 12 }
        }>✕</Text >;

      case 'success':
      default:
        return <Text style={{ color: ColorPalette.WHITE, fontSize: 12 }}>✓</Text>;
    }
  };

  const getIconBg = () => {
    switch (variant) {
      case 'loading':
        return ColorPalette.BLACK;

      case 'error':
        return ColorPalette.RED_300;

      case 'success':
      default:
        return ColorPalette.GREEN_SUCCESS;
    }
  };

  return (
    <View style={styles.customToastContainer}>
      <View style={[styles.iconWrapper, { backgroundColor: getIconBg() }]}>
        {getIcon()}
      </View>

      <Text style={styles.customToastText}>
        {text1}
      </Text>
    </View>
  );
};
