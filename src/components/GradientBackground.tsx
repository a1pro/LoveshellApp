import LinearGradient from 'react-native-linear-gradient';
import React from 'react';
import { StyleSheet } from 'react-native';
import { GradientBackgroundProps } from '../types';
import COLORS from '../utils/Colors';

const GradientBackground: React.FC<GradientBackgroundProps> = ({
  children,
  style,
  colors = [COLORS.appLinear1, COLORS.appLinear2],
  start = { x: 0, y: 0 },
  end = { x: 0, y: 1 },
}) => (
  <LinearGradient
    colors={colors}
    start={start}
    end={end}
    style={[styles.gradient, style]}
  >
    {children}
  </LinearGradient>
);

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
});

export default GradientBackground;
