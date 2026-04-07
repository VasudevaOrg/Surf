// Second SVG (Layout/Columns Icon)
import React from 'react';
import Svg, {Path} from 'react-native-svg';
import ColorPalette from '../../../src/config/ColorPalette';

const LayoutIcon = ({
  size = 28,
  color = ColorPalette.WHITE,
  strokeWidth = 1.5,
  style,
  fill = 'none',
  stroke,
}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill={fill}
      style={style}>
      <Path
        d="M4.66699 18.1673H12.8337M17.5003 13.5007H24.5003V25.1673H17.5003V13.5007ZM4.66699 13.5007H12.8337V25.1673H4.66699V13.5007ZM6.41699 6.18273V13.5007H11.0837V1.83398C7.29199 1.83398 6.41699 5.12223 6.41699 6.18273Z"
        stroke={stroke || color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={fill}
      />
    </Svg>
  );
};

export default LayoutIcon;
