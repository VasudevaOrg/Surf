import { StyleSheet } from "react-native";
import ColorPalette from "../../../../../../config/ColorPalette";
import {
  getScreenHeight,
  getScreenWidth,
} from "../../../../../../helpers/screenSize";
import { Spacing } from "../../../../../../config/globalStyles";

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    paddingVertical: getScreenHeight(2),
    paddingHorizontal: getScreenHeight(2),
    backgroundColor: ColorPalette.WelcomeBack,
  },
  scrollContent: {
    gap: getScreenHeight(2),
  },
  imageContainer: {
    position: "relative",
    width: getScreenWidth(89.5),
    height: getScreenHeight(26.75),
    borderRadius: Spacing.XSmall,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  currentLocation: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: getScreenHeight(2),
    paddingHorizontal: getScreenWidth(4),
    borderRadius: Spacing.Small,
    backgroundColor: ColorPalette.WHITE,
  },
  locationText: {
    display: "flex",
    flexDirection: "column",
    gap: getScreenHeight(0.75),
  },
  rowContainer: {
    display: "flex",
    flexDirection: "row",
    gap: getScreenWidth(1.5),
    alignItems: "center",
    justifyContent: "flex-start",
  },
  textInputContainer: {
    display: "flex",
    flexDirection: "column",
    paddingVertical: getScreenHeight(1.5),
    gap: getScreenHeight(1.5),
    backgroundColor: ColorPalette.WHITE,
    borderRadius: Spacing.Small,
  },
  labelContainer: {
    display: "flex",
    flexDirection: "column",
    paddingVertical: getScreenHeight(2),
    paddingHorizontal: getScreenWidth(4),
    backgroundColor: ColorPalette.WHITE,
    borderRadius: Spacing.Small,
    gap: getScreenHeight(1.5),
  },
  badgeContainer: {
    display: "flex",
    flexDirection: "row",
    gap: getScreenWidth(3),
  },
  bottomSection: {
    paddingVertical: getScreenHeight(1.5),
    paddingHorizontal: getScreenWidth(4),
    backgroundColor: ColorPalette.WHITE,
  },
});
