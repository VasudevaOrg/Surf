import React from "react";
import Svg, { Path, G, Defs, ClipPath, Rect } from "react-native-svg";
import ColorPalette from "../../config/ColorPalette";

const RevolutIcon = ({ size = 24, color = "black", style }) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 25"
      fill="none"
      style={style}
    >
      <G clipPath="url(#clip0_1111_21724)">
        <Path
          d="M20.9128 7.4946C20.9128 3.6576 17.7898 0.537598 13.9498 0.537598H2.42383V4.3976H13.4018C15.1398 4.3976 16.5788 5.7636 16.6108 7.4416C16.6199 7.85415 16.5459 8.26432 16.3934 8.64774C16.2409 9.03116 16.0128 9.38002 15.7228 9.6736C15.4349 9.96898 15.0905 10.2035 14.7102 10.3633C14.3299 10.523 13.9213 10.6047 13.5088 10.6036H9.23183C9.15898 10.6039 9.08918 10.6329 9.03767 10.6844C8.98615 10.7359 8.95709 10.8057 8.95683 10.8786V14.3096C8.95683 14.3696 8.97416 14.4236 9.00883 14.4716L16.2648 24.5376H21.5758L14.3028 14.4436C17.9658 14.2596 20.9128 11.1836 20.9128 7.4946ZM6.89383 6.4606H2.42383V24.5376H6.89383V6.4606Z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1111_21724">
          <Rect width="24" height="24" fill="white" y="0.537598" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default RevolutIcon;
