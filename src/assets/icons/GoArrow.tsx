import React from "react";
import { TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";

const GoArrow = ({
  size = 24,
  color = "#8E8E8E",
  strokeWidth = 1,
  style,
  onPress,
}) => {
  const content = (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      style={style}>
      <Path
        d="M2 2L13 13"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <Path
        d="M1 8V2C1 1.5286 1 1.29289 1.14645 1.14645C1.29289 1 1.5286 1 2 1H8"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );

  if (onPress) {
    return <TouchableOpacity onPress={onPress}>{content}</TouchableOpacity>;
  }

  return content;
};

export default GoArrow;
