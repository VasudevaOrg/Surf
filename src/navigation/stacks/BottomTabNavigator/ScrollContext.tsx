import React from 'react';
import {Animated} from 'react-native';

export const ScrollContext = React.createContext<{
  scrollY: Animated.Value;
  updateScrollY: (value: number) => void;
}>({
  scrollY: new Animated.Value(0),
  updateScrollY: () => {},
});
