import React from "react";
import Svg, { Path } from "react-native-svg";

const BoxIcon = ({ size = 20, color = "#333333", style }) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      style={style}
    >
      <Path
        d="M9.16667 18.1079C9.68233 18.4056 10.3177 18.4056 10.8333 18.1079L16.6667 14.7746C17.1818 14.4772 17.4994 13.9278 17.5 13.3329V6.66626C17.4994 6.07143 17.1818 5.52201 16.6667 5.22459L10.8333 1.89126C10.3177 1.59354 9.68233 1.59354 9.16667 1.89126L3.33333 5.22459C2.81819 5.52201 2.50061 6.07143 2.5 6.66626V13.3329C2.50061 13.9278 2.81819 14.4772 3.33333 14.7746L9.16667 18.1079M10 18.3329V9.99959"
        stroke={color}
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <Path
        d="M2.74121 5.83359L9.99954 10.0003L17.2579 5.83359M6.24954 3.55859L13.7495 7.85026"
        stroke={color}
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default BoxIcon;
