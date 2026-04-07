import React, {memo} from 'react';
import {StyleProp, TouchableOpacity, View, ViewStyle} from 'react-native';
import {styles} from './NewBank.styles';
import {getScreenHeight, getScreenWidth} from '../../../../helpers/screenSize';
import {Typography} from '../../../MainComponents/Typography/Typography';
import {TypographyVariant} from '../../../MainComponents/Typography/Typography.types';
import ColorPalette from '../../../../config/ColorPalette';
import {Badge} from '../../../MainComponents/Badges/Badge';
import {
  BadgeType,
  BadgeVariant,
} from '../../../MainComponents/Badges/Badge.types';
import {Spacing} from '../../../../config/globalStyles';
import FlowBite from '../../../../assets/icons/FlowBite';

interface NewBankItemProps {
  name: string;
  accountName: string;
  accountNumber: string;
  ifscCode: string;
  isSelected?: boolean;
  onSelect?: () => void;
  testID?: string;
  containerStyle?: StyleProp<ViewStyle>;
  onEdit?: () => void;
}

const BankInfoRow = memo(({label, value}: {label: string; value: string}) => (
  <View style={styles.secondSubOne}>
    <Typography
      text={label}
      variant={TypographyVariant.PMEDIUM_REGULAR}
      customTextStyles={{color: ColorPalette.TEXT_GREY_300}}
    />
    <Typography
      text={value}
      variant={TypographyVariant.PMEDIUM_REGULAR}
      customTextStyles={{color: ColorPalette.TEXT_GREY_300}}
    />
  </View>
));

const NewBank: React.FC<NewBankItemProps> = ({
  name,
  accountName,
  accountNumber,
  ifscCode,
  isSelected = false,
  onSelect,
  testID,
  containerStyle,
  onEdit,
}) => {
  // Memoized badge style
  const badgeStyle = {
    backgroundColor: ColorPalette.WelcomeBack,
    paddingHorizontal: getScreenWidth(1.5),
    paddingVertical: getScreenHeight(1),
    borderRadius: Spacing.XSmall,
  };

  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={onSelect}
      activeOpacity={0.8}
      testID={testID}>
      <View style={styles.firstContainer}>
        <Typography
          text={name}
          variant={TypographyVariant.LMEDIUM_MEDIUM}
          customTextStyles={{color: ColorPalette.TEXT_GREY_500}}
        />
        <TouchableOpacity style={styles.editContainer} onPress={onEdit}>
          <Typography
            text="Edit"
            variant={TypographyVariant.LMEDIUM_BOLD}
            customTextStyles={{color: ColorPalette.BLUE_200}}
          />
          <FlowBite
            size={14}
            color={ColorPalette.BLUE_200}
            style={undefined}
            onPress={undefined}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.secondContainer}>
        <BankInfoRow label="Account Holder’s Name" value={accountName} />
        <BankInfoRow label="Account number" value={accountNumber} />
        <BankInfoRow label="IFSC/BIC code" value={ifscCode} />
      </View>
    </TouchableOpacity>
  );
};

export default memo(NewBank);
