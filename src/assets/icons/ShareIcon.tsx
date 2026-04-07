import React from "react";
import Svg, { Path } from "react-native-svg";

const ShareIcon = ({
  size = 24,
  color = "#4A4A4A",
  strokeWidth = 1.5,
  style,
}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 21 20"
      fill="none"
      style={style}
    >
      <Path
        d="M19.4609 4.5C19.4609 6.15685 18.1178 7.5 16.4609 7.5C14.8041 7.5 13.4609 6.15685 13.4609 4.5C13.4609 2.84315 14.8041 1.5 16.4609 1.5C18.1178 1.5 19.4609 2.84315 19.4609 4.5Z"
        stroke={color}
        strokeWidth={strokeWidth}
      />
      <Path
        d="M7.46094 10C7.46094 11.6569 6.11779 13 4.46094 13C2.80408 13 1.46094 11.6569 1.46094 10C1.46094 8.34315 2.80408 7 4.46094 7C6.11779 7 7.46094 8.34315 7.46094 10Z"
        stroke={color}
        strokeWidth={strokeWidth}
      />
      <Path
        d="M19.4609 15.5C19.4609 17.1569 18.1178 18.5 16.4609 18.5C14.8041 18.5 13.4609 17.1569 13.4609 15.5C13.4609 13.8431 14.8041 12.5 16.4609 12.5C18.1178 12.5 19.4609 13.8431 19.4609 15.5Z"
        stroke={color}
        strokeWidth={strokeWidth}
      />
      <Path
        d="M7.18945 8.74946L13.6895 5.75M7.18945 11.25L13.6895 14.2495"
        stroke={color}
        strokeWidth={strokeWidth}
      />
    </Svg>
  );
};

export default ShareIcon;
