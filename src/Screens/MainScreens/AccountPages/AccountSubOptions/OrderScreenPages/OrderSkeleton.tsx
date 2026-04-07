import React from 'react';
import {View, StyleSheet} from 'react-native';
import BasicSkeleton from '../../../../../components/MainComponents/Skeleton/BasicSkeleton';
import {Spacing} from '../../../../../config/globalStyles';
import {
  getScreenHeight,
  getScreenWidth,
} from '../../../../../helpers/screenSize';
import ColorPalette from '../../../../../config/ColorPalette';

export const OrderSkeleton = () => {
  return (
    <View style={styles.container}>
      {/* Header Row: Order ID */}
      <View style={styles.headerRow}>
        <BasicSkeleton width={100} height={14} />
        <BasicSkeleton width={20} height={20} borderRadius={10} />
      </View>

      {/* Main Content: Image + Details */}
      <View style={styles.mainContent}>
        <BasicSkeleton
          width={getScreenWidth(20)}
          height={getScreenWidth(20)}
          borderRadius={8}
        />
        <View style={styles.detailsContainer}>
          <View>
            <BasicSkeleton width="80%" height={16} />
            <BasicSkeleton width="50%" height={12} style={{marginTop: 8}} />
          </View>

          <View style={styles.statusRow}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 6}}>
              <BasicSkeleton width={16} height={16} borderRadius={8} />
              <BasicSkeleton width={60} height={14} />
            </View>
            <BasicSkeleton width={80} height={12} />
          </View>
        </View>
      </View>

      {/* Footer: Rating + Button */}
      <View style={styles.footer}>
        <View>
          <BasicSkeleton width={120} height={20} />
          {/* Stars */}
          <BasicSkeleton width={150} height={12} style={{marginTop: 6}} />
        </View>
        <BasicSkeleton width={80} height={32} borderRadius={16} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Spacing.Medium,
    backgroundColor: ColorPalette.WHITE,
    marginBottom: Spacing.Medium,
    borderRadius: Spacing.Small,
    gap: Spacing.Small,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  mainContent: {
    flexDirection: 'row',
    gap: Spacing.Medium,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
});

export default OrderSkeleton;
