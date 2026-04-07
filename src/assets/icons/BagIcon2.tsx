import React from "react";
import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg";

interface BagIconProps {
  size?: number;
  color?: string;
}

const BagIcon2: React.FC<BagIconProps> = ({
  size = 16,
  color = "#9010CF",
}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
    >
      <G clipPath="url(#clip0)">
        <Path
          d="M3.99761 1.33203L1.99902 3.99681V13.3235C1.99902 13.6769 2.1394 14.0158 2.38927 14.2657C2.63914 14.5155 2.97804 14.6559 3.33141 14.6559H12.6581C13.0115 14.6559 13.3504 14.5155 13.6003 14.2657C13.8501 14.0158 13.9905 13.6769 13.9905 13.3235V3.99681L11.9919 1.33203H3.99761Z"
          stroke={color}
          strokeWidth={1.33239}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <Path
          d="M1.99902 3.99805H13.9905"
          stroke={color}
          strokeWidth={1.33239}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <Path
          d="M10.6587 6.66211C10.6587 7.36885 10.3779 8.04665 9.87816 8.54639C9.37842 9.04613 8.70062 9.32689 7.99388 9.32689C7.28714 9.32689 6.60934 9.04613 6.1096 8.54639C5.60985 8.04665 5.3291 7.36885 5.3291 6.66211"
          stroke={color}
          strokeWidth={1.33239}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>

      <Defs>
        <ClipPath id="clip0">
          <Rect width="15.9887" height="15.9887" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default BagIcon2;
