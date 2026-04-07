import React, { useCallback } from 'react';
import { View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { styles } from '../../Screens/MainScreens/SearchPages/SearchScreen.styles';
import ProductCard from './SearchComponents/SearchResultCardComponent/ProductCard';
import {TypographyVariant} from '../MainComponents/Typography/Typography.types';

const MemoizedProductCard = React.memo(ProductCard);

interface ProductsGridProps {
  products: any[];
  favorites: Record<string, boolean>;
  onToggleFavorite: (id: string) => void;
  onAddToCart: (id: string) => void;
  onCardPress: (id: string) => void;
}

export const ProductsGrid = React.memo(
  ({
    products,
    favorites,
    onToggleFavorite,
    onAddToCart,
    onCardPress,
  }: ProductsGridProps) => {
    const renderProduct = useCallback(
      ({ item, index }: { item: any; index: number }) => (
        <View
          style={[
            styles.productCardWrapper,
            index % 2 === 0 ? { marginRight: 12 } : {},
            index < products.length - 2 ? { marginBottom: 12 } : {},
          ]}>
          <MemoizedProductCard
            buttonText={'Add'}
            testID={String(item.id)}
            imageSource={item.imageSource}
            title={item.title}
            discountedPrice={item.discountedPrice}
            originalPrice={item.originalPrice}
            rating={item.rating}
            reviewCount={item.reviewCount}
            deliveryInfo={item.deliveryInfo}
            isFavorite={favorites[item.id]}
            onToggleFavorite={() => onToggleFavorite(item.id)}
            onAddToCart={() => onAddToCart(item.id)}
            onCardPress={() => onCardPress(item.id)}
            onImage={true}
            titleVariant={TypographyVariant.LMEDIUM_SEMIBOLD}
            priceVariant={TypographyVariant.LMEDIUM_SEMIBOLD}
          />
        </View>
      ),
      [products.length, favorites, onToggleFavorite, onAddToCart, onCardPress],
    );

    return (
      <FlashList
        data={products}
        renderItem={renderProduct}
        keyExtractor={item => String(item.id)}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />
    );
  },
);
