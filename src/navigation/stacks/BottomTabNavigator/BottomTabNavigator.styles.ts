import {StyleSheet} from 'react-native';
import ColorPalette from '../../../config/ColorPalette';
import {
  getFigmaDimension,
  getScreenHeight,
  getScreenWidth,
} from '../../../helpers/screenSize';

export const styles = StyleSheet.create({
  tabBarWrapper: {
    position: 'relative',
    backgroundColor: ColorPalette.White,
    width: '100%',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },

  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingTop: getScreenHeight(2),
    paddingBottom: getScreenHeight(2),
    width: '100%',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: getFigmaDimension(4),
  },
  tabText: {
    marginTop: getScreenHeight(0.5),
    fontSize: getScreenHeight(1.4),
  },
  focusedTabText: {
    color: ColorPalette.PURPLE_300,
  },
  unfocusedTabText: {
    color: ColorPalette.GREY_TEXT_200,
  },
  badgeOverlay: {
    position: 'absolute',
    top: -getScreenHeight(0.5),
    right: -getScreenWidth(2),
    zIndex: 10,
  },
  badge: {
    paddingHorizontal: 0,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
