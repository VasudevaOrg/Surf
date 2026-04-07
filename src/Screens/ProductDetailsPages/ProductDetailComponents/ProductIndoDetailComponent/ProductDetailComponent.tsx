import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {getScreenHeight, getScreenWidth} from '../../../../helpers/screenSize';
import {Typography} from '../../../../components/MainComponents/Typography/Typography';
import {TypographyVariant} from '../../../../components/MainComponents/Typography/Typography.types';
import ColorPalette from '../../../../config/ColorPalette';
import ArrowDownIcon from '../../../../assets/icons/ArrowDownIcon';
import {Spacing} from '../../../../config/globalStyles';
import {stripHtmlTags} from '../../../../config/regex';

interface ProductFeature {
  label: string;
  value: string;
}

interface ProductDetailProps {
  name: string;
  features: ProductFeature[];
  description?: string;
}

const ProductDetailComponent: React.FC<ProductDetailProps> = ({
  name,
  features,
  description,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayFeatures = isExpanded ? features : features.slice(0, 3);
  const showReadMore =
    features.length > 3 || (description && description.length > 0);
  return (
    <View style={styles.mainContainer}>
      <Typography
        text="Product Details"
        variant={TypographyVariant.H6_MEDIUM}
        customTextStyles={{color: ColorPalette.TEXT_GREY_500}}
      />
      <View style={styles.productDetails}>
        <View
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: getScreenHeight(0.5),
            width: getScreenWidth(55),
          }}>
          <Typography
            text={`Name: ${name}`}
            variant={TypographyVariant.PSMALL_REGULAR}
            customTextStyles={{color: ColorPalette.TEXT_GREY_100}}
          />
          {displayFeatures.map((feature, index) => (
            <Typography
              key={index}
              text={`${feature.label}: ${feature.value}`}
              variant={TypographyVariant.PSMALL_REGULAR}
              customTextStyles={{color: ColorPalette.TEXT_GREY_100}}
            />
          ))}
          {isExpanded && description && (
            <Typography
              text={stripHtmlTags(description)}
              variant={TypographyVariant.PSMALL_REGULAR}
              customTextStyles={{
                color: ColorPalette.TEXT_GREY_100,
                marginTop: getScreenHeight(1),
              }}
            />
          )}
        </View>
        {showReadMore && (
          <TouchableOpacity
            onPress={() => setIsExpanded(!isExpanded)}
            style={{
              flexDirection: 'row',
              gap: getScreenWidth(0.5),
              alignItems: 'center',
              alignSelf: 'flex-end',
            }}>
            <Typography
              text={isExpanded ? 'Read Less' : 'Read More'}
              variant={TypographyVariant.PSMALL_MEDIUM}
              customTextStyles={{color: ColorPalette.PURPLE_200}}
            />
            <View
              style={{transform: [{rotate: isExpanded ? '180deg' : '0deg'}]}}>
              <ArrowDownIcon
                size={18}
                style={undefined}
                color={ColorPalette.PURPLE_200}
              />
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    paddingVertical: getScreenHeight(2),
    paddingHorizontal: getScreenWidth(4),
    gap: getScreenHeight(1),
    backgroundColor: ColorPalette.WHITE,
    borderRadius: Spacing.Small,
  },
  productDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: getScreenHeight(0.5),
  },
  sizeContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default ProductDetailComponent;
