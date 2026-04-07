import {StyleSheet} from 'react-native';
import ColorPalette from '../../../../config/ColorPalette';
import {Spacing} from '../../../../config/globalStyles';
import {getScreenHeight, getScreenWidth} from '../../../../helpers/screenSize';

/**
 * Creates styles for the SummaryItem component with improved structure,
 * consistent spacing, and better organization.
 *
 * @returns {Object} StyleSheet object containing all styles for SummaryItem
 */
export const createSummaryItemStyles = () => {
  return StyleSheet.create({
    container: {
      borderRadius: Spacing.XSmall,
      backgroundColor: ColorPalette.WHITE,
      overflow: 'hidden',
      width: '100%',
    },
    touchableContainer: {
      width: '100%',
    },
    mainContainer: {
      flexDirection: 'row',
      alignItems: 'stretch',
      justifyContent: 'space-between',
      width: '100%',
      paddingVertical: getScreenHeight(2),
      paddingHorizontal: getScreenWidth(3),
    },
    leftSection: {
      flexDirection: 'row',
      alignItems: 'stretch',
      flex: 1,
      gap: getScreenWidth(3),
    },
    rightSection: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    imageContainer: {
      width: getScreenWidth(16),
      height: getScreenHeight(8),
      backgroundColor: ColorPalette.WelcomeBack,
      borderRadius: Spacing.Small,
      overflow: 'hidden',
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    contentContainer: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      flex: 1,
    },
    topContent: {
      gap: getScreenWidth(1),
      width: '100%',
    },
    titleText: {
      color: ColorPalette.TEXT_GREY_500,
      flexWrap: 'wrap',
    },
    shopNameText: {
      color: ColorPalette.TEXT_GREY_100,
    },
    priceContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: getScreenWidth(1.5),
    },
    priceText: {
      color: ColorPalette.HOME_BLUE,
    },
    strikethroughText: {
      color: ColorPalette.TEXT_GREY_100,
      textDecorationLine: 'line-through',
    },
  });
};
