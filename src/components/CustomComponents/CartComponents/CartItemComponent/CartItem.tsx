import React from 'react';
import {Image, TouchableOpacity, View, ActivityIndicator} from 'react-native';
import ColorPalette from '../../../../config/ColorPalette';
import {Typography} from '../../../MainComponents/Typography/Typography';
import {TypographyVariant} from '../../../MainComponents/Typography/Typography.types';
import {createBestSellerCardStyles} from './CartItem.styles';
import {CartItemProps} from './CartItem.types';
import {getScreenHeight, getScreenWidth} from '../../../../helpers/screenSize';
import DeleteIcon from '../../../../assets/icons/DeleteIcon';
import MinusIcon from '../../../../assets/icons/MinusIcon';
import PlusIcon from '../../../../assets/icons/PlusIcon';

const CartItem: React.FC<CartItemProps> = ({
  imageSource,
  title,
  price = 0,
  onCardPress,
  containerStyle,
  imageContainerStyle,
  contentContainerStyle,
  titleVariant = TypographyVariant.H6_MEDIUM,
  priceVariant = TypographyVariant.H6_BOLD,
  testID,
  strikethroughPrice,
  shopName = 'Lato Shoes shop',
  quantity = 1,
  onIncrement,
  onDecrement,
  onDelete,
  loading = false,
}) => {
  const styles = createBestSellerCardStyles();

  const renderImage = () => {
    const fallbackImage = 'https://via.placeholder.com/150';

    const getValidSource = (): {uri: string} => {
      if (typeof imageSource === 'string' && imageSource.trim() !== '') {
        return {uri: imageSource};
      }
      if (
        imageSource &&
        typeof imageSource === 'object' &&
        'uri' in imageSource &&
        typeof imageSource.uri === 'string' &&
        imageSource.uri.trim() !== ''
      ) {
        return {uri: imageSource.uri};
      }
      return {uri: fallbackImage};
    };

    return <Image source={getValidSource()} style={styles.image} />;
  };

  const renderContent = () => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
      }}>
      <View style={{flexDirection: 'row', gap: getScreenWidth(3), flex: 1}}>
        <View style={[styles.imageContainer, imageContainerStyle]}>
          {renderImage()}
        </View>

        <View
          style={[styles.contentContainer, contentContainerStyle, {flex: 1}]}>
          <View style={{gap: getScreenWidth(1), width: '100%'}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                width: '100%',
                gap: getScreenWidth(4),
              }}>
              <Typography
                variant={titleVariant}
                text={title}
                numberOfLines={1}
                customTextStyles={{
                  color: ColorPalette.TEXT_GREY_500,
                  flexWrap: 'wrap',
                  flex: 1,
                  // fontSize: 14
                }}
              />
              <View
                style={{
                  marginTop: getScreenHeight(1),
                  opacity: loading ? 0.5 : 1,
                }}>
                <DeleteIcon
                  onPress={loading ? undefined : onDelete}
                  size={18}
                  style={undefined}
                />
              </View>
            </View>
            <Typography
              text={shopName}
              variant={TypographyVariant.LMEDIUM_REGULAR}
              customTextStyles={{
                color: ColorPalette.TEXT_GREY_100,
                fontSize: 12,
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: getScreenWidth(3),
            }}>
            <View style={{flexDirection: 'row'}}>
              <Typography
                text={'Size:'}
                variant={TypographyVariant.LMEDIUM_REGULAR}
                customTextStyles={{
                  color: ColorPalette.TEXT_GREY_100,
                  marginTop: getScreenHeight(0.8),
                  fontSize: 12,
                }}
              />
              <Typography
                text={' M'}
                variant={TypographyVariant.LMEDIUM_REGULAR}
                customTextStyles={{
                  color: ColorPalette.TEXT_GREY_300,
                  marginTop: getScreenHeight(0.8),
                  fontSize: 12,
                }}
              />
            </View>
            <View style={{flexDirection: 'row'}}>
              <Typography
                text={'Color:'}
                variant={TypographyVariant.LMEDIUM_REGULAR}
                customTextStyles={{
                  color: ColorPalette.TEXT_GREY_100,
                  marginTop: getScreenHeight(0.8),
                  fontSize: 12,
                }}
              />
              <Typography
                text={' Grey'}
                variant={TypographyVariant.LMEDIUM_REGULAR}
                customTextStyles={{
                  color: ColorPalette.TEXT_GREY_300,
                  marginTop: getScreenHeight(0.8),
                  fontSize: 12,
                }}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: getScreenHeight(0.5),
            }}>
            <View style={styles.priceRatingContainer}>
              <Typography
                variant={priceVariant}
                text={
                  typeof price === 'string'
                    ? price
                    : `€${
                        typeof price === 'number' ? price.toFixed(2) : '0.00'
                      }`
                }
                customTextStyles={{color: ColorPalette.TEXT_GREY_500}}
              />
              {strikethroughPrice && (
                <Typography
                  text={
                    typeof strikethroughPrice === 'string'
                      ? strikethroughPrice
                      : `€${
                          typeof strikethroughPrice === 'number'
                            ? strikethroughPrice.toFixed(2)
                            : '0.00'
                        }`
                  }
                  variant={TypographyVariant.LMEDIUM_REGULAR}
                  customTextStyles={{
                    color: ColorPalette.TEXT_GREY_100,
                    textDecorationLine: 'line-through',
                  }}
                />
              )}
            </View>
            <View style={styles.incrementContainer}>
              {loading ? (
                <View
                  style={{
                    paddingHorizontal: getScreenWidth(4),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <ActivityIndicator
                    size="small"
                    color={ColorPalette.ROSE_PURPLE_300}
                  />
                </View>
              ) : (
                <>
                  <View
                    style={{
                      opacity: loading ? 0.5 : 1,
                    }}>
                    <MinusIcon
                      onPress={loading ? undefined : onDecrement}
                      style={undefined}
                      size={20}
                    />
                  </View>
                  <Typography
                    text={quantity.toString()}
                    variant={TypographyVariant.LMEDIUM_MEDIUM}
                    customTextStyles={{color: ColorPalette.COUNT_COLOR}}
                  />
                  <View
                    style={{
                      opacity: loading ? 0.5 : 1,
                    }}>
                    <PlusIcon
                      style={undefined}
                      onPress={loading ? undefined : onIncrement}
                      size={22}
                    />
                  </View>
                </>
              )}
            </View>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, containerStyle]} testID={testID}>
      {onCardPress ? (
        <TouchableOpacity
          style={styles.touchableContainer}
          onPress={onCardPress}
          activeOpacity={0.95}>
          {renderContent()}
        </TouchableOpacity>
      ) : (
        renderContent()
      )}
    </View>
  );
};

export default CartItem;
