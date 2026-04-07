import React from "react";
import Svg, { Path } from "react-native-svg";

const HistoryIcon = ({
  size = 22,
  color = "#8E8E8E",
  strokeWidth = 1,
  style,
}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 22 22"
      fill="none"
      style={style}
    >
      <Path
        d="M4.04798 7.60657L1.53784 7.45376C3.33712 2.70477 8.503 -8.60404e-05 13.5396 1.34474C18.904 2.77711 22.0904 8.26107 20.6565 13.5935C19.2227 18.926 13.7116 22.0876 8.3472 20.6553C4.36419 19.5917 1.58192 16.2946 1 12.4844"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11 7V11L13 13"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default HistoryIcon;
