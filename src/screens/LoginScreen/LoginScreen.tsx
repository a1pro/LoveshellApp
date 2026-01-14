import React, { useState, useEffect, useRef } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import styles from './style';
import GradientBackground from '../../components/GradientBackground';
import { Image, TouchableOpacity, View, BackHandler } from 'react-native';
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
import Toast from 'react-native-toast-message';
import axios from 'axios';
import ENDPOINTS, { API_URL } from '../../APIService/endPoints';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [inputData, setInputData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const { t } = useTranslation(); 
  const [loading, setLoading] = useState(false);
  const [remTick, setRemTick] = useState(false);

  // BackHandler Logic
  const userTokenRef = useRef<string | null>(null);

  useEffect(() => {
    // load token once on mount into a ref so the back handler can be synchronous
    const init = async () => {
      userTokenRef.current = await AsyncStorage.getItem('Usertoken');
    };
    init();

    const onBackPress = () => {
      if (!userTokenRef.current) {
        BackHandler.exitApp();
        return true;  
      }
      return false;  
    };

    const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => subscription.remove();
  }, []);

  const handleInputChange = (fieldName: string, value: string) => {
    setInputData(prev => ({ ...prev, [fieldName]: value }));
  };
  const onTickPress = () => {
    setRemTick(!remTick);
  };
  const validateForm = () => {
    
    if (!inputData.email.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Validation',
        text2: 'Email is required',
      });
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(inputData.email)) {
      Toast.show({
        type: 'error',
        text1: 'Validation',
        text2: 'Enter a valid email address',
      });
      return false;
    }
    if (!inputData.password.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Validation',
        text2: 'Password is required',
      });
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;
    setLoading(true)
    try {
      const formdata = new FormData()
      formdata.append('username', inputData.username),
      formdata.append('email', inputData.email),
      formdata.append('password', inputData.password)

      const res = await axios.post(`${API_URL}${ENDPOINTS.login}`, formdata, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
      console.log('API Response:', res.data);
      if (res.data.success ===true) {
        await AsyncStorage.setItem('Usertoken', res.data.token);
        await AsyncStorage.setItem('userData', JSON.stringify(res.data.user));
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: res.data.message || 'Login Successful',
        });
        navigation.navigate('HomeScreen');
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: res.data.message || 'Login Failed',
        });
      }
    } catch (error: any) {
      let errorMessage = 'Please try again later';
      if (error.response) {
        errorMessage = error.response.data?.message || `Server error: ${error.response.status}`;
      } else if (error.request) {
        errorMessage = 'Network error - Please check your connection';
      } else {
        errorMessage = error.message || 'An unexpected error occurred';
      }
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <GradientBackground>
      <KeyboardAvoidingContainer>
        <SafeAreaView style={styles.container}>
          <View style={styles.viewCon}>
            <CustomText type="subHeading" fontFamily="bold" style={styles.txt}>
              {t('login')}
            </CustomText>
            <Spacer />
            <CustomText type="small" style={styles.txt}>
             {t('loginText')}
            </CustomText>

            <View style={{ gap: 10, marginTop: verticalScale(40) }}>
              
              <CustomInput
                keyboardType="email-address"
                placeholder="Email"
                onChangeText={value => handleInputChange('email', value)}
                value={inputData.email}
                label={t('email')}
              />
              <CustomInput
                type="password"
                placeholder="Password"
                onChangeText={value => handleInputChange('password', value)}
                value={inputData.password}
                label={t('password')}
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
                  {t("remberMe")}
                </CustomText>
              </TouchableOpacity>
              <CustomText type="small" color={COLORS.blue}>
                {t('forgotPassword')}
              </CustomText>
            </View>
            <Spacer size={20} />
            <CustomButton onPress={() => {handleLogin() }} title={t('login')}  isLoading={loading}/>
            <Spacer size={30} />
            <View style={styles.flexBox}>
              <View style={styles.border} />
              <CustomText type="small" color={COLORS.shottxt}>
                {t('orloginwith')}
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
              {t('donthaveAccount')}{` `}
              <CustomText
                onPress={() => navigation.navigate('Signup')}
                type="small"
                color={COLORS.blue}
                style={{ textAlign: 'center' }}
              >
                {t('Sign Up')}
              </CustomText>
            </CustomText>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingContainer>
    </GradientBackground>
  );
};

export default LoginScreen;
