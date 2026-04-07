import {ImageSourcePropType, StyleProp, ViewStyle} from 'react-native';
import {ButtonProps} from '../../../MainComponents/Button';
import {TypographyVariant} from '../../../MainComponents/Typography/Typography.types';

export interface CartItemProps {
  imageSource: ImageSourcePropType | string;
  title: string;
  price: number | string;
  onCardPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  imageContainerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  titleVariant?: TypographyVariant;
  priceVariant?: TypographyVariant;
  testID?: string;
  strikethroughPrice?: number | string;
  shopName?: string;
  quantity?: number;
  onIncrement?: () => void;
  onDecrement?: () => void;
  onDelete?: () => void;
  loading?: boolean;
}
