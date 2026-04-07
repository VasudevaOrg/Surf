import React from "react";
import Svg, { Path } from "react-native-svg";
import ColorPalette from "../../config/ColorPalette";

const LockIcon = ({
  size = 18,
  color = ColorPalette.TEXT_GREY_300,
  strokeWidth = 1.5,
  style,
}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 18 22"
      fill="none"
      style={style}
    >
      <Path
        d="M11.491 14.5H11.5M6.5 14.5H6.50897"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M1.26781 17.8447C1.49269 19.515 2.87613 20.8235 4.55966 20.9009C5.97627 20.966 7.4153 21 9 21C10.5847 21 12.0237 20.966 13.4403 20.9009C15.1239 20.8235 16.5073 19.515 16.7322 17.8447C16.879 16.7547 17 15.6376 17 14.5C17 13.3624 16.879 12.2453 16.7322 11.1553C16.5073 9.48502 15.1239 8.17649 13.4403 8.09909C12.0237 8.03397 10.5847 8 9 8C7.4153 8 5.97627 8.03397 4.55966 8.09909C2.87613 8.17649 1.49269 9.48502 1.26781 11.1553C1.12105 12.2453 1 13.3624 1 14.5C1 15.6376 1.12105 16.7547 1.26781 17.8447Z"
        stroke={color}
        strokeWidth={strokeWidth}
      />
      <Path
        d="M4.5 8V5.5C4.5 3.01472 6.51472 1 9 1C11.4853 1 13.5 3.01472 13.5 5.5V8"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default LockIcon;
