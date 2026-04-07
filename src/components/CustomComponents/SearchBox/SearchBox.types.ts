import {ColorValue} from 'react-native';

export interface SearchBoxProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  testID?: string;
  customContainerStyle?: any;
  customInputStyle?: any;
  iconColor?: ColorValue;
  iconStroke?: number;
  iconSize?: number;
  placeholderColor?: ColorValue;
  editable?: boolean;
  autoFocus?: boolean;
  onSubmitEditing?: () => void;
}
