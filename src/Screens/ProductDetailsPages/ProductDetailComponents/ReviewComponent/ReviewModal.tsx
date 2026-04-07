import React, {useState} from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {Typography} from '../../../../components/MainComponents/Typography/Typography';
import {TypographyVariant} from '../../../../components/MainComponents/Typography/Typography.types';
import ColorPalette from '../../../../config/ColorPalette';
import StarRating from '../../../../assets/icons/StarRating';
import CloseIcon from '../../../../assets/icons/CloseIcon';
import CameraIcon from '../../../../assets/icons/CameraIcon';
import {styles} from './ReviewModal.styles';
import AnimatedTextInput from '../../../../components/MainComponents/TextInput/TextInput';
import {
  Button,
  ButtonSize,
  ButtonType,
  ButtonVariant,
} from '../../../../components/MainComponents/Button';

interface ReviewModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (rating: number, comment: string) => void;
  productName: string;
  loading?: boolean;
}

const ReviewModal: React.FC<ReviewModalProps> = ({
  visible,
  onClose,
  onSubmit,
  productName,
  loading = false,
}) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleRatingPress = (value: number) => {
    setRating(value);
  };

  const handleSubmit = () => {
    onSubmit(rating, comment);
    // Reset state after submit
    setRating(0);
    setComment('');
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Typography
              text="Write a Review"
              variant={TypographyVariant.H6_BOLD}
            />
            <TouchableOpacity onPress={onClose}>
              <CloseIcon
                size={24}
                color={ColorPalette.TEXT_GREY_500 as string}
              />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <Typography
              text={productName}
              variant={TypographyVariant.PMEDIUM_MEDIUM}
              customTextStyles={{color: ColorPalette.TEXT_GREY_200}}
            />

            <View style={styles.ratingContainer}>
              <Typography
                text="Overall Rating"
                variant={TypographyVariant.PMEDIUM_BOLD}
              />
              <View style={styles.starsRow}>
                {[1, 2, 3, 4, 5].map(star => (
                  <TouchableOpacity
                    key={star}
                    onPress={() => handleRatingPress(star)}>
                    <StarRating
                      size={32}
                      color={
                        (star <= rating
                          ? ColorPalette.GREEN_200
                          : ColorPalette.TEXT_GREY_100) as string
                      }
                      style={undefined}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.inputContainer}>
              <AnimatedTextInput
                label="Your Review"
                value={comment}
                onChangeText={setComment}
                placeholder="Write your experience with this product..."
                customInputStyles={styles.textArea}
                // @ts-ignore
                multiline={true}
                numberOfLines={4}
              />
            </View>

            <View style={styles.uploadSection}>
              <CameraIcon
                size={20}
                color={ColorPalette.TEXT_GREY_100 as string}
              />
              <Typography
                text="Upload Images (Mock)"
                variant={TypographyVariant.LSMALL_MEDIUM}
                customTextStyles={{color: ColorPalette.TEXT_GREY_100 as any}}
              />
            </View>

            <Button
              text="Submit Review"
              onPress={handleSubmit}
              size={ButtonSize.LARGE}
              type={ButtonType.PRIMARY}
              variant={ButtonVariant.PRIMARY}
              customStyles={styles.submitButton}
              disabled={rating === 0 || comment.trim() === ''}
              bgColor={ColorPalette.ROSE_PURPLE_400 as string}
              loading={loading}
            />
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default ReviewModal;
