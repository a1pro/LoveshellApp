import React, { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import styles from './style';
import GradientBackground from '../../components/GradientBackground';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomText } from '../../components/CustomText';
import Spacer from '../../components/Spacer';
import CustomInput from '../../components/CustomInput';
import { verticalScale } from '../../utils/Metrics';
import COLORS from '../../utils/Colors';
import CountryPicker, { CountryCode } from 'react-native-country-picker-modal';
import CustomButton from '../../components/CustomButton';
import { KeyboardAvoidingContainer } from '../../components/KeyboardAvoidingComponent';
import VectorIcon from '../../components/VectorIcon';
import DatePicker from 'react-native-date-picker';

import { getPlatformFont } from '../../assets/fonts';
import Toast from 'react-native-toast-message';
import ENDPOINTS, { API_URL } from '../../APIService/endPoints';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
type Props = NativeStackScreenProps<RootStackParamList, 'Signup'>;

const SignUpScreen: React.FC<Props> = ({ navigation }) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [countryCode, setCountryCode] = useState<CountryCode>('IN');
  const [countryCode2, setCountryCode2] = useState('91');
  const [showPicker, setShowPicker] = useState(false);
  const [loading, setLoading] = useState(false);
   const { t } = useTranslation();
  const [inputData, setInputData] = useState({
    fullname: '',
    username: '',
    email: '',
    password: '',
  });

  const handleInputChange = (fieldName: string, value: string) => {
    setInputData(prev => ({ ...prev, [fieldName]: value }));
  };

  const validateForm = () => {
     if (!inputData.username.trim()) {
       Toast.show({
         type: 'error',
         text1: t("vallidationError"),
         text2: t("validUsername"),
       });
       return false;
     }
     if (!inputData.email.trim()) {
       Toast.show({
         type: 'error',
         text1: t("vallidationError"),
         text2: t("validEmail"),
       });
       return false;
     }
     if (!/\S+@\S+\.\S+/.test(inputData.email)) {
       Toast.show({
         type: 'error',
         text1: t("vallidationError"),
         text2: t("validEmail22"),
       });
       return false;
     }
   
   
     if (!inputData.password.trim()) {
       Toast.show({
         type: 'error',
         text1: t("vallidationError"),
         text2: t("passwordRequired"),
       });
       return false;
     }
     return true;
   };
const formatDate = (date: Date) => {
  const d = date.getDate().toString().padStart(2, '0');
  const m = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
  const y = date.getFullYear();
  return `${d}-${m}-${y}`;
};

