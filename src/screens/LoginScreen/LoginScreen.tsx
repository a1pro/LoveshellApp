import React, { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import styles from './style';
import GradientBackground from '../../components/GradientBackground';
import { Image, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomText } from '../../components/CustomText';
import Spacer from '../../components/Spacer';
import CustomInput from '../../components/CustomInput';
import { verticalScale } from '../../utils/Metrics';
import COLORS from '../../utils/Colors';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import CustomButton from '../../components/CustomButton';
import IMAGES from '../../assets/images';
import { KeyboardAvoidingContainer } from '../../components/KeyboardAvoidingComponent';
type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [inputData, setInputData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [remTick, setRemTick] = useState(false);
  const handleInputChange = (fieldName: string, value: string) => {
    setInputData(prev => ({ ...prev, [fieldName]: value }));
  };
  const onTickPress = () => {
    setRemTick(!remTick);
  };
  return (
    <GradientBackground>
      <KeyboardAvoidingContainer>
        <SafeAreaView style={styles.container}>
          <View style={styles.viewCon}>
            <CustomText type="subHeading" fontFamily="bold" style={styles.txt}>
              Login
            </CustomText>
            <Spacer />
            <CustomText type="small" style={styles.txt}>
              Enter your email and password to log in
            </CustomText>

            <View style={{ gap: 10, marginTop: verticalScale(40) }}>
              <CustomInput
                label="Username"
                placeholder="Username"
                onChangeText={value => handleInputChange('username', value)}
                value={inputData.username}
              />
              <CustomInput
                keyboardType="email-address"
                placeholder="Email"
                onChangeText={value => handleInputChange('email', value)}
                value={inputData.email}
                label="Email"
              />
              <CustomInput
                type="password"
                placeholder="Password"
                onChangeText={value => handleInputChange('password', value)}
                value={inputData.password}
                label="Password"
              />
            </View>
            <Spacer size={20} />
            <View style={styles.flexBox}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={onTickPress}
                style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}
              >
                <MaterialIcons
                  name={remTick ? 'check-box' : 'check-box-outline-blank'}
                  size={22}
                  color={COLORS.black}
                />

                <CustomText type="small" color={COLORS.shottxt}>
                  Remember me
                </CustomText>
              </TouchableOpacity>
              <CustomText type="small" color={COLORS.blue}>
                Forgot Password ?
              </CustomText>
            </View>
            <Spacer size={20} />
            <CustomButton onPress={() => {}} title="Log In" />
            <Spacer size={30} />
            <View style={styles.flexBox}>
              <View style={styles.border} />
              <CustomText type="small" color={COLORS.shottxt}>
                Or login with
              </CustomText>
              <View style={styles.border} />
            </View>
            <Spacer size={25} />
            <View style={styles.flexBox}>
              <TouchableOpacity style={styles.btns}>
                <Image
                  source={IMAGES.google}
                  resizeMode="contain"
                  style={{ width: 20, height: 20 }}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.btns}>
                <Image
                  source={IMAGES.fb}
                  resizeMode="contain"
                  style={{ width: 20, height: 20 }}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.btns}>
                <Image
                  source={IMAGES.apple}
                  resizeMode="contain"
                  style={{ width: 20, height: 20 }}
                />
              </TouchableOpacity>
            </View>
            <Spacer size={25} />

            <CustomText
              type="small"
              color={COLORS.shottxt}
              style={{ textAlign: 'center' }}
            >
              Don’t have an account?{` `}
              <CustomText
                onPress={() => navigation.navigate('Signup')}
                type="small"
                color={COLORS.blue}
                style={{ textAlign: 'center' }}
              >
                Sign Up
              </CustomText>
            </CustomText>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingContainer>
    </GradientBackground>
  );
};

export default LoginScreen;
