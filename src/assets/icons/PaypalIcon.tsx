import React from 'react';
import { ColorValue } from 'react-native';
import Svg, { Path, SvgProps } from 'react-native-svg';

interface IconProps extends SvgProps {
  width?: number;
  height?: number;
  color?: string | ColorValue;
}

const PaypalIcon: React.FC<IconProps> = ({
  width = 10,
  height = 14,
  color = '#6A7282',
  ...props
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 10 14"
      fill="none"
      {...props}
    >
      <Path
        d="M-0.000266299 13.0918V0.000887394H4.66593C5.68439 0.000887394 6.52814 0.186257 7.19718 0.556995C7.86621 0.927734 8.36692 1.43484 8.69931 2.0783C9.03169 2.71751 9.19789 3.43768 9.19789 4.23881C9.19789 5.04421 9.02956 5.76864 8.69292 6.41211C8.36053 7.05131 7.85769 7.55842 7.18439 7.93342C6.51536 8.30415 5.67374 8.48952 4.65953 8.48952H1.45073V6.81481H4.48056C5.12402 6.81481 5.64604 6.70401 6.04661 6.48242C6.44718 6.25657 6.74121 5.94975 6.92871 5.56197C7.11621 5.17418 7.20996 4.73313 7.20996 4.23881C7.20996 3.7445 7.11621 3.30558 6.92871 2.92205C6.74121 2.53853 6.44505 2.2381 6.04022 2.02077C5.63965 1.80344 5.11124 1.69478 4.45499 1.69478H1.97488V13.0918H-0.000266299Z"
        fill={color}
      />
    </Svg>
  );
};

export default PaypalIcon;