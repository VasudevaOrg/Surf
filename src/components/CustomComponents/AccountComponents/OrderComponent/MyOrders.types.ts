export interface MyOrderProps {
  orderId: number;
  productId: string | number;
  imageSource: any;
  title: string;
  shopName: String;
  status: string;
  date: string;
  rating: string;
  price?: string;
  discount?: string;
  promoName?: string;
  orderTotal?: string;
}
