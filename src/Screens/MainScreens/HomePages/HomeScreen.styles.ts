import { StyleSheet } from 'react-native';
import ColorPalette from '../../../config/ColorPalette';
import { BorderRadius, Spacing } from '../../../config/globalStyles';
import { getScreenHeight, getScreenWidth } from '../../../helpers/screenSize';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: ColorPalette.WelcomeBack,
  },
  scrollContent: {
    gap: getScreenHeight(1.2),
  },
  headerCustom: {
    backgroundColor: ColorPalette.HOME_BLUE,
    paddingTop: getScreenHeight(2),
  },
  searchContainer: {
    // padding: getScreenWidth(4),
    paddingHorizontal: getScreenWidth(3),
    paddingVertical: getScreenWidth(1.5),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ColorPalette.HOME_BLUE,
    paddingBottom: getScreenHeight(1.7),
  },
  searchBoxCustom: {
    // marginVertical: getScreenHeight(4),
    borderRadius: Spacing.XSmall,
  },
  inputCustom: {
    color: ColorPalette.TEXT_GREY_300,
    // fontSize: 14,
    paddingTop: getScreenHeight(0.8)
  },
  micIconContainer: {
    position: 'absolute',
    right: getScreenWidth(7),
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: getScreenHeight(0.8),
  },
  bannerContainer: {
    display: 'flex',
    paddingHorizontal: getScreenWidth(4),
    paddingVertical: getScreenHeight(2),
    backgroundColor: ColorPalette.WHITE,
  },
  bannerContainerOne: {
    display: 'flex',
    paddingHorizontal: getScreenWidth(4),
    paddingVertical: getScreenHeight(2),
    backgroundColor: ColorPalette.WHITE,
  },
  featuredContainer: {
    display: 'flex',
    gap: getScreenWidth(2),
    backgroundColor: ColorPalette.WHITE,
    paddingHorizontal: getScreenWidth(1.5),
    paddingVertical: getScreenHeight(1),
  },
  bestSellerContainer: {
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: getScreenWidth(4),
    paddingVertical: getScreenHeight(2),
    backgroundColor: ColorPalette.WHITE,
    gap: getScreenWidth(5),
  },
  bestSellerContainerOne: {
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: getScreenWidth(4),
    paddingVertical: getScreenHeight(2),
    backgroundColor: ColorPalette.NEW_ARRIVAL,
    gap: getScreenWidth(4),
  },
  horizontalListContainer: {
    gap: getScreenWidth(3),
  },
  categoryListContainer: {
    gap: getScreenWidth(2),
    paddingVertical: getScreenHeight(1.5),
  },
  dealHeaderContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: getScreenWidth(1),
  },
  discountTimerContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: getScreenWidth(2),
    alignItems: 'center',
  },
  timerBadge: {
    paddingVertical: getScreenHeight(0.25),
    paddingHorizontal: getScreenWidth(1.5),
    backgroundColor: ColorPalette.ORANGE_00,
  },
  productForYouCard: {
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: getScreenWidth(4),
    paddingVertical: getScreenHeight(2),
    backgroundColor: ColorPalette.WHITE,
    gap: getScreenWidth(2.5),
  },
  filtersContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: getScreenWidth(2),
    alignItems: 'center',
    width: '100%',
    flexWrap: 'wrap',
  },
  badgeContainer: {
    paddingVertical: getScreenHeight(2),
    paddingHorizontal: getScreenWidth(3),
  },
  dividerContainer: {
    position: 'absolute',
    right: getScreenWidth(15),
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    height: getScreenHeight(3.5),
    width: getScreenWidth(0.5),
    backgroundColor: ColorPalette.BACKGROUND_GREY_100,
    marginBottom: getScreenHeight(0.8),
  },
  headerLine: {
    display: 'flex',
    backgroundColor: ColorPalette.Header_Line,
    paddingVertical: getScreenHeight(0.5),
    paddingHorizontal: getScreenWidth(4),
  },
  headerLineText: {
    color: ColorPalette.TEXT_GREY_300,
  },
  popularPicksContainer: {
    paddingHorizontal: getScreenWidth(4),
    paddingVertical: getScreenHeight(2),
    borderRadius: Spacing.Small,
    gap: getScreenWidth(4),
  },
  popularPicksListContainer: {
    display: 'flex',
    backgroundColor: ColorPalette.WHITE,
    padding: getScreenHeight(1.5),
    borderRadius: BorderRadius.Small,
  },
  surfRocketDeals: {
    paddingHorizontal: getScreenWidth(4),
    paddingVertical: getScreenHeight(2),
    borderRadius: Spacing.Small,
    gap: getScreenWidth(4),
  },
  surfRocketDealsListContainer: {
    display: 'flex',
    backgroundColor: ColorPalette.WHITE,
    padding: getScreenHeight(1.5),
    borderRadius: BorderRadius.Small,
  },
  footerContainer: {
    paddingVertical: getScreenHeight(18),
    paddingHorizontal: Spacing.Medium,
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: Spacing.Medium,
    backgroundColor: ColorPalette.Cart_BG,
  },
  footerLine: {
    width: '100%',
    height: 1,
    backgroundColor: ColorPalette.BACKGROUND_GREY_100,
  },
  footerText: {
    color: ColorPalette.BACKGROUND_GREY_200,
    textAlign: 'left',
  },
});

export const tabBarStyles = StyleSheet.create({
  tabsContainer: {
    flexDirection: 'row',
    position: 'relative',
    minWidth: '100%',
    gap: getScreenWidth(6),
    marginHorizontal: getScreenWidth(4),
  },
  tabButton: {
    // paddingHorizontal: getScreenWidth(4),
    paddingVertical: getScreenHeight(1),
    alignItems: 'center',
    justifyContent: 'center',
    gap: getScreenHeight(0.50),
    // gap: 4,
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: getScreenHeight(0.625),
    zIndex: 999,
    backgroundColor: ColorPalette.HOME_BLUE,
    borderTopLeftRadius: Spacing.Small,
    borderTopRightRadius: Spacing.Small,
    // Base width for scaling
    width: 1,
  },
  glassmorphismContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
});
