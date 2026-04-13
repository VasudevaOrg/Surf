export type RootStackParamList = {
  Onboarding: undefined;
  Authentication: undefined;
  MainScreens: undefined;
  WebViewScreen: {
    url: string;
    title: string;
  };
};

export type OnboardingStackParamList = {
  Splash: undefined;
  WelcomeScreen: undefined;
};

export type AuthStackParamList = {
  PhoneNumberScreen: undefined;
  OTPScreen: {
    phoneNumber?: string;
    email?: string;
    flow: 'login' | 'register';
    screenType?: string;
    returnTo?: string;
  };
  AuthSuccessScreen: {
    screenType?: string;
    authData?: {
      userId: string;
      email: string;
    };
    returnTo?: string;
  };
  CreateNewAccountScreen: {
    flow: 'login' | 'register';
  };
  WhatsAppAndEmailLogInScreen: {
    flow: 'login' | 'register';
    returnTo?: string;
  };
};

export type HomeNavigatorParamList = {
  HomeScreen: undefined;
  WishList: undefined;
  Notification: undefined;
  BrandsPage: undefined;
  VendorDetails: {
    vendorId: string;
    vendorName: string;
    isVendor: boolean;
  };
};

export type SearchNavigatorParamList = {
  SearchScreen: undefined;
  SearchResultScreen: {
    searchQuery?: string;
    category?: string;
    subCategory?: string;
    company_id?: string;
    company_name?: string;
  };
};

export type CategoriesNavigatorParamList = {
  CategoriesScreen: undefined;
  ViewAllScreen: {
    category?: string;
    categoryId?: string;
    subcategories?: any[];
  };
};

export type AccountNavigatorParamList = {
  AccountScreen: undefined;
  OrderScreen: undefined;
  AddressScreen: undefined;
  NewAddress: undefined;
  NewBankDetails: undefined;
  PersonalInfo: undefined;
  EditField: EditFieldParams;
  BankDetail: undefined;
  HelpSupport: undefined;
  MyOrderDetails: { orderId: number };
};

export type CartNavigatorParamList = {
  CartScreen: undefined;
  AddressAdd: undefined;
  ConfirmOrder: undefined;
};

export type DashboardStackParamList = {
  Home: {
    screen?: string;
  };
  Search: {
    screen?: string;
    params?: object;
  };
  Categories: {
    screen?: string;
    params?: object;
  };
  Account: {
    screen?: string;
    params?: object;
  };
  Cart: {
    screen?: string;
  };
  ProductDetail: {
    productId: string | number;
  };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}
