import { StyleSheet } from "react-native";
import {
  getScreenHeight,
  getScreenWidth,
} from "../../../../helpers/screenSize";
import { Spacing } from "../../../../config/globalStyles";
import ColorPalette from "../../../../config/ColorPalette";

export const styles = StyleSheet.create({
  container: {
    paddingVertical: getScreenHeight(2),
    paddingHorizontal: getScreenWidth(4),
    backgroundColor: ColorPalette.WHITE,
    gap: getScreenHeight(1.5),
    borderRadius: Spacing.Small,
  },
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    gap: Spacing.XXSmall,
  },
  textIconContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  actionsContainer: {
    display: "flex",
    flexDirection: "row",
    gap: getScreenWidth(2),
  },
  mainLabel: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: getScreenHeight(0.5),
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: getScreenWidth(2),
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: getScreenWidth(1),
  },
  reviewText: {
    display: "flex",
    flexDirection: "row",
    gap: getScreenWidth(1),
  },
  deliveryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  carContainer: {
    display: "flex",
    flexDirection: "row",
    gap: getScreenWidth(1),
  },
});
