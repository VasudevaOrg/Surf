import React from "react";
import Svg, { Path } from "react-native-svg";
import ColorPalette from "../../config/ColorPalette";

const TruckDeliveryIcon2 = ({
  size = 20,
  color = ColorPalette.HOME_BLUE,
  strokeWidth = 1.6,
  style,
}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      style={style}
    >
      <Path
        d="M11.2095 14.7991V5.19117C11.2095 4.76647 11.0408 4.35917 10.7405 4.05886C10.4402 3.75855 10.0329 3.58984 9.60819 3.58984H3.20289C2.77819 3.58984 2.37089 3.75855 2.07058 4.05886C1.77027 4.35917 1.60156 4.76647 1.60156 5.19117V13.9985C1.60156 14.2108 1.68592 14.4145 1.83607 14.5646C1.98622 14.7148 2.18988 14.7991 2.40222 14.7991H4.00355"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <Path
        d="M12.01 14.7988H7.20605"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <Path
        d="M15.2123 14.7996H16.8136C17.026 14.7996 17.2296 14.7152 17.3798 14.5651C17.5299 14.4149 17.6143 14.2113 17.6143 13.9989V11.0765C17.614 10.8948 17.5518 10.7186 17.4381 10.5769L14.6518 7.09402C14.5769 7.00024 14.4819 6.9245 14.3738 6.87239C14.2657 6.82028 14.1473 6.79314 14.0273 6.79297H11.209"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <Path
        d="M13.6111 16.3999C14.4955 16.3999 15.2124 15.683 15.2124 14.7986C15.2124 13.9142 14.4955 13.1973 13.6111 13.1973C12.7267 13.1973 12.0098 13.9142 12.0098 14.7986C12.0098 15.683 12.7267 16.3999 13.6111 16.3999Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <Path
        d="M5.60425 16.3999C6.48864 16.3999 7.20558 15.683 7.20558 14.7986C7.20558 13.9142 6.48864 13.1973 5.60425 13.1973C4.71987 13.1973 4.00293 13.9142 4.00293 14.7986C4.00293 15.683 4.71987 16.3999 5.60425 16.3999Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default TruckDeliveryIcon2;
