import React from 'react';
import Svg, {Path} from 'react-native-svg';

const MicroPhoneFill = ({
  size = 18,
  color = '#4A4A4A',
  strokeWidth = 1.25,
  style,
  onPress,
}: {
  size?: number;
  color?: string;
  strokeWidth?: number;
  style?: any;
  onPress?: () => void;
}) => {
  // Calculate width to maintain the original proportions (14:18)
  const width = size * (14 / 18);

  return (
    <TouchableOpacity onPress={onPress}>
      <Svg
        width={width}
        height={size}
        viewBox="0 0 14 18"
        fill="none"
        style={style}>
        <Path
          d="M9.50098 4C9.50098 2.61929 8.38169 1.5 7.00098 1.5C5.62026 1.5 4.50098 2.61929 4.50098 4V8.16667C4.50098 9.54738 5.62026 10.6667 7.00098 10.6667C8.38169 10.6667 9.50098 9.54738 9.50098 8.16667V4Z"
          fill={color}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
        />
        <Path
          d="M1.58398 8.16602C1.58398 9.6026 2.15467 10.9804 3.17049 11.9962C4.18631 13.012 5.56406 13.5827 7.00065 13.5827C8.43724 13.5827 9.81499 13.012 10.8308 11.9962C11.8466 10.9804 12.4173 9.6026 12.4173 8.16602M7.00065 16.4993V14.8327"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </TouchableOpacity>
  );
};

import {TouchableOpacity} from 'react-native';

export default MicroPhoneFill;
