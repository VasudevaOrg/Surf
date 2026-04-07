import {TextStyle, ViewStyle} from 'react-native';

export interface IconConfig {
  id?: string;
  icon: React.ReactNode | string;
  onPress?: () => void;
}

export interface TextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  showPlaceholder?: boolean; // New prop to control placeholder visibility
  autoFocus?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  customContainerStyles?: ViewStyle;
  customInputStyles?: TextStyle;
  customPlaceholderStyles?: TextStyle;
  customLabelStyles?: TextStyle;
  customLabelColorFocused?: string;
  customLabelColorUnfocused?: string;
  error?: string;
  secureTextEntry?: boolean;
  keyboardType?:
    | 'default'
    | 'number-pad'
    | 'email-address'
    | 'phone-pad'
    | 'password';
  showCountrySection?: boolean;
  countryCode?: string;
  countryFlag?: string;
  onCountryPress?: () => void;
  type?: 'email' | 'phone' | 'password' | 'default';
  height?: number;
  width?: number | string;
  leftIcons?: IconConfig[];
  leftText?: string;
  rightIcons?: IconConfig[];
  rightText?: string;
  onRightTextPress?: () => void;
  customBorderColor?: string;
  customFocusedBorderColor?: string;
  customErrorBorderColor?: string;
  customBorderWidth?: number;
  customFocusedBorderWidth?: number;
  customErrorBorderWidth?: number;
  disabled?: boolean;
  disabledBackgroundColor?: string;
  multiline?: boolean;
  numberOfLines?: number;
}
