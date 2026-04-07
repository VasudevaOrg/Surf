import {View} from 'react-native';
import {Typography} from '../../MainComponents/Typography/Typography';
import {TypographyVariant} from '../../MainComponents/Typography/Typography.types';
import {styles} from './NotificationCard.styles';
import {NotificationCardProps} from './NotificationCard.types';

const NotificationCard = ({
  id,
  icon,
  bg,
  title,
  time,
  isRead,
}: NotificationCardProps) => {
  return (
    <View key={id} style={styles.card}>
      <View style={[styles.iconWrapper, {backgroundColor: bg}]}>{icon}</View>

      <View style={{flex: 1, marginLeft: 12}}>
        <Typography
          variant={TypographyVariant.PSMALL_MEDIUM}
          text={title}
          customTextStyles={styles.title}
        />

        <Typography
          variant={TypographyVariant.LSMALL_REGULAR}
          text={time}
          customTextStyles={styles.time}
        />
      </View>

      {!isRead && <View style={styles.unreadDot} />}
    </View>
  );
};

export default NotificationCard;
