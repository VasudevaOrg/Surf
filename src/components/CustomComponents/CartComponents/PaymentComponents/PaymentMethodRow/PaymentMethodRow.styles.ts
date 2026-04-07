import { StyleSheet } from 'react-native';
import ColorPalette from '../../../../../config/ColorPalette';
import {
  getScreenWidth,
  getScreenHeight,
} from '../../../../../helpers/screenSize';
import { BorderRadius } from '../../../../../config/globalStyles';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: getScreenHeight(1.5),
    paddingHorizontal: getScreenWidth(4),
    borderRadius: BorderRadius.Small,
    backgroundColor: ColorPalette.WHITE,
    borderWidth: 1.5,
    borderColor: ColorPalette.WelcomeBack,
    marginBottom: getScreenHeight(1),
  },
  selectedContainer: {
    borderColor: ColorPalette.ROSE_PURPLE_300,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  paymentLabelContainer: {
    flex: 1,
    gap: getScreenHeight(0.3),
  },
  radioButton: {
    width: getScreenWidth(6),
    height: getScreenWidth(6),
    borderRadius: BorderRadius.Large,
    borderWidth: 1.5,
    borderColor: ColorPalette.TEXT_GREY_300,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: getScreenWidth(3),
  },
  radioButtonInner: {
    width: getScreenWidth(6),
    height: getScreenWidth(6),
    borderRadius: BorderRadius.Large,
    backgroundColor: ColorPalette.ROSE_PURPLE_300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shippingImage: {
    width: getScreenWidth(12),
    height: getScreenHeight(6),
    resizeMode: 'contain',
    borderWidth: 1,
    borderRadius: BorderRadius.Full,
    borderColor:ColorPalette.SKY_BLUE
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: getScreenWidth(3)
  },
});
