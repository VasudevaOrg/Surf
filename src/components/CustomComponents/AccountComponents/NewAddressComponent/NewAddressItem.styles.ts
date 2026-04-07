import { StyleSheet } from "react-native";
import ColorPalette from "../../../../config/ColorPalette";
import {
  getScreenHeight,
  getScreenWidth,
} from "../../../../helpers/screenSize";
import { BorderRadius, Spacing } from "../../../../config/globalStyles";

export const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: ColorPalette.WHITE,
    borderRadius: Spacing.Small,
    paddingVertical: getScreenHeight(2),
    paddingHorizontal: getScreenWidth(4),
    gap: getScreenHeight(2),
  },
  firstContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemRadio: {
    display: "flex",
    flexDirection: "row",
    gap: getScreenWidth(3),
    alignItems: "center",
    justifyContent: "center",
  },
  radioButtonContainer: {
    width: getScreenWidth(6.5),
    height: getScreenHeight(3),
    borderRadius: BorderRadius.Full, 
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    borderColor: ColorPalette.ROSE_PURPLE_300,
  },
  selectedRadioButtonContainer: {},
  radioButtonInner: {
    width: getScreenWidth(3.25),
    height: getScreenHeight(1.5),
    borderRadius: 6,
    backgroundColor: ColorPalette.ROSE_PURPLE_300,
  },
  editContainer: {
    display: "flex",
    flexDirection: "row",
    gap: getScreenWidth(1),
    alignItems: "center",
    justifyContent: "center",
  },
  secondContainer: {
    display: "flex",
    flexDirection: "column",
    gap: getScreenHeight(1.5),
  },
  secondSubOne: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
