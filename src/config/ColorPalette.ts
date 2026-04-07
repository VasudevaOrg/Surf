import {ColorValue} from 'react-native';

const ColorPalette: Record<string, ColorValue> = {
  //Custom Colors
  WelcomeBack: '#F3F4F6',
  PURPLE_CUSTOM: '#E7B1FF',
  BLUE_CUSTOM: '#831AD3',
  SEARCH_ICON: '#9F9C9C',
  RATING_COLOR: '#FCE603',
  TAG_COLOR: '#770D55',
  DEMAND_COLOR: '#183D72',
  MainHeading: '#2B2829',
  ConnectLine: '#D9DADC',
  LabelColor: '#161A1E',
  InactiveLabelColor: '#8E9091',
  AgreeTerms: '#433E3F',
  COUNT_COLOR: '#1A1A1A',
  Cart_BG: '#F5F6FB',
  PAYMENT_COLOR: '3F4548',
  HOME_BLUE: '#9010CF',
  RATING_COLOR_ICON: '#0A6233',
  NEW_ARRIVAL: '#FBE7DA',
  Header_Line: '#FFFA5C',
  TIMER_BADGE: '#FFF7EB',
  TIMER_BADGE_BORDER: '#FFA114',
  ARE_BG: '#DFB4001A',
  CONTINUE_INDICATOR: '#FF326A1A',
  TRUST_INDICATOR: '#3A5AFE1A',
  SUMMARY_BG: '#FAF5FF',
  SUMMARY_BORDER: '#F9FAFB',

  //Feedback colors
  GREEN_SUCCESS: '#4CAF50',
  GREEN_300: '#24D37A',
  GREEN_200: '#1FC16B',
  GREEN_100: '#84EBB4',
  GREEN_10: 'rgba(37, 211, 102, 0.10)',
  GREEN_8: 'rgba(37, 211, 102, 0.08)',
  GREEN_00: 'rgba(31, 193, 107, 0.10)',

  RED_300: '#E74C3C',
  RED_200: '#D00416',
  RED_100: '#FB3748',
  RED_00: 'rgba(208, 4, 22, 0.10)',

  YELLOW_300: '#F0B100',
  YELLOW_200: '#DFB400',
  YELLOW_100: '#FFDB43',
  YELLOW_00: 'rgba(223, 180, 0, 0.10)',

  //Neutral Colors:-
  //background/overlays
  BLACK: '#000000',
  BACKGROUND_GREY_400: '#A4A4A4',
  BACKGROUND_GREY_300: '#BBBBBB',
  BACKGROUND_GREY_200: '#D2D2D2',
  BACKGROUND_GREY_100: '#E8E8E8',
  BACKGROUND_GREY_50: '#F7F7F7',
  BACKGROUND_GREY_47: '#F5F5F5',
  BACKGROUND_GREY_45: '#F4F4F4',
  BACKGROUND_GREY_40: '#F2F4F6',
  BACKGROUND_GREY_30: '#F0F0F0',
  WHITE: '#FFFFFF',
  WHITE_10: '#FFFFFF1A',
  WHITE_20: '#FFFFFF33',
  WHITE_40: '#FFFFFF66',
  //TEXT
  TEXT_GREY_500: '#333333',
  TEXT_GREY_400: '#4a4a4a',
  TEXT_GREY_350: '#6A7282',
  TEXT_GREY_300: '#606060',
  TEXT_GREY_250: '#7A747C',
  TEXT_GREY_200: '#777777',
  TEXT_GREY_100: '#8E8E8E',
  TEXT_GREY_50: '#99A1AF',
  TEXT_GREY_00: '#B2B2B2',

  //Opacity
  OPACITY_72: 'rgba(0, 0, 0, 0.72)',
  OPACITY_60: '#00000099',
  OPACITY_54: 'rgba(0, 0, 0, 0.54)',
  OPACITY_50: 'rgba(0,0,0,0.5)',
  OPACITY_40: 'rgba(0, 0, 0, 0.40)',
  OPACITY_24: 'rgba(0, 0, 0, 0.24)',
  OPACITY_16: 'rgba(0, 0, 0, 0.16)',
  OPACITY_8: 'rgba(0, 0, 0, 0.08)',

  //Brand Colors:-
  //Purple
  PURPLE_500: '#270038',
  PURPLE_400: '#4B016B',
  PURPLE_300: '#6E019D',
  PURPLE_200: '#9101CF',
  PURPLE_200_LIGHT: '#B983FF',
  PURPLE_100: '#B306FE',
  PURPLE_10: 'rgba(144, 16, 207, 0.10)',
  PURPLE_00: '#F4E9FF',
  PRIMARY_00: 'rgba(145, 1, 207, 0.10)',

  //Orange
  ORANGE_700: '#FF6900',
  ORANGE_600: '#BB4D00',
  ORANGE_500: '#99460F',
  ORANGE_400: '#C75B14',
  ORANGE_300: '#E97224',
  ORANGE_200: '#EE9154',
  ORANGE_100: '#F2AE82',
  ORANGE_10: '#FEF6F0',
  ORANGE_08: '#FEF8F4',
  ORANGE_00: 'rgba(233, 114, 36, 0.10)',
  PEACH_00: '#F3DED8',

  //Lime-Green
  LIME_GREEN_500: '#577B15',
  LIME_GREEN_400: '#7BAE1D',
  LIME_GREEN_300: '#9EDB2B',
  LIME_GREEN_200: '#B5E45E',
  LIME_GREEN_100: '#DAF2AF',
  LIME_GREEN_00: 'rgba(181, 228, 94, 0.10)',

  //Accent colors:-
  //Rose
  ROSE_PURPLE_500: '#CC0038',
  ROSE_PURPLE_400: '#FF0046',
  ROSE_PURPLE_300: '#FF326A',
  ROSE_PURPLE_200: '#FF6690',
  ROSE_PURPLE_100: '#FF99B5',
  ROSE_PURPLE_50: '#E9D4FF',
  ROSE_PURPLE_00: 'rgba(255, 50, 106, 0.10)',
  ROSE_PURPLE_70_OPACITY: '#FF326AB2',
  ROSE_PURPLE_10_OPACITY: '#FF326A1A',

  //Blue
  BLUE_500: '#0123D0',
  BLUE_400: '#062FFE',
  BLUE_300: '#3A5AFE',
  BLUE_200: '#6C84FE',
  BLUE_100: '#9FAEFF',
  BLUE_12: 'rgba(58, 90, 254, 0.12)',
  BLUE_00: 'rgba(58, 90, 254, 0.10)',
  SKY_BLUE: '#179BD7',
  //Seller:-
  //Seller
  PRIMARY_WHITE: '#FAEEFF',
};

