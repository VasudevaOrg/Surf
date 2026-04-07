import React from 'react';
import { View, TouchableOpacity, ViewStyle } from 'react-native';
import { styles } from './PaymentMethodRow.styles';
import ColorPalette from '../../../../../config/ColorPalette';
import CheckIcon from '../../../../../assets/icons/CheckIcon';
import { Image } from 'react-native';

interface PaymentMethodRowProps {
  isSelected?: boolean;
  onPress: () => void;
  children: React.ReactNode;
  testID?: string;
  style?: ViewStyle;
  imageSource?: any;
}

const PaymentMethodRow: React.FC<PaymentMethodRowProps> = ({
  isSelected,
  onPress,
  children,
  testID,
  style,
  imageSource,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, isSelected && styles.selectedContainer, style]}
      onPress={onPress}
      testID={testID}
      activeOpacity={0.7}>
      <View style={styles.contentContainer}>
        <View style={styles.leftSection}>
          <Image
            source={
              imageSource || require('../../../../../assets/images/paypal.png')
            }
            style={[styles.shippingImage]}
          />
          <View style={styles.leftContent}>{children}</View>
        </View>
        <View style={styles.radioButton}>
          {isSelected && (
            <View style={styles.radioButtonInner}>
              <CheckIcon size={16} checkColor={ColorPalette.WHITE as string} />
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PaymentMethodRow;
