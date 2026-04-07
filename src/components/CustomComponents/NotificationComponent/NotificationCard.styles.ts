import { StyleSheet } from 'react-native';
import ColorPalette from '../../../config/ColorPalette';
import { getScreenHeight, getScreenWidth } from '../../../helpers/screenSize';
import { BorderRadius } from '../../../config/globalStyles';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: ColorPalette.WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: getScreenWidth(4.8),
    paddingVertical: getScreenHeight(2.4),
    borderRadius: BorderRadius.Medium,
  },

  textContainer: {},

  title: {
    color: ColorPalette.TEXT_GREY_500,
    flex: 1,
  },

  time: {
    color: ColorPalette.TEXT_GREY_100,
    alignSelf: 'flex-start',
    paddingVertical: getScreenHeight(0.1),
  },

  iconWrapper: {
    width: getScreenWidth(11.7),
    height: getScreenHeight(5.6),
    borderRadius: BorderRadius.Small,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: getScreenWidth(2.5),
  },

  unreadDot: {
    width: getScreenWidth(2.44),
    height: getScreenHeight(1.16),
    borderRadius: 6,
    backgroundColor: ColorPalette.DANGER as string,
    marginLeft: 12,
    marginRight: 6,
  },
});
