import React from 'react';
import Svg, {Path, G, Mask, Rect} from 'react-native-svg';

const NewTag = ({
  width = 64,
  height = 33,
  style,
  backgroundColor = '#770D55',
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 64 33"
      fill="none"
      style={style}>
      {/* Added background fill */}
      <Path
        d="M63.9975 19.2534H0.321045L19.6039 0H63.9975L56.5263 9.6267L63.9975 19.2534Z"
        fill={backgroundColor}
      />

      <Mask
        id="mask0_845_1135"
        maskType="luminance"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="65"
        height="20">
        <Path d="M0.200684 0H64.001V19.3966H0.200684V0Z" fill="white" />
      </Mask>
      <G mask="url(#mask0_845_1135)">
        <Path
          d="M63.9975 19.2534H0.321045L19.6039 0H63.9975L56.5263 9.6267L63.9975 19.2534Z"
          fill={backgroundColor}
        />
      </G>
      <Mask
        id="mask1_845_1135"
        maskType="luminance"
        maskUnits="userSpaceOnUse"
        x="0"
        y="19"
        width="14"
        height="14">
        <Path d="M0 19.2427H13.841V32.2338H0V19.2427Z" fill="white" />
      </Mask>
      <G mask="url(#mask1_845_1135)">
        <Path
          d="M13.7682 19.2556H0.318878L0 19.5753V31.6547C0 32.1709 0.62305 32.4287 0.986818 32.0641L13.7682 19.2556Z"
          fill="#4A0835"
        />
      </G>
      <Path
        d="M29.9606 11.5913L26.6333 4.72461H24.4778V14.0967H26.1635V7.336L29.4784 14.0967H31.6471V4.72461H29.9606V11.5913Z"
        fill="white"
      />
      <Path
        d="M34.3421 4.72461H33.7051V14.1029H39.9735V12.4001H35.4682V10.2972H39.2653V8.59448H35.4682V6.42735H39.9735V4.72461H34.3421Z"
        fill="white"
      />
      <Path
        d="M49.8332 4.72461L48.6296 10.9806L46.841 4.72461H45.4254L43.6359 10.9806L42.4324 4.72461H40.6174L42.7737 14.1029H44.4339L46.1715 7.54962L47.8317 14.1029H49.4926L51.6481 4.72461H49.8332Z"
        fill="white"
      />
    </Svg>
  );
};

export default NewTag;
