import {StyleSheet} from 'react-native';
import {getScreenHeight, getScreenWidth} from '../../../helpers/screenSize';
import ColorPalette from '../../../config/ColorPalette';
import {BorderRadius, Spacing} from '../../../config/globalStyles';

export const styles: any = {
  filtersContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: getScreenWidth(2),
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  badgeTwoContainer: {
    borderRadius: getScreenWidth(2),
    paddingVertical: getScreenHeight(2),
    paddingHorizontal: getScreenWidth(3),
  },
  badgeTwoContainerScroll: {
    paddingVertical: getScreenHeight(1.5),
    paddingHorizontal: getScreenWidth(1.5),
    gap: getScreenWidth(0.5),
    borderRadius: BorderRadius.Small,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: ColorPalette.OPACITY_24,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: ColorPalette.WHITE,
    borderTopLeftRadius: Spacing.XLarge,
    borderTopRightRadius: Spacing.XLarge,
    gap: getScreenHeight(2),
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: getScreenHeight(1.5),
    borderBottomWidth: 1,
    borderBottomColor: ColorPalette.WelcomeBack,
    paddingHorizontal: getScreenWidth(4),
    marginTop: getScreenHeight(1),
  },
  modalHeaderTitle: {
    color: ColorPalette.TEXT_GREY_900,
  },
  modalHeaderClose: {
    color: ColorPalette.ROSE_PURPLE_300,
  },
  modalBodyContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  tabNavigation: {
    backgroundColor: ColorPalette.WHITE,
    borderBottomLeftRadius: 20,
    minWidth: getScreenWidth(30),
  },
  tabItem: (isActive: boolean) => ({
    paddingVertical: getScreenHeight(1.5),
    paddingHorizontal: getScreenWidth(4),
    backgroundColor: isActive ? ColorPalette.ROSE_PURPLE_00 : 'transparent',
  }),
  tabItemText: (isActive: boolean) => ({
    color: isActive ? ColorPalette.TEXT_GREY_500 : ColorPalette.TEXT_GREY_400,
  }),
  filterOptionsContainer: {
    flex: 1,
    paddingHorizontal: getScreenWidth(4),
    paddingBottom: getScreenHeight(10),
  },
  filterOptionItem: {
    paddingHorizontal: getScreenWidth(2),
    paddingVertical: getScreenHeight(1.5),
  },
  filterOptionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  filterOptionText: {
    flex: 1,
    flexWrap: 'wrap',
    marginRight: getScreenWidth(2),
    color: ColorPalette.TEXT_GREY_500,
  },
  filterCheckbox: (isSelected: boolean) => ({
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: ColorPalette.BACKGROUND_GREY_300,
    backgroundColor: isSelected
      ? ColorPalette.ROSE_PURPLE_300
      : ColorPalette.WHITE,
    marginLeft: getScreenWidth(2),
  }),
  filterButtonsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: getScreenWidth(4),
    paddingVertical: getScreenHeight(1.5),
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
  clearFiltersButton: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: ColorPalette.ROSE_PURPLE_300,
    borderRadius: Spacing.Medium,
  },
  applyFiltersButton: {
    flex: 1,
    marginLeft: getScreenWidth(2),
    backgroundColor: ColorPalette.ROSE_PURPLE_300,
    borderRadius: Spacing.Medium,
  },
  modalContentWithButtons: {
    backgroundColor: ColorPalette.WHITE,
    borderTopLeftRadius: Spacing.XLarge,
    borderTopRightRadius: Spacing.XLarge,
    height: '70%',
    gap: getScreenHeight(2),
  },
};
