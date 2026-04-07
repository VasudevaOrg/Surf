import React from 'react';
import {Modal as RNModal, TouchableOpacity, View} from 'react-native';
import CloseIcon from '../../../assets/icons/CloseIcon';
import {
  Button,
  ButtonSize,
  ButtonState,
  ButtonType,
  ButtonVariant,
} from '../../MainComponents/Button';
import {Typography} from '../../MainComponents/Typography/Typography';
import {TypographyVariant} from '../../MainComponents/Typography/Typography.types';
import {styles} from './ConfirmationModal.styles';
import {ConfirmationModalProps} from './ConfirmationModal.types';
import ColorPalette from '../../../config/ColorPalette';
import {Spacing} from '../../../config/globalStyles';

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isVisible,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
}) => {
  return (
    <RNModal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}>
      <TouchableOpacity
        style={{
          flex: 1,
          backgroundColor: ColorPalette.OPACITY_24,
          justifyContent: 'flex-end',
        }}
        activeOpacity={1}
        onPress={onClose}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={e => e.stopPropagation()}>
            <View style={styles.header}>
              <Typography
                variant={TypographyVariant.H5_BOLD}
                text={title}
                customTextStyles={styles.title}
              />
              <TouchableOpacity
                onPress={onClose}
                style={styles.closeButton}
                accessibilityLabel="Close modal">
                <CloseIcon />
              </TouchableOpacity>
            </View>

            {message && (
              <Typography
                variant={TypographyVariant.PMEDIUM_REGULAR}
                text={message}
                customTextStyles={styles.message}
              />
            )}

            <View style={styles.footer}>
              <Button
                text={cancelText}
                onPress={onClose}
                variant={ButtonVariant.SECONDARY}
                state={ButtonState.DEFAULT}
                size={ButtonSize.MEDIUM}
                type={ButtonType.OUTLINED}
                customStyles={{
                  borderRadius: Spacing.Medium,
                  flex: 1,
                  borderColor: ColorPalette.ROSE_PURPLE_300,
                  borderWidth: 1.5,
                }}
                customTextStyles={{
                  color: ColorPalette.ROSE_PURPLE_300,
                }}
              />
              <Button
                text={confirmText}
                onPress={onConfirm}
                variant={ButtonVariant.PRIMARY}
                state={ButtonState.DEFAULT}
                size={ButtonSize.MEDIUM}
                bgColor={ColorPalette.ROSE_PURPLE_300}
                customStyles={{
                  borderRadius: Spacing.Medium,
                  flex: 1,
                }}
                withShadow
              />
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </RNModal>
  );
};
