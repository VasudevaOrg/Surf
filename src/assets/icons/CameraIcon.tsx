import React from 'react';
import Svg, {Path, Circle} from 'react-native-svg';

const CameraIcon = ({
  size = 24,
  color = '#4A4A4A',
  strokeWidth = 1.5,
  style,
}: any) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={style}>
      <Path
        d="M9 3H15L17 5H21C22.1 5 23 5.9 23 7V19C23 20.1 22.1 21 21 21H3C1.9 21 1 20.1 1 19V7C1 5.9 1.9 5 3 5H7L9 3Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle
        cx="12"
        cy="13"
        r="4"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default CameraIcon;
