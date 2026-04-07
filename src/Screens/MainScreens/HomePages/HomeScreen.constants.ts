import BellNotificationIcon from '../../../assets/icons/BellIcon';
import { CartIcon } from '../../../assets/icons/BottomNavIcons';
import HeartIcon from '../../../assets/icons/HeartIcon';
import BagIcon from '../../../assets/icons/BagIcon';
import GlobeIcon from '../../../assets/icons/GlobeIcon';
import LayoutIcon from '../../../assets/icons/LayoutIcon';
import ShoppingBagIcon from '../../../assets/icons/ShoppingBagIcon';
import ColorPalette from '../../../config/ColorPalette';
import { getScreenHeight, getScreenWidth } from '../../../helpers/screenSize';
import { navigate } from '../../../utils/navigationref';

const navigateToWishList = () => {
  navigate('MainScreens', {
    screen: 'Home',
    params: {
      screen: 'WishList',
    },
  });
};

export const headerImages = [
  {
    source: require('../../../assets/images/AppLogo.png'),
    style: { width: getScreenWidth(7), height: getScreenHeight(3.5) },
    onPress: () => console.log('Logo pressed'),
  },
  {
    source: require('../../../assets/images/AppName.png'),
    style: {
      width: getScreenWidth(13),
      height: getScreenHeight(3),
      resizeMode: 'contain',
    },
    onPress: () => console.log('Profile pressed'),
  },
];

// Header right icons
export const headerRightIcons = [
  {
    icon: BellNotificationIcon,
    onPress: () => console.log('Bell pressed'),
    size: 24,
    color: ColorPalette.TEXT_GREY_500,
    strokeWidth: 2,
  },
  {
    icon: HeartIcon,
    onPress: navigateToWishList,
    size: 24,
    color: ColorPalette.TEXT_GREY_500,
    strokeWidth: 2,
  },
  {
    icon: CartIcon,
    onPress: () => console.log('Cart pressed'),
    size: 24,
    color: ColorPalette.TEXT_GREY_500,
    strokeWidth: 2,
  },
];

// Banner images
export const bannerImages: any[] = [];

// Second banner images - Top banners
export const bannerSecondImages: any[] = [
  {
    id: 'banner-1',
    source: require('../../../assets/images/mainBanner.png'),
  },
];

export const discountBanners: any[] = [
  {
    id: 'discount-1',
    source: require('../../../assets/images/mainBanner.png'),
  },
];

//New Arrival Products
export const newArrivalProducts = [];

// Rocket Deal Products
export const rocketDealProducts = [];

// Best Seller Products
export const bestSellerProducts = [];

export const cartSteps = [];

// Categories data
export const categories = [];

// Products For You data
export const productsForYou = [];

export const tabRoutes = [
  {
    key: 'all',
    title: 'For You',
    icon: require('../../../assets/images/carrybag.png'),
  },
  {
    key: 'maltaMade',
    title: 'MT Made',
    icon: require('../../../assets/images/maltacastle.png'),
  },
  {
    key: 'women',
    title: 'Women',
    icon: require('../../../assets/images/womendress.png'),
  },
  {
    key: 'men',
    title: 'Men',
    icon: require('../../../assets/images/menshirt.png'),
  },
  {
    key: 'beauty',
    title: 'Beauty',
    icon: require('../../../assets/images/beauty.png'),
  },
  {
    key: 'children',
    title: 'Children',
    icon: require('../../../assets/images/kids.png'),
  },
  {
    key: 'modern',
    title: 'Modern',
    icon: require('../../../assets/images/eyewear.png'),
  },
];

// Featured images data
export const featuredImages = [];

export const newArrivalImages: any[] = [];

// Filter badges data
export const filterBadges = [
  { text: 'Filters', leftIcon: 'FilterIcon', rightIcon: 'ArrowDownIcon' },
  { text: 'Sort', leftIcon: 'SortIcon', rightIcon: 'ArrowDownIcon' },
  { text: 'Category', rightIcon: 'ArrowDownIcon', needsEllipsis: true },
];

export const sponsoredBrands = [];

// Popular Picks fallback data
export const popularPicksData: any[] = [
  {
    id: 'popular-1',
    title: 'Tech Essentials',
    subTitle: 'Latest gadgets',
    image: require('../../../assets/images/popularPicks.png'),
  },
  {
    id: 'popular-2',
    title: 'Beauty Favorites',
    subTitle: 'Top rated products',
    image: require('../../../assets/images/popularPicks.png'),
  },
  {
    id: 'popular-3',
    title: 'Home & Living',
    subTitle: 'Comfort meets style',
    image: require('../../../assets/images/popularPicks.png'),
  },
];

// Rocket Deals fallback data
export const rocketDealsData = {
  mainImage: require('../../../assets/images/productCardDemo.png'),
  timerValue: '12h: 30m: 45s',
  gridItems: [
    {
      id: 'rocket-1',
      image: require('../../../assets/images/productCardDemo.png'),
    },
    {
      id: 'rocket-2',
      image: require('../../../assets/images/productCardDemo.png'),
    },
    {
      id: 'rocket-3',
      image: require('../../../assets/images/productCardDemo.png'),
    },
    {
      id: 'rocket-4',
      image: require('../../../assets/images/productCardDemo.png'),
    },
  ],
  moreCount: 10,
};