const handleSignup = async () => {
  if (!validateForm()) return;
  setLoading(true);
  const language = await AsyncStorage.getItem("selectedLanguage") || 'en';
  try {
     const formdata = new FormData();
      formdata.append('username', inputData.username);
      formdata.append('email', inputData.email);
      formdata.append('password', inputData.password);
      formdata.append('preferred_language_code', language);
      formdata.append('dob', formatDate(date));

      const res = await axios.post(`${API_URL}${ENDPOINTS.register}`, formdata, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('API Response:', res.data);
        if (res.data.status === "success") {
         if (res.data.data.access_token) {
        await AsyncStorage.setItem('Usertoken', res.data.data.access_token);
        await AsyncStorage.setItem('userData', JSON.stringify(res.data.data.user));
        console.log('Token:', res.data.data.access_token);
        console.log('Token stored successfully');
      }
    }

      if (res.data.status === "success") {
        Toast.show({
          type: 'success',
          text1: t("successTitle"),
          text2: res.data.message || t("registerSuccess"),
        });
                
        navigation.navigate('ChildRegister');
      } else {
        Toast.show({
          type: 'error',
          text1: t("errorTitle"),
          text2: res.data.message || t("registerFail"),
        });
      }
    } catch (error: any) {
      console.log('Signup error:', error);
      
      let errorMessage = 'Please try again later';
      
      if (error.response) {
        errorMessage = error.response.data?.message || `Server error: ${error.response.status}`;
      } else if (error.request) {
        errorMessage = t("netError");
      } else {
        errorMessage = error.message || 'An unexpected error occurred';
      }
      
      Toast.show({
        type: 'error',
        text1: t("errorTitle"),
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
          <Spacer />
          <VectorIcon
            type="MaterialIcons"
            name="arrow-back"
            onPress={() => navigation.goBack()}
          />
          <View style={styles.viewCon}>
            <CustomText type="subHeading" fontFamily="bold" style={styles.txt}>
              {t('Sign Up')}
            </CustomText>
            <Spacer />
            <CustomText type="small" style={styles.txt}>
              {t('createAccountText')}
            </CustomText>

            <View style={{ gap: 10, marginTop: verticalScale(40) }}>
              <CustomInput
                label={t('username')}
                placeholder={t('username')}
                onChangeText={value => handleInputChange('username', value)}
                value={inputData.username}
              />
              <CustomInput
                keyboardType="email-address"
                placeholder={t('email')}
                onChangeText={value => handleInputChange('email', value)}
                value={inputData.email}
                label={t('email')}
              />
              <CustomText
                type="small"
                color={COLORS.black}
                fontWeight={'500'}
                fontFamily="light"
              >
                {t('dob')}
              </CustomText>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => setOpen(true)}
              >
                <CustomText
                  type="small"
                  color={COLORS.black}
                  fontWeight={'500'}
                  fontFamily="light"
                >
                  {date ? date.toLocaleDateString() : t("dob")}
                </CustomText>
                <VectorIcon
                  type="MaterialIcons"
                  name="date-range"
                  size={20}
                  color={COLORS.shottxt}
                />
              </TouchableOpacity>
              {/* <CustomText
                type="small"
                color={COLORS.black}
                fontWeight={'500'}
                fontFamily="light"
              >
                {t('phoneNumber')}
              </CustomText> */}
              {/* <View
                style={[
                  styles.btn,
                  {
                    padding: 6,
                    gap: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
                ]}
              >
                <CountryPicker
                  visible={showPicker}
                  countryCode={countryCode}
                  containerButtonStyle={{ width: '10%' }}
                  withFilter
                  withFlag
                  withCallingCode
                  onSelect={country => {
                    console.log(country);
                    setCountryCode2(country.callingCode.join(''));
                    setCountryCode(country.cca2);
                  }}
                  onClose={() => setShowPicker(false)}
                />
                <CustomText
                  type="small"
                  color={COLORS.black}
                  fontWeight={'500'}
                  fontFamily="light"
                >
                  ( {countryCode2} )
                </CustomText>
                <TextInput
                  keyboardType="phone-pad"
                  placeholder="Phone number"
                  placeholderTextColor={COLORS.placeholder}
                  maxLength={11}
                  onChangeText={value => handleInputChange('phone', value)}
                  style={{
                    width: '70%',
                    alignSelf: 'center',
                    top: 2,
                    fontFamily: getPlatformFont('regular'),
                  }}
                />
              </View> */}

              <CustomInput
                type="password"
                placeholder={t('password')}
                onChangeText={value => handleInputChange('password', value)}
                value={inputData.password}
                label={t('password')}
              />
            </View>
            <Spacer size={30} />

            <CustomButton
              onPress={() => handleSignup()}
              title={t('Sign Up')}
              isLoading={loading}
            />
            <Spacer size={30} />

            <CustomText
              type="small"
              color={COLORS.shottxt}
              style={{ textAlign: 'center' }}
            >
              {t("already account")}{` `}
              <CustomText
                onPress={() => navigation.navigate('Login')}
                type="small"
                color={COLORS.blue}
                style={{ textAlign: 'center' }}
              >
                {t('login')}
              </CustomText>
            </CustomText>
          </View>
          <Spacer size={10} />
          <DatePicker
            modal
            mode="date"
            open={open}
            date={date}
            onConfirm={date => {
              setOpen(false);
              setDate(date);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
        </SafeAreaView>
      </KeyboardAvoidingContainer>
    </GradientBackground>
  );
};

export default SignUpScreen;
