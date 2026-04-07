export interface ProductInfoProps {
  title: string;

  price: number;

  strikeThrough?: number;

  rating: number;

  ratingNumber: number;

  reviewNumber: number;

  sizes?: string[];

  deliveryTime: number;

  deliveryPrice?: number;

  minDeliveryPrice?: number;

  maxDeliveryPrice?: number;

  currency?: string;

  isFavorite?: boolean;

  onAddToWishlist?: () => void;

  onShare?: () => void;

  containerStyle?: object;
  stock?: number;
}
