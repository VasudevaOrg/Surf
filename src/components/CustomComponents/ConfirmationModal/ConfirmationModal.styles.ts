import {StyleSheet} from 'react-native';
import ColorPalette from '../../../config/ColorPalette';
import {Spacing} from '../../../config/globalStyles';
import {getScreenHeight, getScreenWidth} from '../../../helpers/screenSize';

export const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: getScreenHeight(4),
    paddingHorizontal: getScreenWidth(5),
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: getScreenHeight(2),
    marginBottom: getScreenHeight(2),
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    padding: Spacing.Small,
  },
  title: {
    textAlign: 'center',
  },
  message: {
    textAlign: 'center',
    marginBottom: getScreenHeight(3),
    color: ColorPalette.TEXT_GREY_400,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.Medium,
  },
});
