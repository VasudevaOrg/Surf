import React from "react";
import { TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";

const DoubleChevronIcon = ({
  size = 24,
  color = "#4A4A4A",
  strokeWidth = 1.5,
  style,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Svg
        width={size}
        height={size}
        viewBox="0 0 14 14"
        fill="none"
        style={style}
      >
        <Path
          d="M8 13L12.4665 7.64018C12.7216 7.33408 12.8491 7.18102 12.8491 7C12.8491 6.81898 12.7216 6.66592 12.4665 6.35982L8 1"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M1 13L5.46651 7.64018C5.7216 7.33408 5.84915 7.18102 5.84915 7C5.84915 6.81898 5.7216 6.66592 5.46651 6.35982L1 1"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </TouchableOpacity>
  );
};

export default DoubleChevronIcon;
