import React from "react";
import { TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";

const MicrophoneIcon = ({
  size = 24,
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
        viewBox="0 0 16 20"
        fill="none"
        style={style}
      >
        <Path
          d="M11 4C11 2.34315 9.65685 1 8 1C6.34315 1 5 2.34315 5 4V9C5 10.6569 6.34315 12 8 12C9.65685 12 11 10.6569 11 9V4Z"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
        />
        <Path
          d="M1.5 9C1.5 10.7239 2.18482 12.3772 3.40381 13.5962C4.62279 14.8152 6.27609 15.5 8 15.5C9.72391 15.5 11.3772 14.8152 12.5962 13.5962C13.8152 12.3772 14.5 10.7239 14.5 9M8 19V17"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </TouchableOpacity>
  );
};

export default MicrophoneIcon;
