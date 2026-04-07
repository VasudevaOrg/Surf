import {TypographyVariant} from '../../../MainComponents/Typography/Typography.types';

export interface ProductCardProps {
  imageSource: any; // Can be require() or uri string
  title: string;
  originalPrice?: number;
  discountedPrice: number;
  rating?: number;
  reviewCount?: number;
  deliveryInfo?: string;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  onAddToCart?: (product?: any) => void;
  onCardPress?: () => void;
  testID?: string;
  // Typography variants for customization
  titleVariant?: TypographyVariant;
  priceVariant?: TypographyVariant;
  // Button customization
  buttonProps?: any;
  buttonText?: string;
  onImage?: boolean;
  id?: string;
  stock?: number;
}
