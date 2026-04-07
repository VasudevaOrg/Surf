import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, View, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TypographyVariant } from '../../../../../components/MainComponents/Typography/Typography.types';
import ColorPalette from '../../../../../config/ColorPalette';
import QuestionMarkIcon from '../../../../../assets/icons/QuestionMarkIcon';
import { Header } from '../../../../../components/CustomComponents/Header/Header';
import ArrowLeftIcon from '../../../../../assets/icons/ArrowLeft';
import { goBack } from '../../../../../utils/navigationref';
import { getScreenHeight } from '../../../../../helpers/screenSize';
import { styles } from './OrderScreen.styles';
import { Typography } from '../../../../../components/MainComponents/Typography/Typography';
import { SearchBox } from '../../../../../components/CustomComponents/SearchBox/SearchBox';
import MicrophoneIcon from '../../../../../assets/icons/MicrophoneIcon';
import { SlidingBar } from '../../../../../components/CustomComponents/SlidingBar/SlidingBar';
import MyOrders from '../../../../../components/CustomComponents/AccountComponents/OrderComponent/MyOrders';
import OrderSkeleton from './OrderSkeleton';
import axios from 'axios';
import { API_ENDPOINTS } from '../../../../../config/ApiConfig';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store';
import ScreenWrapper from '../../../../../components/CustomComponents/ScreenWrapper/ScreenWrapper';

interface Product {
  product_id: string | number;
  product: string;
  image_url: string;
  extra?: {
    main_pair?: {
      detailed?: {
        image_path: string;
      };
    };
  };
  main_pair?: {
    detailed?: {
      image_path: string;
    };
  };
  quantity: string;
  price: string;
  currency: string;
}

interface Order {
  order_id: string;
  status: string;
  timestamp: string;
  total: string;
  currency: string;
  company: string;
  products: Product[];
  subtotal_discount?: string | number;
  discount?: string | number;
  promotions?: any;
}

interface OrderStatus {
  name: string;
  value: string;
}

interface StatusOption {
  id: string | number;
  label: string;
}

const CustomSearchBox = React.memo(
  ({
    value,
    onChangeText,
    placeholder,
  }: {
    value: string;
    onChangeText: (text: string) => void;
    placeholder: string;
  }) => {
    return (
      <View style={styles.searchBoxContainer}>
        <SearchBox
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          customContainerStyle={styles.searchInput}
          iconColor={ColorPalette.TEXT_GREY_400 as string}
          iconSize={20}
          iconStroke={2}
          placeholderColor={ColorPalette.TEXT_GREY_100 as string}
          editable={true}
          autoFocus={false}
        />
        <View style={styles.micIconContainer}>
          <MicrophoneIcon
            size={20}
            color="#606060"
            style={undefined}
            onPress={undefined}
          />
        </View>
      </View>
    );
  },
);

