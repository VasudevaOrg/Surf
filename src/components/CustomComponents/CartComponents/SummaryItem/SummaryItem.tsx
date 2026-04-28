import React, { useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import DeleteIcon from '../../../../assets/icons/DeleteIcon';
import DoubleChevronIcon from '../../../../assets/icons/DoubleChevronIcon';
import { Typography } from '../../../MainComponents/Typography/Typography';
import { TypographyVariant } from '../../../MainComponents/Typography/Typography.types';
import { createSummaryItemStyles } from './SummaryItem.styles';
import { SummaryItemProps } from './SummaryItem.types';
import { getScreenHeight } from '../../../../helpers/screenSize';
import ColorPalette from '../../../../config/ColorPalette';

const SummaryItem: React.FC<SummaryItemProps> = ({
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
  shopName,
  onDelete,
  onNavigate,
  quantity
}) => {
  const styles = createSummaryItemStyles();
  const [containerHeight, setContainerHeight] = useState(0);

  const renderImage = () => {
    const fallbackImage = 'https://via.placeholder.com/150';

    const getValidSource = (): { uri: string } => {
      if (typeof imageSource === 'string' && imageSource.trim() !== '') {
        return { uri: imageSource };
      }
      if (
        imageSource &&
        typeof imageSource === 'object' &&
        'uri' in imageSource &&
        typeof imageSource.uri === 'string' &&
        imageSource.uri.trim() !== ''
      ) {
        return { uri: imageSource.uri };
      }
      return { uri: fallbackImage };
    };

    return <Image source={getValidSource()} style={styles.image} />;
  };

  const renderContent = () => (
    <View
      style={styles.mainContainer}
      onLayout={event => {
        setContainerHeight(event.nativeEvent.layout.height);
      }}>
      {/* Left Section: Image and Text */}
      <View style={styles.leftSection}>
        <View style={[styles.imageContainer, imageContainerStyle]}>
          {renderImage()}
        </View>

        <View style={[styles.contentContainer, contentContainerStyle]}>
          {/* Title at the top */}
          <View style={styles.topContent}>
            <Typography
              variant={titleVariant}
              text={title}
              numberOfLines={2}
              customTextStyles={styles.titleText}
            />
            <Typography
              text={shopName}
              variant={TypographyVariant.LMEDIUM_REGULAR}
              customTextStyles={styles.shopNameText}
            />
          </View>

          {/* Price at the bottom */}
          <View style={styles.priceContainer}>
            <Typography
              variant={priceVariant}
              text={
                typeof price === 'string'
                  ? price
                  : `€${typeof price === 'number' ? price.toFixed(2) : '0.00'}`
              }
              customTextStyles={styles.priceText}
            />
            {strikethroughPrice && (
              <Typography
                text={
                  typeof strikethroughPrice === 'string'
                    ? strikethroughPrice
                    : `€${typeof strikethroughPrice === 'number'
                      ? strikethroughPrice.toFixed(2)
                      : '0.00'
                    }`
                }
                variant={TypographyVariant.LMEDIUM_REGULAR}
                customTextStyles={styles.strikethroughText}
              />
            )}
            {quantity && (
              <Typography
                text={`  × ${quantity}`}
                variant={TypographyVariant.LMEDIUM_REGULAR}
                customTextStyles={{ color: ColorPalette.TEXT_GREY_100 }}
              />
            )}
          </View>
        </View>
      </View>

      {/* Right Section with vertically aligned icons */}
      {/* <View
        style={[
          styles.rightSection,
          containerHeight > 0 && {
            height: containerHeight - styles.mainContainer.paddingVertical * 2,
            justifyContent: 'space-between',
            paddingVertical: getScreenHeight(0.5),
          },
        ]}>
        <DoubleChevronIcon
          onPress={onNavigate}
          size={16}
          style={undefined}
          color={ColorPalette.TEXT_GREY_400 as string}
        />
      </View> */}
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

export default SummaryItem;
