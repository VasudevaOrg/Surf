import { StyleSheet } from "react-native";
import ColorPalette from "../../../../../config/ColorPalette";
import {
  getScreenHeight,
  getScreenWidth,
} from "../../../../../helpers/screenSize";

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: ColorPalette.WelcomeBack,
    paddingVertical: getScreenHeight(1.5),
  },
  scrollContent: {},
  firstContainer: {
    display: "flex",
    gap: getScreenHeight(1),
    backgroundColor: ColorPalette.WHITE,
    paddingVertical: getScreenHeight(1.5),
  },
  inputContainer: {
    display: "flex",
    gap: getScreenHeight(1.5),
  },
});
