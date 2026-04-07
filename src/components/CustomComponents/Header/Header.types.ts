import {ReactNode} from 'react';
import {ColorValue} from 'react-native';
import {TypographyVariant} from '../../MainComponents/Typography/Typography.types';

export interface HeaderIconProps {
  icon: React.FC<{
    size?: number;
    color?: ColorValue;
    strokeWidth?: number;
    style?: any;
    filled?: boolean;
  }>;
  onPress?: () => void;
  size?: number;
  color?: ColorValue;
  strokeWidth?: number;
  filled?: boolean;
}

export interface HeaderImageProps {
  uri?: string;
  source?: any;
  style?: any;
  onPress?: () => void;
}

export type HeaderRightItem = HeaderIconProps;
export type HeaderLeftItem = HeaderIconProps;

export interface HeaderProps {
  images?: HeaderImageProps[];
  image?: {
    uri?: string;
    source?: any;
    style?: any;
    onPress?: () => void;
  };
  name: string;
  rightIcons?: HeaderRightItem[];
  leftIcons?: HeaderLeftItem[];
  variant?: TypographyVariant;
  textColor?: ColorValue;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  containerStyles?: any;
}
