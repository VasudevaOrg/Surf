import {StyleSheet} from 'react-native';
import ColorPalette from '../../../config/ColorPalette';

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
    paddingTop: 10,
    paddingBottom: 10,
    width: '100%',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  tabText: {
    marginTop: 4,
    fontSize: 11,
  },
  focusedTabText: {
    color: ColorPalette.PURPLE_300,
  },
  unfocusedTabText: {
    color: ColorPalette.GREY_TEXT_200,
  },
  badgeOverlay: {
    position: 'absolute',
    top: -4,
    right: -8,
    zIndex: 10,
  },
  badge: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
