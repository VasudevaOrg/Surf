import React from "react";
import { TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";
import ColorPalette from "../../config/ColorPalette";

const StarOutlineIcon = ({
    size = 30,
    strokeColor = ColorPalette.YELLOW_300,
    strokeWidth = 4,
    style,
    onPress,
}) => {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
            <Svg
                width={size}
                height={size}
                viewBox="0 0 30 30"
                fill="none"
                style={style}
            >
                <Path
                    d="M17.3034 3.59256L19.6498 8.32416C19.9697 8.98282 20.823 9.61459 21.5429 9.73557L25.7957 10.448C28.5154 10.905 29.1554 12.8944 27.1956 14.857L23.8893 18.1906C23.3294 18.7552 23.0227 19.844 23.196 20.6236L24.1426 24.7503C24.8892 28.0167 23.1694 29.2803 20.303 27.5731L16.3168 25.1939C15.5969 24.7638 14.4103 24.7638 13.6771 25.1939L9.69086 27.5731C6.83784 29.2803 5.1047 28.0033 5.85128 24.7503L6.79785 20.6236C6.97116 19.844 6.66453 18.7552 6.10459 18.1906L2.79829 14.857C0.851837 12.8944 1.47844 10.905 4.19813 10.448L8.451 9.73557C9.15759 9.61459 10.0108 8.98282 10.3308 8.32416L12.6772 3.59256C13.9571 1.02514 16.0368 1.02514 17.3034 3.59256Z"
                    fill="none"
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </Svg>
        </TouchableOpacity>
    );
};

export default StarOutlineIcon;