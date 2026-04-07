import React from "react";
import Svg, { Ellipse, Path } from "react-native-svg";
import ColorPalette from "../../config/ColorPalette";

const CarIcon = ({
  size = 16,
  color = ColorPalette.TEXT_GREY_300,
  strokeWidth = 1,
  style,
}) => {
  // Adjusting viewBox ratio to maintain the original proportions
  const width = size;
  const height = (12 / 16) * size;

  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 16 12"
      fill="none"
      style={style}
    >
      <Ellipse
        cx="11.3333"
        cy="9.99984"
        rx="1.33333"
        ry="1.33333"
        stroke={color}
        strokeWidth={strokeWidth}
      />
      <Ellipse
        cx="4.66634"
        cy="9.99984"
        rx="1.33333"
        ry="1.33333"
        stroke={color}
        strokeWidth={strokeWidth}
      />
      <Path
        d="M3.33301 9.98147C2.60186 9.94502 2.14574 9.83626 1.82116 9.51168C1.49658 9.1871 1.38782 8.73099 1.35137 7.99984M5.99967 9.99984H9.99967M12.6663 9.98147C13.3975 9.94502 13.8536 9.83626 14.1782 9.51168C14.6663 9.02353 14.6663 8.23785 14.6663 6.6665V5.33317L11.533 5.33317C11.0367 5.33317 10.7885 5.33317 10.5877 5.26791C10.1817 5.13602 9.86349 4.81778 9.7316 4.41186C9.66634 4.21102 9.66634 3.96285 9.66634 3.4665C9.66634 2.72199 9.66634 2.34974 9.56845 2.04847C9.37062 1.43959 8.89325 0.962227 8.28438 0.764391C7.98311 0.666504 7.61085 0.666504 6.86634 0.666504L1.33301 0.666504"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M1.33301 3.33301L5.33301 3.33301"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M1.33301 5.33301L3.99967 5.33301"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9.66602 2L10.8802 2C11.8504 2 12.3355 2 12.7303 2.23581C13.1251 2.47161 13.3551 2.89874 13.8151 3.753L14.666 5.33333"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default CarIcon;
