import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import COLORS from '../utils/Colors';

const Loader = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" color={COLORS.appColor} />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({});
