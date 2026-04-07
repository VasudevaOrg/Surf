import React from "react";
import Svg, { Path } from "react-native-svg";
import ColorPalette from "../../config/ColorPalette";

const ChevronRightIcon = ({
  size = 8,
  color = ColorPalette.TEXT_GREY_300,
  strokeWidth = 1.5,
  style,
}) => {
  return (
    <Svg
      width={size}
      height={size * (12 / 8)}
      viewBox="0 0 8 12"
      fill="none"
      style={style}
    >
      <Path
        d="M1.5 11L5.79289 6.70711C6.12623 6.37377 6.29289 6.20711 6.29289 6C6.29289 5.79289 6.12623 5.62623 5.79289 5.29289L1.5 1"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default ChevronRightIcon;
