import React from "react";
import { ColorValue } from "react-native";
import Svg, { Path } from "react-native-svg";
import ColorPalette from "../../config/ColorPalette";

interface ShieldIconProps {
    size?: number;
    color?: string | ColorValue;
    strokeWidth?: number;
    style?: any;
}

const ShieldCheckIcon: React.FC<ShieldIconProps> = ({
    size = 20,
    color = ColorPalette.GREEN_250,
    strokeWidth = 1.7,
    style,
}) => {
    return (
        <Svg
            width={size}
            height={size * 1.25} // ratio 15x19
            viewBox="0 0 15 19"
            fill="none"
            style={style}
        >
            {/* Shield Outline */}
            <Path
                d="M14.16 9.99469C14.16 14.1594 11.2447 16.2417 7.77968 17.4495C7.59824 17.5109 7.40115 17.508 7.22162 17.4411C3.74828 16.2417 0.833008 14.1594 0.833008 9.99469V4.16414C0.833008 3.94324 0.920763 3.73138 1.07697 3.57517C1.23317 3.41897 1.44503 3.33121 1.66594 3.33121C3.33181 3.33121 5.41415 2.33169 6.86345 1.06563C7.03992 0.914865 7.26439 0.832031 7.49649 0.832031C7.72858 0.832031 7.95305 0.914865 8.12952 1.06563C9.58715 2.34002 11.6612 3.33121 13.327 3.33121C13.5479 3.33121 13.7598 3.41897 13.916 3.57517C14.0722 3.73138 14.16 3.94324 14.16 4.16414V9.99469Z"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            {/* ✅ Inner Tick Mark */}
            <Path
                d="M5.2 9.8L6.9 11.5L10.6 7.8"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
};

export default ShieldCheckIcon;
