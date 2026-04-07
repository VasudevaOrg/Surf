import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { getScreenHeight, getScreenWidth } from "../../../helpers/screenSize";
import ColorPalette from "../../../config/ColorPalette";
import { Spacing } from "../../../config/globalStyles";
import LocationPinIcon from "../../../assets/icons/LocationPinIcon";
import { Typography } from "../../MainComponents/Typography/Typography";
import { TypographyVariant } from "../../MainComponents/Typography/Typography.types";
import FlowBite from "../../../assets/icons/FlowBite";

interface DeliveryComponentProps {
  onLocationPress?: () => void;
  locationText?: string;
}

const DeliveryComponent: React.FC<DeliveryComponentProps> = ({
  onLocationPress = () => {},
  locationText = "Add delivery location to check extra discount",
}) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.textContainer}>
        <LocationPinIcon size={16} style={undefined} />
        <View style={styles.typographyContainer}>
          <Typography
            text={locationText}
            variant={TypographyVariant.LSMALL_MEDIUM}
            customTextStyles={{ color: ColorPalette.TEXT_GREY_500 }}
            numberOfLines={1}
            ellipsizeMode="tail"
          />
        </View>
      </View>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={onLocationPress}
        activeOpacity={0.7}
      >
        <FlowBite color={ColorPalette.BLUE_300} size={16} style={undefined} />
      </TouchableOpacity>
    </View>
  );
};

// Styles remain outside component for better performance
const styles = StyleSheet.create({
  mainContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: getScreenHeight(2),
    paddingHorizontal: getScreenWidth(4),
    backgroundColor: ColorPalette.BLUE_00,
    borderRadius: Spacing.Small,
  },
  textContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: getScreenWidth(2),
    gap: getScreenWidth(1),
  },
  typographyContainer: {
    flex: 1,
  },
  iconContainer: {
    paddingLeft: getScreenWidth(1),
  },
});

export default React.memo(DeliveryComponent);
