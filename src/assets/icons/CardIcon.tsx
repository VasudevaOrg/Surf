import React from "react";
import { ColorValue, StyleProp, ViewStyle } from "react-native";
import Svg, { Path } from "react-native-svg";
import ColorPalette from "../../config/ColorPalette";

interface CardIconProps {
    size?: number;
    color?: string | ColorValue;
    strokeWidth?: number;
    style?: StyleProp<ViewStyle>;
}

const CardIcon: React.FC<CardIconProps> = ({
    size = 16,
    color = ColorPalette.HOME_BLUE as string,
    strokeWidth = 1.33,
    style,
}) => {
    return (
        <Svg
            width={size}
            height={(size * 11) / 15}
            viewBox="0 0 15 11"
            fill="none"
            style={style}
        >
            {/* Outer Card Border */}
            <Path
                d="M12.6575 0.666016H1.9984C1.26255 0.666016 0.666016 1.26255 0.666016 1.9984V8.66034C0.666016 9.3962 1.26255 9.99273 1.9984 9.99273H12.6575C13.3934 9.99273 13.9899 9.3962 13.9899 8.66034V1.9984C13.9899 1.26255 13.3934 0.666016 12.6575 0.666016Z"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            {/* Top Inner Line (Card Strip) */}
            <Path
                d="M0.666016 3.33268H13.9899"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
};

export default CardIcon;
