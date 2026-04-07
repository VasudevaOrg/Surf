import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  ToastAndroid,
  Platform,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ArrowLeftIcon from '../../../../../../assets/icons/ArrowLeft';
import StarIcon from '../../../../../../assets/icons/StarIcon';
import FlowBite from '../../../../../../assets/icons/FlowBite';
import {Header} from '../../../../../../components/CustomComponents/Header/Header';
import {
  Button,
  ButtonSize,
  ButtonState,
  ButtonVariant,
} from '../../../../../../components/MainComponents/Button';
import {TypographyVariant} from '../../../../../../components/MainComponents/Typography/Typography.types';
import ColorPalette from '../../../../../../config/ColorPalette';
import {Spacing} from '../../../../../../config/globalStyles';
import {getScreenHeight} from '../../../../../../helpers/screenSize';
import {goBack} from '../../../../../../utils/navigationref';
import {styles} from './RateOrderScreen.styles';

import {useRoute} from '@react-navigation/native';
import {Typography} from '../../../../../../components/MainComponents/Typography/Typography';
import {useSelector} from 'react-redux';
import {RootState} from '../../../../../../store';
import axios from 'axios';
import {AUTH_HEADER, BASE_URL} from '../../../../../../config/ApiConfig';
import ScreenWrapper from '../../../../../../components/CustomComponents/ScreenWrapper/ScreenWrapper';
import {showToast} from '../../../../../../components/MainComponents/Toast/ToastHelper';
import {ToastMessages} from '../../../../../../components/MainComponents/Toast/ToastMessages';

const RateOrderScreen = () => {
  const route = useRoute();
  const {imageSource, title, orderId, productId} = (route.params as any) || {};
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const userId = useSelector((state: RootState) => state.auth.userId);

  const ratingLabels = ['Bad', 'Ok Ok', 'Good', 'Great', 'Excellent'];

  const handleRating = (index: number) => {
    setRating(index + 1);
  };

  const handleSave = async () => {
    if (rating === 0) {
      showToast(ToastMessages.RateOrderScreen.ratingRequired);
      return;
    }

    if (!userId) {
      showToast(ToastMessages.RateOrderScreen.loginRequired);
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        comment,
        files_url: '',
        object_id:
          typeof productId === 'string' ? parseInt(productId, 10) : productId,
        object_type: 'P',
        rating_value: rating,
        user_id: userId,
      };

      const response = await axios.post(`${BASE_URL}/api/reviews`, payload, {
        headers: {
          Authorization: AUTH_HEADER,
          'Content-Type': 'application/json',
        },
      });

      if (response.data && response.data.result) {
        if (Platform.OS === 'android') {
          showToast(ToastMessages.CommonToastMessages.reviewSubmitted);
        } else {
          showToast(ToastMessages.CommonToastMessages.reviewSubmitted);
        }
        goBack();
      } else {
        throw new Error(response.data?.message || 'Failed to submit review');
      }
    } catch (error: any) {
      console.error('Error submitting review:', error);
      showToast(
        ToastMessages.RateOrderScreen.failedToSubmitReview(error.message),
        error,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = () => {
    return ratingLabels.map((label, index) => {
      const isFilled = index + 1 <= rating;
      return (
        <View key={index} style={styles.starWrapper}>
          <TouchableOpacity onPress={() => handleRating(index)}>
            <StarIcon
              size={24}
              color={isFilled ? '#FFD700' : ColorPalette.WHITE}
              strokeColor={isFilled ? '#FFD700' : ColorPalette.TEXT_GREY_200}
              strokeWidth={1}
              style={undefined}
              onPress={() => handleRating(index)}
            />
          </TouchableOpacity>
          <Typography
            text={label}
            variant={TypographyVariant.PXSMALL_MEDIUM}
            customTextStyles={{
              color: isFilled
                ? ColorPalette.TEXT_GREY_500
                : ColorPalette.TEXT_GREY_300,
            }}
          />
        </View>
      );
    });
  };

  return (
    // <SafeAreaView style={{flex: 1}} edges={['bottom']}>
    <ScreenWrapper
      backgroundColor={ColorPalette.WHITE}
      edges={['top', 'bottom']}>
      <Header
        name="Rate Product"
        variant={TypographyVariant.H6_MEDIUM}
        textColor={ColorPalette.TEXT_GREY_500}
        leftIcon={
          <ArrowLeftIcon style={undefined} onPress={goBack} size={22} />
        }
      />
      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={[
          styles.scrollContent,
          {paddingBottom: getScreenHeight(4)},
        ]}
        showsVerticalScrollIndicator={false}>
        <View style={styles.momentContainer}>
          <Typography
            text="Please take a moment to rate the item you ordered. We'd love to hear your thoughts!"
            variant={TypographyVariant.LMEDIUM_MEDIUM}
            customTextStyles={{color: ColorPalette.TEXT_GREY_500}}
          />
        </View>

        <View style={styles.ratingCard}>
          <View style={styles.productRow}>
            <Image
              source={
                typeof imageSource === 'string'
                  ? {uri: imageSource}
                  : imageSource
              }
              style={styles.productImage}
            />
            <View style={styles.productInfo}>
              <View style={styles.productHeader}>
                <Typography
                  text={title || 'Product Name'}
                  variant={TypographyVariant.PMEDIUM_BOLD}
                  customTextStyles={{
                    color: ColorPalette.TEXT_GREY_800,
                    width: '80%',
                  }}
                  numberOfLines={2}
                />
                <FlowBite
                  size={16}
                  color={ColorPalette.BLUE_500}
                  onPress={() => console.log('Edit pressed')}
                />
              </View>
              <View style={styles.starContainer}>{renderStars()}</View>
            </View>
          </View>
        </View>

        <View style={{paddingHorizontal: 20, marginTop: 20}}>
          <Typography
            text="Write your feedback"
            variant={TypographyVariant.PMEDIUM_BOLD}
            customTextStyles={{
              color: ColorPalette.TEXT_GREY_500 as any,
              marginBottom: 10,
            }}
          />
          <TextInput
            placeholder="Tell us about your experience..."
            placeholderTextColor={ColorPalette.TEXT_GREY_200}
            multiline
            numberOfLines={4}
            value={comment}
            onChangeText={setComment}
            style={{
              borderWidth: 1,
              borderColor: ColorPalette.TEXT_GREY_100,
              borderRadius: 8,
              padding: 12,
              textAlignVertical: 'top',
              color: ColorPalette.TEXT_GREY_500,
              height: 120,
            }}
          />
        </View>
      </ScrollView>

      <View style={styles.bottomSection}>
        <Button
          text={isSubmitting ? 'Saving...' : 'Save'}
          onPress={handleSave}
          variant={ButtonVariant.PRIMARY}
          state={ButtonState.DEFAULT}
          loading={isSubmitting}
          size={ButtonSize.MEDIUM}
          customStyles={[{borderRadius: Spacing.Medium}]}
          withShadow
          bgColor={ColorPalette.ROSE_PURPLE_300 as any}
        />
      </View>
    </ScreenWrapper>
  );
};

export default RateOrderScreen;
