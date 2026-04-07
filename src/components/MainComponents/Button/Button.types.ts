import {
  StyleProp,
  TextStyle,
  ViewStyle,
  ImageSourcePropType,
  ImageResizeMode,
} from 'react-native';

export enum ButtonSize {
  LARGE = 'large',
  MEDIUM = 'medium',
  SMALL = 'small',
  SEMILARGE = 'semilarge',
}

export enum ButtonVariant {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

export enum ButtonType {
  PRIMARY = 'primary',
  OUTLINED = 'outlined',
  TERTIARY = 'tertiary',
  LINK = 'link',
}

export enum ButtonState {
  DEFAULT = 'default',
  HOVERED = 'hovered',
  PRESSED = 'pressed',
  FOCUSED = 'focused',
  DISABLED = 'disabled',
  AI = 'ai',
  FILEUPLOAD = 'fileupload',
}

export interface ImageItem {
  source: ImageSourcePropType;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>; // Added container style for each image
  resizeMode?: ImageResizeMode;
}

export interface ButtonProps {
  text: string;
  onPress: () => void;
  size?: ButtonSize;
  variant?: ButtonVariant;
  type?: ButtonType;
  state?: ButtonState;
  disabled?: boolean;
  // Legacy icon support
  IconComponent?: React.ComponentType<any>;
  iconPosition?: 'left' | 'right';
  // New icon support
  leftIcon?: React.ComponentType<any>;
  rightIcon?: React.ComponentType<any>;
  // Support for multiple images on either side
  leftImages?: ImageItem[];
  rightImages?: ImageItem[];
  useGradient?: boolean;
  customStyles?: StyleProp<ViewStyle>;
  customTextStyles?: StyleProp<TextStyle>;
  bgColor?: string;
  withShadow?: boolean;
  iconSize?: number;
  iconColor?: string;
  imageContainerStyle?: StyleProp<ViewStyle>;
  loading?: boolean;
  imageOverlapOffset?: number;
}
