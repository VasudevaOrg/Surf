import React from "react";
import { TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";

const PlusIconNormal = ({
  size = 24,
  color = "#6C84FE",
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
          d="M7 1.6665V12.3332"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M1.66602 7H12.3327"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </TouchableOpacity>
  );
};

export default PlusIconNormal;
