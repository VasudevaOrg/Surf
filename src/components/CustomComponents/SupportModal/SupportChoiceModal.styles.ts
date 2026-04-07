import { StyleSheet } from 'react-native';
import ColorPalette from '../../../config/ColorPalette';
import { getScreenHeight, getScreenWidth } from '../../../helpers/screenSize';
import { Spacing } from '../../../config/globalStyles';

export const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: ColorPalette.WHITE,
    borderTopLeftRadius: Spacing.Large,
    borderTopRightRadius: Spacing.Large,
    paddingHorizontal: getScreenWidth(4),
    paddingTop: getScreenHeight(2),
    paddingBottom: getScreenHeight(4),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: getScreenHeight(2),
  },
  title: {
    color: ColorPalette.TEXT_GREY_500,
  },
  closeButton: {
    padding: getScreenWidth(2),
  },
  content: {
    gap: getScreenHeight(2),
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: ColorPalette.WelcomeBack,
    padding: getScreenWidth(4),
    borderRadius: Spacing.Medium,
    gap: getScreenWidth(3),
  },
  optionIcon: {
    width: getScreenWidth(10.7),
    height: getScreenHeight(5.1),
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionTextContainer: {
    flex: 1,
  },
});
