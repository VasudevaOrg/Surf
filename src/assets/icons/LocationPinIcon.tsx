import React from 'react';
import Svg, {Ellipse, Path} from 'react-native-svg';

const LocationPinIcon = ({
  size = 24,
  color = '#4A4A4A',
  strokeWidth = 1,
  style,
}) => {
  // Calculate scaling factor based on original viewBox (12x16) and desired size
  const scale = size / 16;
  const width = 12 * scale;

  return (
    <Svg
      width={width}
      height={size}
      viewBox="0 0 12 16"
      fill="none"
      style={style}>
      <Ellipse
        cx="5.99992"
        cy="5.99992"
        rx="1.66667"
        ry="1.66667"
        stroke={color}
        strokeWidth={strokeWidth}
      />
      <Path
        d="M6.00637 14.6666C5.77057 14.6666 5.66062 14.5657 5.53892 14.2273C5.21879 13.1011 4.62026 12.1273 3.89454 11.2129C3.23727 10.3353 2.26784 9.33566 1.76408 8.19754C0.363964 5.10316 2.53419 1.32817 5.99502 1.33327C9.55163 1.32346 11.6905 5.23396 10.1709 8.363C9.72406 9.15133 9.20178 9.89547 8.61125 10.5852C7.69049 11.6729 6.86299 12.8501 6.47037 14.229C6.38013 14.495 6.26361 14.6666 6.00637 14.6666Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default LocationPinIcon;
