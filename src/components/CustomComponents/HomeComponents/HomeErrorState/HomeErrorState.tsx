import React from 'react';
import { Image, View } from 'react-native';
import { Typography } from '../../../MainComponents/Typography/Typography';
import { TypographyVariant } from '../../../MainComponents/Typography/Typography.types';
import { Button } from '../../../MainComponents/Button/Button';
import {
  ButtonSize,
  ButtonType,
  ButtonVariant,
} from '../../../MainComponents/Button';
import { styles } from './HomeErrorState.styles';

interface HomeErrorStateProps {
  onRetry: () => void;
  title?: string;
  message?: string;
}

const HomeErrorState: React.FC<HomeErrorStateProps> = ({
  onRetry,
  title = 'Something went wrong',
  message = 'Please check your internet connection or try again later.',
}) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../../assets/images/emptyBox.png')}
        style={styles.illustration}
      />
      <Typography
        text={title}
        variant={TypographyVariant.H5_BOLD}
        customTextStyles={styles.title}
      />
      <Typography
        text={message}
        variant={TypographyVariant.LSMALL_REGULAR}
        customTextStyles={styles.message}
      />
      <Button
        text="Try Again"
        onPress={onRetry}
        size={ButtonSize.LARGE}
        type={ButtonType.PRIMARY}
        variant={ButtonVariant.PRIMARY}
        customStyles={styles.retryButton}
      />
    </View>
  );
};

export default HomeErrorState;
