import { StyleSheet } from "react-native";
import { getScreenHeight, getScreenWidth } from "../../../helpers/screenSize";
import ColorPalette from "../../../config/ColorPalette";
import { BorderRadius, Spacing } from "../../../config/globalStyles";

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: ColorPalette.OPACITY_16,
    justifyContent: "flex-end",
    alignItems: "center",
  },

  popup: {
    width: getScreenWidth(90),
    backgroundColor: ColorPalette.WHITE,
    borderRadius: BorderRadius.Medium,
    paddingVertical: getScreenHeight(2.5),
    paddingHorizontal: getScreenWidth(4),
  },

  title: {
    fontSize: 15,
    paddingVertical: getScreenHeight(0.1)
  },

  subtitle: {
    fontSize: 13,
    color: ColorPalette.GREY_600,
    width: getScreenWidth(60),
    color: ColorPalette.TEXT_GREY_100
  },

  buttonRow: {
    flexDirection: "row",
    marginTop: getScreenHeight(3),
    gap: getScreenWidth(2),
    justifyContent: "center",
  },

  headerRow: {
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'space-between',
  },
  loginButton: {
    flex: 1,
    borderRadius: BorderRadius.Full,
    height: getScreenHeight(5.5),
  },
  
  createNewAccountButton: {
    flex: 1,
    borderColor: ColorPalette.ROSE_PURPLE_50,
    borderWidth: 1,
    borderRadius: BorderRadius.Full,
    height: getScreenHeight(5.5),
  },

  imageContainer: {
    width: getScreenWidth(11),
    height: getScreenHeight(5.25),
    backgroundColor: ColorPalette.HOME_BLUE,
    borderRadius: Spacing.XXXLarge,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: getScreenHeight(0.5)
  },
  closeIcon: {
    marginTop: getScreenHeight(0.5)
  }
});
