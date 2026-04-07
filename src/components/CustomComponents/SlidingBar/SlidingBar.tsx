import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import ColorPalette from "../../../config/ColorPalette";
import { Typography } from "../../MainComponents/Typography/Typography";
import { TypographyVariant } from "../../MainComponents/Typography/Typography.types";
import { slidingBarStyles } from "./SlidingBar.styles";
import { SlidingBarOption, SlidingBarProps } from "./SlidingBar.types";

export const SlidingBar: React.FC<SlidingBarProps> = ({
  options,
  selectedOption,
  onOptionSelect,
  customContainerStyle,
  customOptionStyle,
  customSelectedStyle,
}) => {
  return (
    <View style={[slidingBarStyles.containerWrapper, customContainerStyle]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={slidingBarStyles.scrollContent}
      >
        {options.map((option: SlidingBarOption, index: number) => {
          // Create the style array with proper precedence
          const optionStyles = [
            slidingBarStyles.option,
            { backgroundColor: ColorPalette.WelcomeBack },
            customOptionStyle, // Apply custom option style
            selectedOption.id === option.id && slidingBarStyles.selectedOption,
            selectedOption.id === option.id && customSelectedStyle,
          ];

          return (
            <TouchableOpacity
              key={option.id}
              style={optionStyles}
              onPress={() => onOptionSelect(option)}
              activeOpacity={0.7}
            >
              <Typography
                variant={TypographyVariant.LMEDIUM_REGULAR}
                text={option.label}
                customTextStyles={[
                  slidingBarStyles.optionText,
                  selectedOption.id === option.id &&
                    slidingBarStyles.selectedOptionText,
                ]}
              />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};
