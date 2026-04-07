import {StyleSheet} from 'react-native';
import ColorPalette from '../../../config/ColorPalette';
import {getScreenHeight, getScreenWidth} from '../../../helpers/screenSize';
import {BorderRadius} from '../../../config/globalStyles';

export const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: ColorPalette.WHITE,
    borderTopLeftRadius: BorderRadius.Medium, // Using enum instead of getFigmaDimension(8)
    borderTopRightRadius: BorderRadius.Medium, // Using enum instead of getFigmaDimension(8)
  },
  searchContainer: {
    padding: getScreenWidth(4), // Already using getScreenWidth
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ColorPalette.WHITE,
  },
  contentContainer: {
    paddingTop: getScreenHeight(1), // Already using getScreenHeight
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: getScreenWidth(5), // Already using getScreenWidth
    paddingVertical: getScreenHeight(2), // Already using getScreenHeight
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: ColorPalette.WelcomeBack,
  },
  headerContent: {
    flex: 1,
  },
  heading: {
    color: ColorPalette.TEXT_GREY_500,
  },
  closeButton: {
    marginLeft: getScreenWidth(2), // Already using getScreenWidth
  },
  scrollContainer: {
    flexGrow: 0,
    paddingVertical: getScreenHeight(1.5),
  },
  sectionContainer: {
    paddingHorizontal: getScreenWidth(5), // Already using getScreenWidth
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: getScreenHeight(1.5), // Already using getScreenHeight
    gap: getScreenWidth(3), // Already using getScreenWidth
  },
  radioButton: {
    width: getScreenWidth(6), // Already using getScreenWidth
    height: getScreenWidth(6), // Already using getScreenWidth
    borderRadius: getScreenWidth(3), // Already using getScreenWidth
    borderWidth: getScreenWidth(0.5), // Already using getScreenWidth
    borderColor: ColorPalette.BACKGROUND_GREY_200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    borderColor: ColorPalette.ROSE_PURPLE_300,
    backgroundColor: ColorPalette.WHITE,
  },
  radioButtonInner: {
    width: getScreenWidth(2.5), // Already using getScreenWidth
    height: getScreenWidth(2.5), // Already using getScreenWidth
    borderRadius: getScreenWidth(1.25), // Already using getScreenWidth
    backgroundColor: ColorPalette.ROSE_PURPLE_300,
  },
  optionLabel: {
    flex: 1,
  },
  optionLabelSelected: {
    color: ColorPalette.TEXT_GREY_500,
  },
  optionLabelUnselected: {
    color: ColorPalette.TEXT_GREY_300,
  },
  footer: {
    paddingVertical: getScreenHeight(1.5),
    paddingHorizontal: getScreenWidth(4),
    backgroundColor: ColorPalette.WHITE,
    shadowColor: ColorPalette.BACKGROUND_GREY_400,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 10,
  },
  checkbox: {
    width: getScreenWidth(6), // Updated from fixed 24px
    height: getScreenWidth(6), // Updated from fixed 24px
    borderRadius: BorderRadius.XXSmall,
  },
  checkboxSelected: {
    borderColor: ColorPalette.PURPLE_200,
    backgroundColor: ColorPalette.PURPLE_00,
  },
});
