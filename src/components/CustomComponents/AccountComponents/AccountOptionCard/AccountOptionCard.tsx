import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Typography} from '../../../MainComponents/Typography/Typography';
import {TypographyVariant} from '../../../MainComponents/Typography/Typography.types';
import {styles} from './AccountOptionCard.styles';

interface AccountOptionCardProps {
  label: string;
  icon: React.ReactNode;
  onPress: () => void;
}

export const AccountOptionCard = ({
  label,
  icon,
  onPress,
}: AccountOptionCardProps) => {
  return (
    <TouchableOpacity style={styles.gridItem} onPress={onPress}>
      <View style={styles.gridItemContent}>
        <View style={styles.iconWrapper}>{icon}</View>
        <Typography
          text={label}
          variant={TypographyVariant.LSMALL_MEDIUM}
          customTextStyles={styles.labelText}
        />
      </View>
    </TouchableOpacity>
  );
};
