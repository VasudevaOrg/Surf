import React from 'react';
import { View, ScrollView } from 'react-native';
import BasicSkeleton from '../../MainComponents/Skeleton/BasicSkeleton';
import { getScreenWidth, getScreenHeight } from '../../../helpers/screenSize';
import ColorPalette from '../../../config/ColorPalette';

const HomeScreenSkeleton = () => {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: ColorPalette.BACKGROUND_GREY_47 }}>
      {/* Banner Skeleton */}
      <View style={{ padding: getScreenWidth(4) }}>
        <BasicSkeleton
          width="100%"
          height={getScreenHeight(20)}
          borderRadius={12}
        />
      </View>

      {/* Categories Section */}
      <View
        style={{
          paddingHorizontal: getScreenWidth(4),
          marginTop: getScreenHeight(2),
        }}>
        <BasicSkeleton width={150} height={24} borderRadius={4} />
        <View
          style={{
            flexDirection: 'row',
            gap: getScreenWidth(3),
            marginTop: getScreenHeight(1.5),
          }}>
          {[1, 2, 3, 4].map(i => (
            <View key={i} style={{ alignItems: 'center' }}>
              <BasicSkeleton width={70} height={70} borderRadius={35} />
              <BasicSkeleton
                width={60}
                height={12}
                borderRadius={4}
                style={{ marginTop: 8 }}
              />
            </View>
          ))}
        </View>
      </View>

      {/* Products Section */}
      <View
        style={{
          paddingHorizontal: getScreenWidth(4),
          marginTop: getScreenHeight(3),
        }}>
        <BasicSkeleton width={180} height={24} borderRadius={4} />
        <View
          style={{
            flexDirection: 'row',
            gap: getScreenWidth(3),
            marginTop: getScreenHeight(1.5),
          }}>
          {[1, 2].map(i => (
            <View
              key={i}
              style={{
                flex: 1,
                backgroundColor: ColorPalette.WHITE,
                borderRadius: 12,
                padding: getScreenWidth(3),
              }}>
              <BasicSkeleton
                width="100%"
                height={getScreenHeight(18)}
                borderRadius={8}
              />
              <BasicSkeleton
                width="80%"
                height={16}
                borderRadius={4}
                style={{ marginTop: 12 }}
              />
              <BasicSkeleton
                width="60%"
                height={14}
                borderRadius={4}
                style={{ marginTop: 8 }}
              />
              <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
                <BasicSkeleton width={50} height={20} borderRadius={4} />
                <BasicSkeleton width={40} height={20} borderRadius={4} />
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Another Section */}
      <View
        style={{
          paddingHorizontal: getScreenWidth(4),
          marginTop: getScreenHeight(3),
        }}>
        <BasicSkeleton width={200} height={24} borderRadius={4} />
        <View style={{ marginTop: getScreenHeight(1.5) }}>
          <BasicSkeleton
            width="100%"
            height={getScreenHeight(15)}
            borderRadius={12}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreenSkeleton;
