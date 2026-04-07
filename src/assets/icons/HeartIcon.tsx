import React from "react";
import Svg, { Path } from "react-native-svg";

const HeartIcon = ({
  size = 24,
  color = "#4A4A4A",
  strokeWidth = 1.5,
  style,
  filled = false,
}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={style}
    >
      <Path
        d="M20.3999 8.1001C20.3999 5.61482 18.3012 3.6001 15.7124 3.6001C13.7768 3.6001 12.1152 4.72638 11.3999 6.33352C10.6846 4.72638 9.02302 3.6001 7.0874 3.6001C4.49857 3.6001 2.3999 5.61482 2.3999 8.1001C2.3999 15.3207 11.3999 20.1001 11.3999 20.1001C11.3999 20.1001 20.3999 15.3207 20.3999 8.1001Z"
        transform="translate(0.5 0.9)"
        fill={filled ? color : "none"}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default HeartIcon;
