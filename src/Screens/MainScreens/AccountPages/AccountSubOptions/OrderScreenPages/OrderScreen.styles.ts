import { StyleSheet } from "react-native";
import ColorPalette from "../../../../../config/ColorPalette";
import {
  getScreenHeight,
  getScreenWidth,
} from "../../../../../helpers/screenSize";
import { Spacing } from "../../../../../config/globalStyles";

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    paddingVertical: getScreenHeight(2),
    paddingHorizontal: getScreenHeight(2),
    backgroundColor: ColorPalette.WelcomeBack,
  },
  scrollContent: {
    gap: getScreenHeight(1.2),
  },
  firstContainer: {
    display: "flex",
    flexDirection: "column",
    paddingVertical: getScreenHeight(2),
    paddingHorizontal: getScreenWidth(4),
    gap: getScreenHeight(2),
    borderRadius: Spacing.Small,
    backgroundColor: ColorPalette.WHITE,
  },
  subOne: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  searchBoxContainer: {
    flex: 1,
    flexDirection: "row",
    position: "relative",
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    paddingRight: getScreenWidth(10),
  },
  micIconContainer: {
    position: "absolute",
    right: getScreenWidth(2),
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  subThree: {
    display: "flex",
    flexDirection: "column",
    gap: getScreenHeight(1.5),
  },
});
