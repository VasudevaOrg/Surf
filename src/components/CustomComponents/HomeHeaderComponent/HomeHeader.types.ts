import {ReactNode} from 'react';

export interface HomeHeaderIconProps {
  icon: React.FC<{
    size?: number;
    color?: string;
    strokeWidth?: number;
    style?: any;
  }>;
  onPress?: () => void;
  size?: number;
  color?: string;
  strokeWidth?: number;
}
export type HeaderRightItem = HomeHeaderIconProps;
export type HeaderLeftItem = HomeHeaderIconProps;

export interface HomeHeaderImageProps {
  uri?: string;
  source?: any;
  style?: any;
  onPress?: () => void;
}

export interface HomeHeaderProps {
  addressMain: string;
  subAddress: string;
  rightIcons?: HeaderRightItem[];
  leftIcons?: HeaderLeftItem[];
  leftIcon?: ReactNode;
  containerStyles?: StyleSheet;
}
