import React from 'react';
import { View } from 'react-native';
import { verticalScale } from '../utils/Metrics';
import { SpacerProps } from '../types';

const Spacer: React.FC<SpacerProps> = ({ size = 10, style }) => (
  <View style={[{ marginTop: verticalScale(size) }, style]} />
);

export default Spacer;