const OrderScreen = () => {
  const navigation = useNavigation<any>();
  const [searchText, setSearchText] = useState('');
  const [selectedOption, setSelectedOption] = useState<StatusOption>({
    id: 'all',
    label: 'All',
  });
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusMap, setStatusMap] = useState<Record<string, string>>({});
  const [topRowOptions, setTopRowOptions] = useState<StatusOption[]>([
    { id: 'all', label: 'All' },
  ]);
  const [bottomRowOptions, setBottomRowOptions] = useState<StatusOption[]>([]);
  const userId = useSelector((state: RootState) => state.auth.userId);

  const handleSearchChange = (text: string) => {
    setSearchText(text);
  };

  const fetchOrders = useCallback(async () => {
    if (!userId) {
      setIsLoading(false);
      return;
    }
    try {
      setIsLoading(true);
      // Using centralized API configuration for orders
      const response = await axios.get(API_ENDPOINTS.ORDERS(userId));

      const data = response.data;

      if (data.orders) {
        setOrders(data.orders);
        setFilteredOrders(data.orders);
      }

      if (data.order_statuses) {
        // Create status map for easy lookup
        const map: Record<string, string> = {};
        data.order_statuses.forEach((s: any) => (map[s.value] = s.name));
        setStatusMap(map);

        // Generate tabs
        const allOption = { id: 'all', label: 'All' };
        const statusOptions = data.order_statuses.map((s: any) => ({
          id: s.value,
          label: s.name,
        }));

        const row1 = [allOption, ...statusOptions.slice(0, 3)]; // First 4 items
        const row2 = statusOptions.slice(3); // Rest

        setTopRowOptions(row1);
        setBottomRowOptions(row2);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      // Min delay for skeleton
      setTimeout(() => setIsLoading(false), 1000);
    }
  }, [userId]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  useEffect(() => {
    if (selectedOption.id === 'all') {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(orders.filter(o => o.status === selectedOption.id));
    }
  }, [selectedOption, orders]);

  const handleOptionSelect = (option: StatusOption) => {
    setSelectedOption(option);
  };

  const getStatusLabel = (status: string) => {
    return statusMap[status] || status;
  };

  const getDate = (timestamp: string) => {
    return timestamp.split(',')[0]; // Just return the date part
  };

  const getProductImage = (product: any): any => {
    // Helper to recursively find any image path in the product object
    const findUri = (obj: any): string | null => {
      if (!obj || typeof obj !== 'object') return null;

      // Check common CS-Cart image fields
      if (typeof obj.image_path === 'string' && obj.image_path.length > 5)
        return obj.image_path;
      if (
        typeof obj.https_image_path === 'string' &&
        obj.https_image_path.length > 5
      )
        return obj.https_image_path;
      if (typeof obj.image_url === 'string' && obj.image_url.length > 5)
        return obj.image_url;

      // Recurse into children
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          const result = findUri(obj[key]);
          if (result) return result;
        }
      }
      return null;
    };

    const uri = findUri(product);
    return uri ? { uri } : require('../../../../../assets/images/demo.png');
  };

  return (
    // <SafeAreaView style={{flex: 1}} edges={['bottom']}>
    <ScreenWrapper
      backgroundColor={ColorPalette.WHITE}
      edges={['top', 'bottom']}>
      <Header
        name="Orders"
        variant={TypographyVariant.H6_MEDIUM}
        textColor={ColorPalette.TEXT_GREY_500 as string}
        leftIcon={
          <ArrowLeftIcon style={undefined} onPress={goBack} size={22} />
        }
        rightIcons={[
          {
            icon: QuestionMarkIcon as any,
            onPress: () => console.log('Help pressed'),
            size: 24,
            color: ColorPalette.TEXT_GREY_400 as string,
            strokeWidth: 2,
          },
        ]}
      />
      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: getScreenHeight(4) },
        ]}
        showsVerticalScrollIndicator={false}>
        <View style={styles.firstContainer}>
          <View style={styles.subOne}>
            <Typography
              text="My Orders"
              variant={TypographyVariant.LMEDIUM_REGULAR}
              customTextStyles={{ color: ColorPalette.TEXT_GREY_100 }}
            />
            <Typography
              text={selectedOption.label}
              variant={TypographyVariant.H5_SEMIBOLD}
              customTextStyles={{ color: ColorPalette.TEXT_GREY_500 }}
            />
          </View>
          <CustomSearchBox
            value={searchText}
            onChangeText={handleSearchChange}
            placeholder="Search Products"
          />
          <View style={styles.subThree}>
            <SlidingBar
              options={topRowOptions}
              selectedOption={selectedOption}
              onOptionSelect={handleOptionSelect}
            />
            <SlidingBar
              options={bottomRowOptions}
              selectedOption={selectedOption}
              onOptionSelect={handleOptionSelect}
            />
          </View>
        </View>

        {isLoading ? (
          <>
            <OrderSkeleton />
            <OrderSkeleton />
            <OrderSkeleton />
          </>
        ) : (
          filteredOrders.map(order => {
            // Products can be an array or an object indexed by ID
            const products = (
              Array.isArray(order.products)
                ? order.products
                : Object.values(order.products || {})
            ) as Product[];

            const applied_promotions = order.promotions
              ? Object.values(order.promotions)
              : [];
            const promoName =
              applied_promotions.length > 0
                ? (applied_promotions[0] as any).name
                : undefined;
            const discount = (order.subtotal_discount ||
              order.discount) as string;

            return products.map((product, index) => (
              <MyOrders
                key={`${order.order_id}-${index}`}
                orderId={Number(order.order_id)}
                productId={product.product_id}
                imageSource={getProductImage(product)}
                title={product?.product || 'Unknown Product'}
                shopName={order.company || 'Unknown Shop'}
                status={getStatusLabel(order.status)}
                date={getDate(order.timestamp)}
                rating="0"
                price={`${order.currency === 'EUR' ? '€' : '$'}${product.price
                  }`}
                discount={discount}
                promoName={promoName}
                orderTotal={order.total}
              />
            ));
          })
        )}
      </ScrollView>
    </ScreenWrapper>
  );
};

export default OrderScreen;
