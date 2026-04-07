import { StyleSheet } from "react-native";
import ColorPalette from "../../../../../config/ColorPalette";
import { getScreenHeight, getScreenWidth } from "../../../../../helpers/screenSize";
import { Spacing } from "../../../../../config/globalStyles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: getScreenHeight(2.5),
    marginBottom: getScreenHeight(2),
    backgroundColor: ColorPalette.WHITE,
      //  backgroundColor: ColorPalette.WHITE,
    // borderRadius: Spacing.Small,
    // padding: getScreenWidth(4),
    // // gap: getScreenHeight(0.5),
    // width: "100%",
    // borderWidth: 1.5,
    // borderColor: ColorPalette.HOME_BLUE,
  },
    firstContainer: {
    display: 'flex',
    flexDirection: 'column',
    // paddingVertical: getScreenHeight(2),
    // paddingHorizontal: getScreenHeight(3),
    // gap: getScreenHeight(3),
    backgroundColor: ColorPalette.WHITE,
    borderRadius: Spacing.Small,

    padding: getScreenWidth(4.3),
    gap: getScreenHeight(2),
    width: "100%",
    borderWidth: 1.5,
    borderColor: ColorPalette.BACKGROUND_GREY_100,
    paddingBottom: getScreenHeight(0.3)
  },
  paymentText: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
   radioContainer: {
    display: 'flex',
    // gap: getScreenHeight(2),
  },
});
