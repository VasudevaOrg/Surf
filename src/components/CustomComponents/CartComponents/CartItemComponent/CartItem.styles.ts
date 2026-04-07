import { StyleSheet } from "react-native";
import ColorPalette from "../../../../config/ColorPalette";
import { BorderRadius, Spacing } from "../../../../config/globalStyles";
import {
  getScreenHeight,
  getScreenWidth,
} from "../../../../helpers/screenSize";

/**
 * Creates styles for the BestSellerCard component with responsive measurements
 * and consistent design elements.
 *
 * @returns {Object} StyleSheet object containing all styles for BestSellerCard
 */
export const createBestSellerCardStyles = () => {
  return StyleSheet.create({
    container: {
      borderRadius: Spacing.Small,
      backgroundColor: ColorPalette.WHITE,
      overflow: "hidden",
      width: "100%",
      borderWidth: 1.5,
      borderColor: ColorPalette.BACKGROUND_GREY_100,
    },
    touchableContainer: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      gap: getScreenWidth(3),
      paddingVertical: getScreenHeight(2),
      paddingHorizontal: getScreenWidth(3.5),
    },
    imageContainer: {
      position: "relative",
      width: getScreenWidth(24.5),
      height: getScreenHeight(12.25),
      backgroundColor: ColorPalette.WelcomeBack,
      borderRadius: Spacing.XSmall,
      overflow: "hidden",
      justifyContent: "center",
      alignItems: "center",
    },
    image: {
      width: "100%",
      height: "100%",
      resizeMode: "cover",
    },
    contentContainer: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "space-between",
    },
    priceRatingContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: getScreenWidth(1),
      padding: getScreenWidth(0.5),
    },
    buttonContainer: {
      width: "100%",
    },
    customButton: {
      borderColor: ColorPalette.ROSE_PURPLE_300,
      borderWidth: 1,
      borderRadius: getScreenWidth(3.5),
    },
    customText: {
      color: ColorPalette.ROSE_PURPLE_300,
    },
    actionContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
    },

    incrementContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",

      backgroundColor: ColorPalette.BACKGROUND_GREY_50,
      borderRadius: BorderRadius.Large,

      paddingHorizontal: getScreenWidth(3.2),
      paddingVertical: getScreenHeight(0.8),
      gap: getScreenWidth(3),
    },

  });
};
