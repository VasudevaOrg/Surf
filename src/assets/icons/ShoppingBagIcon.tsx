import React from 'react';
import Svg, { Path } from 'react-native-svg';
import ColorPalette from '../../../src/config/ColorPalette';

const ShoppingBagIcon = ({
  size = 28,
  color = ColorPalette.WHITE,
  strokeWidth = 1.5,
  style = {},
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
        d="M23.0989 18.1864L23.7903 14.2496C23.9143 13.5435 24.3868 12.9362 25.0615 12.6161C25.2242 12.5389 25.3402 12.3947 25.3759 12.2254C25.5745 11.2832 26.1022 9.97204 24.9219 9.45164C24.655 9.33398 24.2906 9.33398 23.5617 9.33398L8.74967 9.33398L4.43764 9.33398C3.70876 9.33398 3.34432 9.33398 3.07748 9.45164C1.89715 9.97204 2.42488 11.2832 2.62344 12.2254C2.65911 12.3947 2.77513 12.5389 2.93783 12.6161C3.61252 12.9362 4.08507 13.5434 4.20909 14.2496L4.90044 18.1864C5.20462 19.9185 5.30861 22.3939 6.82654 23.6143C7.94024 24.5006 9.54489 24.5007 12.7542 24.5007L15.2451 24.5007C18.4545 24.5007 20.0591 24.5006 21.1728 23.6143C22.6907 22.394 22.7947 19.9185 23.0989 18.1864Z"
        stroke={stroke ?? color}
        fill={fill}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <Path
        d="M16.3327 14L11.666 14"
        stroke={stroke ?? color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7.58301 12.8333L11.6663 3.5M17.4997 3.5L20.4163 9.33333"
        stroke={stroke ?? color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </Svg>
  );
};

export default ShoppingBagIcon;
