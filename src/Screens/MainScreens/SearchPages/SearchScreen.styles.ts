import {StyleSheet} from 'react-native';
import ColorPalette from '../../../config/ColorPalette';
import {getScreenHeight, getScreenWidth} from '../../../helpers/screenSize';
import {Spacing} from '../../../config/globalStyles';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: ColorPalette.WHITE,
  },
  scrollContent: {
    // gap: getScreenHeight(1.5),
  },
  searchContainer: {
    flexDirection: 'row',
    padding: getScreenWidth(4),
    alignItems: 'center',
    backgroundColor: ColorPalette.WHITE,
    gap: getScreenWidth(4),
    paddingBottom: 0,
    borderBottomColor: ColorPalette.BACKGROUND_GREY_100,
  },
  searchBoxContainer: {
    flex: 1,
    flexDirection: 'row',
    position: 'relative',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    paddingRight: getScreenWidth(10),
  },
  micIconContainer: {
    position: 'absolute',
    right: getScreenWidth(2),
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  discoverContainer: {
    paddingVertical: getScreenHeight(1.5),
    paddingHorizontal: getScreenWidth(4),
    backgroundColor: ColorPalette.WHITE,
    gap: getScreenWidth(2),
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: getScreenWidth(4),
    paddingBottom: getScreenHeight(0.5),
  },
  historyItem: {
    paddingHorizontal: getScreenWidth(4),
  },
  badgeContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.Small,
  },
  singleBadge: {
    backgroundColor: ColorPalette.WelcomeBack,
    borderRadius: Spacing.XSmall,
    paddingVertical: getScreenHeight(1.5),
    paddingHorizontal: getScreenWidth(4),
  },
  resultContainer: {
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: getScreenWidth(4),
    paddingTop: 0,
    paddingBottom: getScreenHeight(1.5),
    gap: getScreenHeight(1.5),
  },
  categoryContainer: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: getScreenHeight(1.5),
    gap: getScreenHeight(1.5),
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  filtersContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: getScreenWidth(2),
    alignItems: 'center',
    width: '100%',
    flexWrap: 'wrap',
  },
  badgeTwoContainer: {
    borderRadius: getScreenWidth(2),
    paddingVertical: getScreenHeight(2),
    paddingHorizontal: getScreenWidth(3),
  },
  searchResultCards: {
    display: 'flex',
    paddingHorizontal: getScreenWidth(4),
    paddingVertical: getScreenHeight(1.5),
    backgroundColor: ColorPalette.WHITE,
    borderRadius: Spacing.Small,
  },
  productsGridContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  productCardWrapper: {
    flex: 1,
  },
  emptySearchContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 50,
  },
  suggestionsContainer: {
    backgroundColor: ColorPalette.WHITE,
    paddingHorizontal: getScreenWidth(4),
    paddingTop: 0,
  },
});
