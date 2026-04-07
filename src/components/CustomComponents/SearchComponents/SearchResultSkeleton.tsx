import React from 'react';
import { View } from 'react-native';
import BasicSkeleton from '../../MainComponents/Skeleton/BasicSkeleton';
import { getScreenWidth, getScreenHeight } from '../../../helpers/screenSize';
import ColorPalette from '../../../config/ColorPalette';

const SearchResultSkeleton = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        padding: getScreenWidth(4),
        gap: getScreenWidth(3),
      }}>
      {/* Left Column */}
      <View style={{ flex: 1, gap: getScreenHeight(1.5) }}>
        {/* Product Card 1 */}
        <View
          style={{
            backgroundColor: ColorPalette.WHITE,
            borderRadius: 12,
            padding: getScreenWidth(3),
            gap: getScreenHeight(1),
          }}>
          <BasicSkeleton
            width="100%"
            height={getScreenHeight(20)}
            borderRadius={8}
          />
          <BasicSkeleton width="80%" height={16} />
          <BasicSkeleton width="60%" height={14} />
          <View style={{ flexDirection: 'row', gap: 8, marginTop: 4 }}>
            <BasicSkeleton width={60} height={20} borderRadius={4} />
            <BasicSkeleton width={40} height={20} borderRadius={4} />
          </View>
        </View>

        {/* Product Card 2 */}
        <View
          style={{
            backgroundColor: ColorPalette.WHITE,
            borderRadius: 12,
            padding: getScreenWidth(3),
            gap: getScreenHeight(1),
          }}>
          <BasicSkeleton
            width="100%"
            height={getScreenHeight(20)}
            borderRadius={8}
          />
          <BasicSkeleton width="75%" height={16} />
          <BasicSkeleton width="55%" height={14} />
          <View style={{ flexDirection: 'row', gap: 8, marginTop: 4 }}>
            <BasicSkeleton width={60} height={20} borderRadius={4} />
            <BasicSkeleton width={40} height={20} borderRadius={4} />
          </View>
        </View>
      </View>

      {/* Right Column */}
      <View style={{ flex: 1, gap: getScreenHeight(1.5) }}>
        {/* Product Card 3 */}
        <View
          style={{
            backgroundColor: ColorPalette.WHITE,
            borderRadius: 12,
            padding: getScreenWidth(3),
            gap: getScreenHeight(1),
          }}>
          <BasicSkeleton
            width="100%"
            height={getScreenHeight(20)}
            borderRadius={8}
          />
          <BasicSkeleton width="70%" height={16} />
          <BasicSkeleton width="50%" height={14} />
          <View style={{ flexDirection: 'row', gap: 8, marginTop: 4 }}>
            <BasicSkeleton width={60} height={20} borderRadius={4} />
            <BasicSkeleton width={40} height={20} borderRadius={4} />
          </View>
        </View>

        {/* Product Card 4 */}
        <View
          style={{
            backgroundColor: ColorPalette.WHITE,
            borderRadius: 12,
            padding: getScreenWidth(3),
            gap: getScreenHeight(1),
          }}>
          <BasicSkeleton
            width="100%"
            height={getScreenHeight(20)}
            borderRadius={8}
          />
          <BasicSkeleton width="85%" height={16} />
          <BasicSkeleton width="65%" height={14} />
          <View style={{ flexDirection: 'row', gap: 8, marginTop: 4 }}>
            <BasicSkeleton width={60} height={20} borderRadius={4} />
            <BasicSkeleton width={40} height={20} borderRadius={4} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default SearchResultSkeleton;
