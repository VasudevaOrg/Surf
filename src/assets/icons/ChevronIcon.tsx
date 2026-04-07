import React from 'react';
import Svg, {Path} from 'react-native-svg';
import ColorPalette from '../../config/ColorPalette';
import {TouchableOpacity} from 'react-native';

const ChevronIcon = ({
  size = 11,
  color = ColorPalette.TEXT_GREY_300,
  strokeWidth = 1.5,
  style,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Svg
        width={size}
        height={size * (10 / 11)}
        viewBox="0 0 11 10"
        fill="none"
        style={style}>
        <Path
          d="M5.83353 9C5.83353 9 9.83349 6.05404 9.8335 4.99997C9.83351 3.94589 5.8335 1 5.8335 1"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M1.16678 9C1.16678 9 5.16674 6.05404 5.16675 4.99997C5.16676 3.94589 1.16675 1 1.16675 1"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </TouchableOpacity>
  );
};

export default ChevronIcon;
