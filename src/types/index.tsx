import { ReactNode } from 'react';
import { ViewStyle } from 'react-native';

export interface GrowthRecord {
  id: string;
}

export type RootStackParamList = {
  SplashScreen: undefined;
  WelcomeScreen: undefined;
  Login: undefined;
  Signup: undefined;
  ProfileScreen: undefined;
  ChildRegister: undefined;
  SelectLanguages: undefined;
  HomeScreen: undefined;
  Nutrition:undefined;
  Meals: undefined;
  MealCalendar: undefined;
  AddmealScreen: undefined;
  MealDetailScreen:undefined;
  RecipeScreen: undefined;
  AiScreen: {data:any};
  Growth: undefined;
  GrowthDetails: undefined;
  WeightScreen: undefined;
  PercentaileScreen: undefined;
  Development: undefined;
  DetailDevelopment: undefined;
  HeightAiScreen:{ selectedGrowthRecord: GrowthRecord };
  PrankScreen:undefined;
  Vaccination:undefined;
  VaccinationCalendar:undefined;
  VaccinationForm:undefined;
};

export type BottomTabParamList = {
  Setting: undefined;
  UserProfile: undefined;
  HomeScreen: undefined;
  Child: undefined;
  Login: undefined;
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
