import { StyleSheet } from "react-native";
import { getScreenHeight, getScreenWidth } from "../../../helpers/screenSize";
import { BorderRadius, Spacing } from "../../../config/globalStyles";
import ColorPalette from "../../../config/ColorPalette";

export const styles = StyleSheet.create({
  customToastContainer: {
    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: ColorPalette.TEXT_GREY_250,
    borderRadius: BorderRadius.Full,

    paddingVertical: getScreenHeight(1.5),
    paddingHorizontal: getScreenWidth(4.3),

    marginHorizontal: getScreenWidth(4.3),

    elevation: 8,
    shadowColor: ColorPalette.BLACK,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    gap: getScreenWidth(2)
  },


  iconWrapper: {
    height: getScreenHeight(3.2),
    width: getScreenHeight(3.2),
    borderRadius: getScreenHeight(1.6),

    backgroundColor: ColorPalette.GREEN_SUCCESS, // green circle
    alignItems: 'center',
    justifyContent: 'center',
  },

  customToastText: {
    color: ColorPalette.WHITE,
    flex: 1,
    paddingVertical: getScreenHeight(0.1)
  },
});
