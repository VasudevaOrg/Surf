import Toast from 'react-native-toast-message';

type ToastVariant = 'success' | 'error' | 'loading';

/**
 * Unified toast helper for all platforms
 * All props are direct parameters with defaults
 */
export const showToast = (
  message: string,
  variant: ToastVariant = 'success',
  position: 'top' | 'bottom' = 'bottom',
  autoHide: boolean = true,
  visibilityTime: number = 2000
) => {
  if (!message) return;

  Toast.show({
    type: 'appToast',
    text1: message,
    props: { variant },
    position,
    autoHide,
    visibilityTime,
  });
};