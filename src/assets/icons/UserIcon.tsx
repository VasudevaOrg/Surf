import React from "react";
import Svg, { Path } from "react-native-svg";

const UserIcon = ({ width = 32, height = 32, style }) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      style={style}
    >
      <Path
        d="M25.3337 28V25.3333C25.3337 22.3898 22.9439 20 20.0003 20H12.0003C9.05678 20 6.66699 22.3898 6.66699 25.3333V28"
        stroke="white"
        strokeWidth={2.66667}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10.667 9.33333C10.667 12.2769 13.0568 14.6667 16.0003 14.6667C18.9439 14.6667 21.3337 12.2769 21.3337 9.33333C21.3337 6.38979 18.9439 4 16.0003 4C13.0568 4 10.667 6.38979 10.667 9.33333V9.33333"
        stroke="white"
        strokeWidth={2.66667}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default UserIcon;
