import { StyleSheet } from "react-native";
import ColorPalette from "../../../../config/ColorPalette";
import {
  getScreenHeight,
  getScreenWidth,
} from "../../../../helpers/screenSize";
import { BorderRadius, Spacing } from "../../../../config/globalStyles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorPalette.WHITE,
  },
  scrollViewContainer: {},
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: ColorPalette.WelcomeBack,
    paddingVertical: getScreenHeight(2),
    paddingHorizontal: getScreenWidth(4),
  },
  scrollContent: {
    flexGrow: 1,
    gap: getScreenHeight(1.2),

    //  paddingHorizontal: 16,
    // paddingTop: 12,
    // paddingBottom: 24,
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
  emptyStateContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // paddingHorizontal: getScreenWidth(6),
    marginBottom: getScreenHeight(16),
  },

  emptyBox: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: getScreenHeight(2),
    paddingHorizontal: getScreenWidth(4),
    marginBottom: getScreenHeight(2),
  },

  emptyTitle: {
    marginBottom: getScreenHeight(1),
    fontSize: 22,
    color: ColorPalette.TEXT_GREY_400,
  },

  emptySubtitle: {
    color: ColorPalette.TEXT_GREY_300,
    textAlign: 'center',
    lineHeight: 20,
  },

  emptyButton: {
    minWidth: getScreenWidth(90),
    borderRadius: BorderRadius.Small,
    color: ColorPalette.White,
  },

  customButton: {
    width: getScreenWidth(92),
    height: getScreenHeight(7),
    paddingHorizontal: getScreenWidth(2.5),
    borderRadius: Spacing.Small,
  },
  customText: {
    color: ColorPalette.WHITE
  },
});
