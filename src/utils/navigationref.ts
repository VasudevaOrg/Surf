import {
  CommonActions,
  createNavigationContainerRef,
  StackActions,
} from '@react-navigation/native';
import {RootStackParamList} from '../../types/navigation';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export const navigate = (name: keyof RootStackParamList, params?: any) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
};

export const navigateAndReset = (
  name: keyof RootStackParamList,
  params?: any,
) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name, params}],
      }),
    );
  }
};

export const push = (name: keyof RootStackParamList, params?: any) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.push(name, params));
  }
};

export const pop = (count: number = 1) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.pop(count));
  }
};

export const popToTop = () => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.popToTop());
  }
};

export const replace = (name: keyof RootStackParamList, params?: any) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.replace(name, params));
  }
};

export const goBack = () => {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack();
  }
};

export const resetRoot = (routeName: keyof RootStackParamList) => {
  if (navigationRef.isReady()) {
    navigationRef.resetRoot({
      index: 0,
      routes: [{name: routeName}],
    });
  }
};

export const getCurrentRoute = () => {
  if (navigationRef.isReady()) {
    return navigationRef.getCurrentRoute()?.name;
  }
  return null;
};

export const getNavigationState = () => {
  if (navigationRef.isReady()) {
    return navigationRef.getRootState();
  }
  return null;
};

// Deprecated: Navigators are now state-driven. Use dispatch(setAuth) or dispatch(setGuest) instead.
export const navigateToMain = (screen?: string, params?: any) => {
  if (navigationRef.isReady()) {
    const routes: any[] = [];

    if (screen && screen !== 'Home') {
      // Prepend 'Home' to the stack so 'back' works correctly
      routes.push({
        name: 'MainScreens',
        state: {
          routes: [{name: 'Home'}, {name: screen, params: params}],
          index: 1,
        },
      });
    } else {
      routes.push({
        name: 'MainScreens',
        params: screen === 'Home' ? params : undefined,
      });
    }

    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: routes,
      }),
    );
  }
};

export const getScreenParams = <T extends keyof RootStackParamList>(
  route: string,
): RootStackParamList[T] | undefined => {
  if (navigationRef.isReady()) {
    const state = navigationRef.getRootState();
    const targetRoute = state.routes.find(r => r.name === route);
    return targetRoute?.params as RootStackParamList[T];
  }
  return undefined;
};
