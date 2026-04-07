import React from "react";
import { TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";

const PlusIcon = ({
  size = 22,
  color = "#606060",
  strokeWidth = 1.5,
  style,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Svg
        width={size}
        height={size}
        viewBox="0 0 22 22"
        fill="none"
        style={style}
      >
        <Path
          d="M11 7V15M15 11L7 11"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* <Path
          d="M21 11C21 5.47715 16.5228 1 11 1C5.47715 1 1 5.47715 1 11C1 16.5228 5.47715 21 11 21C16.5228 21 21 16.5228 21 11Z"
          stroke={color}
          strokeWidth={strokeWidth}
        /> */}
      </Svg>
    </TouchableOpacity>
  );
};

export default PlusIcon;
