import { ReactNode } from "react";
import Toast, { BaseToastProps } from 'react-native-toast-message';

export interface DynamicToastProps extends BaseToastProps {
  props?: {
    iconComponent?: ReactNode | String;
    customText?: string;
  };
}
