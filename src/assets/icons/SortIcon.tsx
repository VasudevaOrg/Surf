import React from 'react';
import Svg, {Path} from 'react-native-svg';
import ColorPalette from '../../config/ColorPalette';

const SortIcon = ({
  size = 14,
  color = ColorPalette.TEXT_GREY_300,
  strokeWidth = 1.5,
  style,
}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      style={style}>
      <Path
        d="M3.66675 2.3335V12.3335"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10.3335 11.6665L10.3335 1.6665"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M1.66675 3.6665L3.19534 2.02456C3.41757 1.78585 3.52868 1.6665 3.66675 1.6665C3.80482 1.6665 3.91593 1.78585 4.13815 2.02456L5.66675 3.6665"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8.3335 10.3335L9.86209 11.9754C10.0843 12.2141 10.1954 12.3335 10.3335 12.3335C10.4716 12.3335 10.5827 12.2141 10.8049 11.9754L12.3335 10.3335"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default SortIcon;
