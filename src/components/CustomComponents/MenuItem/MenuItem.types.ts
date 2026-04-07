import {StyleProp, ViewStyle, TextStyle} from 'react-native';
import {TypographyVariant} from '../../MainComponents/Typography/Typography.types';

export interface MenuItemProps {
  label: string;
  onPress: () => void;
  image?: any;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  testID?: string;
  disabled?: boolean;
  variant?: TypographyVariant;
  containerStyle?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  leftIconContainerStyle?: StyleProp<ViewStyle>;
  rightIconContainerStyle?: StyleProp<ViewStyle>;
  subtitle?: string;
  leftIconBackgroundColor?: string;
  showBottomBorder?: boolean;
  isLastItem?: boolean;
}
