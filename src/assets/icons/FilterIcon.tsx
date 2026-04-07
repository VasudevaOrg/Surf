import React from 'react';
import Svg, {Path} from 'react-native-svg';
import ColorPalette from '../../config/ColorPalette';

const FilterIcon = ({
  size = 15,
  color = ColorPalette.TEXT_GREY_300,
  strokeWidth = 1.5,
  style,
}) => {
  return (
    <Svg
      width={size}
      height={(size * 14) / 15}
      viewBox="0 0 15 14"
      fill="none"
      style={style}>
      <Path
        d="M1.66675 3.6665H3.66675"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M1.66675 10.333H5.66675"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11.6667 10.333L13.6667 10.333"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9.66675 3.6665L13.6667 3.6665"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M3.66675 3.6665C3.66675 3.04525 3.66675 2.73462 3.76824 2.48959C3.90357 2.16289 4.16313 1.90332 4.48984 1.768C4.73486 1.6665 5.04549 1.6665 5.66675 1.6665C6.288 1.6665 6.59863 1.6665 6.84366 1.768C7.17036 1.90332 7.42993 2.16289 7.56525 2.48959C7.66675 2.73462 7.66675 3.04525 7.66675 3.6665C7.66675 4.28776 7.66675 4.59839 7.56525 4.84342C7.42993 5.17012 7.17036 5.42968 6.84366 5.56501C6.59863 5.6665 6.288 5.6665 5.66675 5.6665C5.04549 5.6665 4.73486 5.6665 4.48984 5.56501C4.16313 5.42968 3.90357 5.17012 3.76824 4.84342C3.66675 4.59839 3.66675 4.28776 3.66675 3.6665Z"
        stroke={color}
        strokeWidth={strokeWidth}
      />
      <Path
        d="M7.66675 10.333C7.66675 9.71175 7.66675 9.40112 7.76824 9.1561C7.90357 8.82939 8.16313 8.56983 8.48984 8.4345C8.73486 8.33301 9.04549 8.33301 9.66675 8.33301C10.288 8.33301 10.5986 8.33301 10.8437 8.4345C11.1704 8.56983 11.4299 8.82939 11.5653 9.1561C11.6667 9.40112 11.6667 9.71175 11.6667 10.333C11.6667 10.9543 11.6667 11.2649 11.5653 11.5099C11.4299 11.8366 11.1704 12.0962 10.8437 12.2315C10.5986 12.333 10.288 12.333 9.66675 12.333C9.04549 12.333 8.73486 12.333 8.48984 12.2315C8.16313 12.0962 7.90357 11.8366 7.76824 11.5099C7.66675 11.2649 7.66675 10.9543 7.66675 10.333Z"
        stroke={color}
        strokeWidth={strokeWidth}
      />
    </Svg>
  );
};

export default FilterIcon;
