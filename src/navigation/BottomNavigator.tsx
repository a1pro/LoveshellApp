import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Platform, StyleSheet, View, Dimensions } from 'react-native';

import { BottomTabParamList } from '../types';
import COLORS from '../utils/Colors';
import { getPlatformFont } from '../assets/fonts';

import HomeScreen from '../screens/HomeScreen/HomeScreen';
import UserProfile from '../screens/UserProfile/UserProfile';
import Children from '../screens/Children/Children';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const tabBarHeight = 70;

const BottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: COLORS.black,
        tabBarInactiveTintColor: COLORS.grey,
        tabBarLabelStyle: {
          fontSize: 13,
          fontFamily: getPlatformFont('regular'),
          marginTop: 6,
        },
        tabBarStyle: {
          backgroundColor: COLORS.appLinear1,
          borderTopWidth: 0,
          height: tabBarHeight,
          opacity: 0.95,
          elevation: 0,
          shadowOpacity: 0,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let icon;
          if (route.name === 'Child') {
            icon = (
              <MaterialIcons
                name= 'child-care'
                size={26}
                color={color}
              />
            );
          } else if (route.name === 'HomeScreen') {
            icon = (
              <MaterialIcons
                name="home"
                size={26}
                color={color}
              />
            );
          } else if (route.name === 'UserProfile') {
            icon = (
              <MaterialIcons
                name="person"
                size={26}
                color={color}
              />
            );
          }
          return (
            <View style={styles.iconContainer}>{icon}</View>
          );
        },
      })}
    >
     
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false, tabBarLabel: 'Home' }}
      />
       <Tab.Screen
        name="Child"
        component={Children}
        options={{ headerShown: false, tabBarLabel: 'Child' }}
      />
      <Tab.Screen
        name="UserProfile"
        component={UserProfile}
        options={{ headerShown: false, tabBarLabel: 'Profile' }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Platform.OS === 'ios' ? 0 : 2,
  },
});

export default BottomNavigator;
