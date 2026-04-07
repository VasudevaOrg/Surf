import React from 'react';
import Svg, {Path} from 'react-native-svg';
import ColorPalette from '../../config/ColorPalette';

const BagIcon = ({
  size = 24,
  color = ColorPalette.WHITE,
  strokeWidth = 1.5,
  style,
  fill = 'none',
  stroke,
}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 26 24"
      fill={fill}
      style={style}>
      <Path
        d="M8.57981 8.5L3.99131 17.2211C1.86704 21.2586 10.7572 22.5 12.9993 22.5C15.2415 22.5 24.1317 21.2586 22.0074 17.2211L17.4189 8.5"
        stroke={stroke || color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={fill}
      />
      <Path
        d="M10.8231 12.2577C11.6052 11.8313 12.2879 12.0031 12.698 12.2769C12.8661 12.3891 12.9502 12.4453 12.9997 12.4453C13.0491 12.4453 13.1332 12.3891 13.3014 12.2769C13.7115 12.0031 14.3941 11.8313 15.1763 12.2577C16.2027 12.8174 16.435 14.6638 14.0673 16.2216C13.6163 16.5183 13.3909 16.6667 12.9997 16.6667C12.6085 16.6667 12.383 16.5183 11.932 16.2216C9.56434 14.6638 9.79661 12.8174 10.8231 12.2577Z"
        stroke={stroke || color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        fill={fill}
      />
      <Path
        d="M7.16605 10.6168C4.83302 11.7564 0.71901 8.07003 1.4103 7.18541L5.49743 1.95531C5.7205 1.66985 6.08388 1.5 6.4715 1.5L8.92433 1.5C9.21442 1.5 9.45783 1.68981 9.5469 1.9384C9.9928 3.18294 11.5553 4.67679 12.9997 4.67684C14.444 4.67689 16.0066 3.18292 16.4525 1.9384C16.5416 1.68981 16.785 1.5 17.0751 1.5L19.5279 1.5C19.9155 1.5 20.2789 1.66985 20.502 1.95531L24.5891 7.18541C25.2804 8.07002 21.1664 11.7564 18.835 10.6168"
        stroke={stroke || color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={fill}
      />
    </Svg>
  );
};

export default BagIcon;
