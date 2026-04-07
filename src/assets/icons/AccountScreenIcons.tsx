import React from 'react';
import Svg, {Path, Circle, Rect, Polyline, Line} from 'react-native-svg';
import {ColorValue} from 'react-native';
import ColorPalette from '../../config/ColorPalette';

interface IconProps {
  size?: number;
  color?: ColorValue;
  strokeWidth?: number;
  style?: any;
}

export const MoneyIcon = ({
  size = 24,
  color = ColorPalette.TEXT_GREY_500,
  strokeWidth = 1.5,
  style,
}: IconProps) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={style}>
      <Rect
        x="2"
        y="6"
        width="20"
        height="12"
        rx="2"
        stroke={color}
        strokeWidth={strokeWidth}
      />
      <Circle cx="12" cy="12" r="2" stroke={color} strokeWidth={strokeWidth} />
      <Path
        d="M6 12H6.01M18 12H18.01"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </Svg>
  );
};

export const FileIcon = ({
  size = 24,
  color = ColorPalette.TEXT_GREY_500,
  strokeWidth = 1.5,
  style,
}: IconProps) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={style}>
      <Path
        d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14 2V8H20"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16 13H8"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16 17H8"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10 9H8"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const InfoIcon = ({
  size = 24,
  color = ColorPalette.TEXT_GREY_500,
  strokeWidth = 1.5,
  style,
}: IconProps) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={style}>
      <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth={strokeWidth} />
      <Path
        d="M12 16V12"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 8H12.01"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const LogoutIcon = ({
  size = 24,
  color = ColorPalette.TEXT_GREY_500,
  strokeWidth = 1.5,
  style,
}: IconProps) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={style}>
      <Path
        d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16 17L21 12L16 7"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M21 12H9"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
