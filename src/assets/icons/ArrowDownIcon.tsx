import React from 'react';
import Svg, {Path} from 'react-native-svg';
import ColorPalette from '../../../src/config/ColorPalette';

const ArrowDownIcon = ({
  size = 16,
  color = ColorPalette.TEXT_GREY_300,
  strokeWidth = 1.5,
  style,
}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      style={style}>
      <Path
        d="M12 6.40002L8 10.4L4 6.40002"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default ArrowDownIcon;
