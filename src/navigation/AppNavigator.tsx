import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../types';
import SplashScreen from '../screens/SplashScreen/SplashScreen';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import SignUpScreen from '../screens/SignUp/SignUpScreen';
import ChildRegister from '../screens/ChildRegister/ChildRegister';
import SelectLangauges from '../screens/SelectLanguages/SelectLanguages';
import BottomNavigator from './BottomNavigator';
import Nutrition from '../screens/Nutrition/Nutrition';
import Meals from '../screens/MealsScreen/Meals';
import MealCalendar from '../screens/MealCalendar/MealCalendar';
import AddmealScreen from '../screens/AddmealScreen/AddmealScreen';
import MealDetailScreen from '../screens/MealDetailScreen/MealDetailScreen';
import RecipeScreen from '../screens/RecipesScreen/RecipeScreen';
import AiScreen from '../screens/AiScreen/AiScreen';
import Growth from '../screens/Growth/Growth';
import GrowthDetails from '../screens/GrowthDetails/GrowthDetails';
import WeightScreen from '../screens/WeightScreen/WeightScreen';
import PercentaileScreen from '../screens/PercentaileScreen/PercentaileScreen';
import Development from '../screens/Development/Development';
import DetailDevelopment from '../screens/DetailDevlopment/DetailDevelopment';
import HeightAiScreen from '../screens/HeightAi/HeightAiScreen';
import PrankScreen from '../screens/PrankScreen/PrankScreen';
import Vaccination from '../screens/Vaccination/Vaccination';
import VaccinationCalendar from '../screens/VaccinationCalendar/VaccinationCalendar';
import VaccinationForm from '../screens/VaccinationForm/VaccinationForm';
import VaccinationUpdate from '../screens/VaccinationUpdate/VaccinationUpdate';
import Community from '../screens/Community/Community';
import ViewAllPost from '../screens/Community/ViewAllPost';
import AddPost from '../screens/Community/AddPost';
import FoodChart from '../screens/FoodChart/FoodChart';
import BarcodeScreen from '../screens/Barcode/BarcodeScreen';
import RecipeDetails from '../screens/RecipeDetails/RecipeDetails';
import PrankDetails from '../screens/PrankDetail/PrankDetails';
import InternetScreen from '../screens/InternetScreen/InternetScreen';
import AddnewTopic from '../screens/InternetTopic/AddnewTopic';
import FeaturedTopic from '../screens/InternetFeatured/FeaturedTopic';
import MyTopic from '../screens/InternetMyTopic/MyTopic';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const [initialRoute, setInitialRoute] = useState<keyof RootStackParamList | null>(null);
    useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('Usertoken');
        if (token) {
          setInitialRoute('HomeScreen');
        } else {
          setInitialRoute('SplashScreen');
        }
      } catch (error) {
        setInitialRoute('SplashScreen');
      }
    };
    checkToken();
  }, []);

  if (!initialRoute) {
    
    return <SplashScreen  navigation={{} as any} route={{} as any}/>;
  }

  return (
    <NavigationContainer>
      <SafeAreaProvider>
          <Stack.Navigator
          initialRouteName={initialRoute}
          screenOptions={{ headerShown: false }}
        >
              <Stack.Screen name="SplashScreen" component={SplashScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Signup" component={SignUpScreen} />
              <Stack.Screen name="ChildRegister" component={ChildRegister} />
              <Stack.Screen name="SelectLanguages" component={SelectLangauges} />
           <Stack.Screen name="HomeScreen" component={BottomNavigator} />
           <Stack.Screen name="Nutrition" component={Nutrition} />
          <Stack.Screen name="Meals" component={Meals} />
          <Stack.Screen name="MealCalendar" component={MealCalendar} />
          <Stack.Screen name='AddmealScreen' component={AddmealScreen}/>
          <Stack.Screen name="MealDetailScreen" component={MealDetailScreen}/>
          <Stack.Screen name="RecipeScreen" component={RecipeScreen}/>
          <Stack.Screen name="AiScreen" component={AiScreen} />
          <Stack.Screen name="Growth" component={Growth} />
          <Stack.Screen name="Community" component={Community} />
          <Stack.Screen name="ViewAllPost" component={ViewAllPost} />
          <Stack.Screen name="AddPost" component={AddPost} />
          <Stack.Screen name="GrowthDetails" component={GrowthDetails} />
          <Stack.Screen name="WeightScreen" component={WeightScreen} />
          <Stack.Screen name="PercentaileScreen" component={PercentaileScreen} />
          <Stack.Screen name='Development' component={Development}/>
          <Stack.Screen name='DetailDevelopment' component={DetailDevelopment}/>
          <Stack.Screen name='HeightAiScreen' component={HeightAiScreen}/>
          <Stack.Screen name='PrankScreen' component={PrankScreen}/>
          <Stack.Screen name='Vaccination' component={Vaccination}/>
          <Stack.Screen name='VaccinationCalendar' component={VaccinationCalendar}/>
          <Stack.Screen name='VaccinationForm' component={VaccinationForm}/>
          <Stack.Screen name='VaccinationUpdate' component={VaccinationUpdate}/>
          <Stack.Screen name="FoodChart" component={FoodChart}/>
           <Stack.Screen name="BarcodeScreen" component={BarcodeScreen}/>
           <Stack.Screen name="RecipeDetails" component={RecipeDetails}/>
            <Stack.Screen name="PrankDetails" component={PrankDetails}/>
            <Stack.Screen name="InternetScreen" component={InternetScreen} />
            <Stack.Screen name="AddnewTopic" component={AddnewTopic} />
            <Stack.Screen name="FeaturedTopic" component={FeaturedTopic} />
            <Stack.Screen name="MyTopic" component={MyTopic} />
        </Stack.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default AppNavigator;
