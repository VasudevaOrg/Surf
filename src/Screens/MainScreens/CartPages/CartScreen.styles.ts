import {StyleSheet} from 'react-native';
import {getScreenWidth, getScreenHeight} from '../../../helpers/screenSize';
import ColorPalette from '../../../config/ColorPalette';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    padding: getScreenWidth(4),
    backgroundColor: ColorPalette.WHITE,
    paddingVertical: getScreenHeight(1.5),
    paddingHorizontal: getScreenWidth(4.5),
  },
  mainContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingVertical: getScreenHeight(2),
    paddingHorizontal: getScreenWidth(4),
    backgroundColor: ColorPalette.WHITE,
    paddingBottom: getScreenHeight(10),
  },
  bottomSection: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: getScreenWidth(4),
    paddingVertical: getScreenHeight(2),
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 0.5,
    borderTopColor: ColorPalette.SUMMARY_BORDER,
  },
  priceContainer: {
    flexDirection: 'column',
    gap: getScreenHeight(0.5),
  },
  continueButton: {
    minWidth: getScreenWidth(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ColorPalette.Cart_BG,
  },
  emptyContainerStyles: {
    backgroundColor: 'transparent',
  },
  notificationBanner: {
    backgroundColor: '#FFFBE6', // Light yellow/cream for alerts
    padding: getScreenWidth(2),
    borderBottomWidth: 1,
    borderBottomColor: '#FFE58F',
    width: '100%',
  },
});
