import React from 'react';
import {TouchableOpacity} from 'react-native';
import Svg, {Circle, Path} from 'react-native-svg';

const InfoRightIcon = ({
  size = 12,
  color = 'white',
  strokeWidth = 1,
  style,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Svg
        width={size}
        height={size}
        viewBox="0 0 12 12"
        fill="none"
        style={style}>
        <Circle cx="6" cy="6" r="5" stroke={color} strokeWidth={strokeWidth} />
        <Path
          d="M8 6L4 6M8 6C8 6.35011 7.00285 7.00424 6.75 7.25M8 6C8 5.64989 7.00285 4.99576 6.75 4.75"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </TouchableOpacity>
  );
};

export default InfoRightIcon;
