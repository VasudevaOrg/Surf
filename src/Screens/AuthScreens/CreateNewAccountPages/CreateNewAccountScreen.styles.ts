import { StyleSheet } from "react-native";
import { getScreenHeight, getScreenWidth } from "../../../helpers/screenSize";
import ColorPalette from "../../../config/ColorPalette";
import { BorderRadius, Spacing } from "../../../config/globalStyles";


export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    paddingVertical: getScreenHeight(2),
    paddingHorizontal: getScreenHeight(2),
    backgroundColor: ColorPalette.WHITE,
  },
  mainContainerTwo: {
    display: "flex",
    flexDirection: "column",
    gap: Spacing.Medium,
    paddingTop: getScreenHeight(2),
    backgroundColor: ColorPalette.WHITE,
  },
  scrollContent: {
    gap: getScreenHeight(2),
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
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    // marginTop: getScreenHeight(2),
  },

  caption: {
    color: ColorPalette.TEXT_GREY_300,
    textAlign: 'center',
    paddingVertical: 0.1
  },
  linkText: {
    color: ColorPalette.BLUE_CUSTOM,
    textDecorationLine: 'underline',
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
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: ColorPalette.WelcomeBack,
    marginHorizontal: getScreenWidth(4),
  },
    radioButton: {
      width: getScreenWidth(6), 
      height: getScreenWidth(6), 
      borderRadius: BorderRadius.Full,
      borderWidth: getScreenWidth(0.5), 
      borderColor: ColorPalette.BACKGROUND_GREY_200,
      justifyContent: 'center',
      alignItems: 'center',
    },
    radioButtonSelected: {
      borderColor: ColorPalette.HOME_BLUE,
      backgroundColor: ColorPalette.WHITE,
    },
    radioButtonInner: {
      width: getScreenWidth(2.5),
      height: getScreenWidth(2.5),
      borderRadius: BorderRadius.Full,
      backgroundColor: ColorPalette.HOME_BLUE,
    },
});
