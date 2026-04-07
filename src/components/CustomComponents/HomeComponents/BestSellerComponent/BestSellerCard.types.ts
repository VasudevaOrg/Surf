import {ImageSourcePropType, StyleProp, ViewStyle} from 'react-native';
import {ButtonProps} from '../../../MainComponents/Button';
import {TypographyVariant} from '../../../MainComponents/Typography/Typography.types';

export interface BestSellerCardProps {
  imageSource: ImageSourcePropType | string;
  title: string;
  price: number;
  rating: number;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  onAddToCart?: (product?: any) => void;
  onCardPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  imageContainerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  titleVariant?: TypographyVariant;
  priceVariant?: TypographyVariant;
  buttonProps?: Partial<ButtonProps>;
  buttonText?: string;
  showRating?: boolean;
  testID?: string;
  strikethroughPrice: number;
  isProductDetail?: boolean;
  id?: string;
  stock?: number;
}
