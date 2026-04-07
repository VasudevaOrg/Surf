import { StyleSheet } from "react-native";
import ColorPalette from "../../../../config/ColorPalette";
import {
  getScreenHeight,
  getScreenWidth,
} from "../../../../helpers/screenSize";
import { Spacing } from "../../../../config/globalStyles";

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: ColorPalette.WelcomeBack,
    paddingVertical: getScreenHeight(2),
    paddingHorizontal: getScreenWidth(4),
  },
  scrollContent: {
    flexGrow: 1,
    gap: getScreenHeight(2),
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  emptyContainerStyles: {
    backgroundColor: "transparent",
  },
  searchResultCards: {
    display: "flex",
    paddingHorizontal: getScreenWidth(4),
    paddingVertical: getScreenHeight(2),
    backgroundColor: ColorPalette.WHITE,
    borderRadius: Spacing.Small,
  },
});