export type GradientConfig = {
  colors: string[];
  start: {x: number; y: number};
  end: {x: number; y: number};
  locations?: number[];
};

export const Gradients: Record<string, GradientConfig> = {
  SELLER_PRIMARY_GRADIENT: {
    colors: ['#A600F7', '#9101CF'],
    start: {x: 0, y: 0},
    end: {x: 1, y: 1},
  },
  EARLY_SUNSET: {
    colors: ['#FFE897', '#FFB496'],
    start: {x: 0, y: 0},
    end: {x: 1, y: 1},
  },
  DEEP_OCEAN: {
    colors: ['#FEF0ED', '#ACE3F8'],
    start: {x: 0, y: 0},
    end: {x: 1, y: 1},
  },
  WILD_BERRY: {
    colors: ['#F8E5EB', '#E4EBFE'],
    start: {x: 0, y: 0},
    end: {x: 1, y: 1},
  },
  LIME_PASSION: {
    colors: ['#F4F576', '#80FDBB'],
    start: {x: 0, y: 0},
    end: {x: 1, y: 1},
  },
  MAGNIFICENT_SKY: {
    colors: ['#FFF9F3', '#FFEFEB'],
    start: {x: 0, y: 0},
    end: {x: 1, y: 1},
  },
  GOLD_MINE: {
    colors: ['#D8CAA7', '#FAF9DA'],
    start: {x: 0, y: 0},
    end: {x: 1, y: 1},
  },
  primary: {
    colors: ['#FFFFFF', '#000000'],
    start: {x: 0, y: 0},
    end: {x: 1, y: 1},
  },
  POPULAR_PICKS_GRADIENT: {
    // colors: ['#FDFEEC', '#EBFFF4'],
    colors: ['#DBD3F7', '#EFE5FF'],
    start: {x: 1, y: 1},
    end: {x: 0, y: 0},
  },
  ROCKET_DETAILS_GRADIENT: {
    colors: ['#FFEBEB', '#FFF7EB'],
    start: {x: 1, y: 1},
    end: {x: 0, y: 0},
  },
};

export default ColorPalette;
