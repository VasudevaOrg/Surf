// RatingReview.styles.ts
import { StyleSheet } from "react-native";
import {
  getScreenHeight,
  getScreenWidth,
} from "../../../../helpers/screenSize";
import { Spacing } from "../../../../config/globalStyles";
import ColorPalette from "../../../../config/ColorPalette";

// Constants for responsive sizing
const RESPONSIVE_CONSTANTS = {
  CONTAINER_PADDING_VERTICAL: getScreenHeight(2),
  CONTAINER_PADDING_HORIZONTAL: getScreenWidth(4),
  CONTAINER_GAP: getScreenHeight(2),
  CONTENT_GAP: getScreenWidth(3),
  RATING_NUMBER_GAP: getScreenWidth(1),
  RATING_INFO_GAP: getScreenHeight(0.25),
  RATING_INFO_MARGIN_TOP: getScreenHeight(1),
  CATEGORIES_MARGIN_LEFT: getScreenWidth(2),
  CATEGORY_MARGIN_BOTTOM: getScreenHeight(1.5),
  CATEGORY_LABEL_WIDTH: getScreenWidth(20),
  PROGRESS_BAR_HEIGHT: getScreenHeight(0.75),
  CATEGORY_TEXT_PADDING: getScreenWidth(1),
};

export const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    borderRadius: Spacing.Small,
    paddingVertical: RESPONSIVE_CONSTANTS.CONTAINER_PADDING_VERTICAL,
    paddingHorizontal: RESPONSIVE_CONSTANTS.CONTAINER_PADDING_HORIZONTAL,
    gap: RESPONSIVE_CONSTANTS.CONTAINER_GAP,
    backgroundColor: ColorPalette.WHITE,
  },
  contentContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: RESPONSIVE_CONSTANTS.CONTENT_GAP,
  },
  ratingContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  ratingNumberContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: RESPONSIVE_CONSTANTS.RATING_NUMBER_GAP,
  },
  ratingInfoContainer: {
    display: "flex",
    flexDirection: "column",
    gap: RESPONSIVE_CONSTANTS.RATING_INFO_GAP,
    alignItems: "center",
    justifyContent: "center",
    marginTop: RESPONSIVE_CONSTANTS.RATING_INFO_MARGIN_TOP,
  },
  categoriesContainer: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    marginLeft: RESPONSIVE_CONSTANTS.CATEGORIES_MARGIN_LEFT,
  },
  categoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: RESPONSIVE_CONSTANTS.CATEGORY_MARGIN_BOTTOM,
  },
  categoryLabel: {
    width: RESPONSIVE_CONSTANTS.CATEGORY_LABEL_WIDTH,
  },
  progressBarContainer: {
    flex: 1,
    height: RESPONSIVE_CONSTANTS.PROGRESS_BAR_HEIGHT,
    backgroundColor: ColorPalette.WelcomeBack,
    borderRadius: Spacing.SMALLXX,
  },
  progressBar: {
    height: "100%",
    borderRadius: Spacing.SMALLXX,
  },
});
