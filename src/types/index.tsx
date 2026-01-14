import { ReactNode } from 'react';
import { ViewStyle } from 'react-native';

export interface GrowthRecord {
  id: string;
}

export interface VaccineData {
  id: string;
  name: string;
}

export interface RecipeItem {
  web_links: any;
  serving_suggestions: ReactNode;
  total_time: ReactNode;
  prep_time: ReactNode;
  suggested_date: ReactNode;
  meal_type: ReactNode;
  nutritional_info: any;
  id: string;
  name: string;
  description?: string;
  ingredients?: string[];
  instructions?: string[];
  servings?: number;
  prepTime?: number;
  cookTime?: number;
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

  Nutrition: undefined;
  Meals: undefined;
  MealCalendar: undefined;
  AddmealScreen: undefined;
  MealDetailScreen: undefined;
  RecipeScreen: undefined;
  AiScreen: { data: any };
  Growth: undefined;
  Community: undefined;
  ViewAllPost: undefined;
  AddPost: undefined;
  GrowthDetails: undefined;
  WeightScreen: undefined;
  PercentaileScreen: undefined;
  Development: undefined;
  DetailDevelopment: undefined;
  HeightAiScreen: { selectedGrowthRecord: GrowthRecord };
  PrankScreen: undefined;
  Vaccination: undefined;
  VaccinationCalendar: undefined;
  VaccinationForm: undefined;
  VaccinationUpdate: { vaccineData: VaccineData };
  FoodChart: undefined;
  BarcodeScreen: undefined;
  RecipeDetails: { recipe: RecipeItem };
  InternetScreen: undefined;
  AddnewTopic: undefined;
  FeaturedTopic: undefined;
  MyTopic: undefined;
  PrankDetails: {
    activityData: {
      id: number;
      child_id: number;
      age_months: number;
      activity_title: string;
      activity_description: string;
      materials_needed: string;
      instructions: string;
      benefits: string;
      safety_notes: string;
      difficulty_level: number;
      duration_minutes: number;
      ai_analysis?: string;
      development_area: string;
      suggested_date: string;
      is_completed: boolean;
      child_rating?: number | null;
      parent_notes?: string | null;
    };
    dayInfo: {
      date: string;
      day_name: string;
      day_short: string;
    };
  };
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
