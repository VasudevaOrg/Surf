import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SystemBars } from 'react-native-edge-to-edge';
import { initialWindowMetrics, useSafeAreaInsets } from 'react-native-safe-area-context';
import ColorPalette from '../../../config/ColorPalette';

/**
 * Universal Screen Wrapper for iOS & Android Edge-to-Edge
 * 
 * Handles safe areas consistently across:
 * - iPhone notches and Dynamic Island
 * - Android punch-holes, notches, and gesture bars
 * - Foldable devices and tablets
 */

type ScreenWrapperProps = {
  children: React.ReactNode;
  style?: object;
  edges?: Array<'top' | 'bottom' | 'left' | 'right'>;
  backgroundColor?: any;
  StatusBar?: boolean;
}
const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  children,
  style,
  edges = ['top', 'bottom', 'left', 'right'],
  backgroundColor = '#fff',
  StatusBar = false
}) => {
  const insets = useSafeAreaInsets() || initialWindowMetrics?.insets || { top: 0, bottom: 0, left: 0, right: 0 };

  const dynamicPadding = {
    paddingTop: edges.includes('top') ? insets.top : 0,
    paddingBottom: edges.includes('bottom') ? insets.bottom : 0,
    paddingLeft: edges.includes('left') ? insets.left : 0,
    paddingRight: edges.includes('right') ? insets.right : 0,
  };
  // Decide system bar style automatically
  const systemBarStyle = StatusBar
    ? 'light' // HomeScreen: light content on dark bg
    : 'dark';

  return (
    <View style={[{ flex: 1, }, style]}>
      {/* Top system bar overlay */}
      {edges.includes('top') && insets.top > 0 && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: insets.top,
            backgroundColor: backgroundColor,
            zIndex: 999,
          }}
        />
      )}
      <SystemBars style={systemBarStyle} />

      {/* Main content */}
      <View style={[{ flex: 1 }, dynamicPadding]}>
        {children}
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ScreenWrapper;
