import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
import { ColorValue } from 'react-native';
import ColorPalette from '../../config/ColorPalette';

interface RoundedCheckIconProps {
    size?: number;
    backgroundColor?: string | ColorValue;
    checkColor?: string | ColorValue;
    style?: any;
}

const RoundedCheckIcon: React.FC<RoundedCheckIconProps> = ({
    size = 24,
    backgroundColor = ColorPalette.HOME_BLUE,
    checkColor = ColorPalette.WHITE,
    style,
}) => {

    return (
        <Svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            style={style}
        >
            {/* Perfect Circle Background */}
            <Circle
                cx="12"
                cy="12"
                r="12"
                fill={backgroundColor}
            />

            {/* Check Path */}
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18.3801 7.08535C18.6091 7.29527 18.6246 7.65109 18.4146 7.8801L10.1646 16.8801C10.061 16.9932 9.91561 17.059 9.76222 17.0624C9.60883 17.0657 9.46074 17.0062 9.35225 16.8978L5.60225 13.1478C5.38258 12.9281 5.38258 12.5719 5.60225 12.3523C5.82192 12.1326 6.17808 12.1326 6.39775 12.3523L9.73233 15.6868L17.5854 7.11991C17.7953 6.8909 18.1511 6.87543 18.3801 7.08535Z"
                fill={checkColor}
            />
        </Svg>
    );
};

export default RoundedCheckIcon;