import { ReactNode } from 'react';
import { ViewStyle } from 'react-native';

export type RootStackParamList = {
  SplashScreen: undefined;
  WelcomeScreen: undefined;
  Login: undefined;
  Signup: undefined;
  ProfileScreen: undefined;
  ChildRegister: undefined;
  SelectLanguages: undefined;
};

export type BottomTabParamList = {
  Setting: undefined;
};
export interface GradientBackgroundProps {
  children?: ReactNode;
  colors?: [string, string] | [string, string, string];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  style?: ViewStyle;
}
export type SpacerProps = {
  size?: number;
  style?: ViewStyle;
};
