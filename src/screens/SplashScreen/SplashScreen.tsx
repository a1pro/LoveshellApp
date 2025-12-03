import React, { useEffect } from 'react';
import { ImageBackground } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import styles from './style';
import IMAGES from '../../assets/images';
type Props = NativeStackScreenProps<RootStackParamList, 'SplashScreen'>;

const SplashScreen: React.FC<Props> = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('SelectLanguages');
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return <ImageBackground source={IMAGES.splash} style={styles.viewCon} />;
};

export default SplashScreen;
