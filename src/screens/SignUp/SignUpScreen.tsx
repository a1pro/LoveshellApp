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
type Props = NativeStackScreenProps<RootStackParamList, 'Signup'>;

const SignUpScreen: React.FC<Props> = ({ navigation }) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [countryCode, setCountryCode] = useState<CountryCode>('IN');
  const [countryCode2, setCountryCode2] = useState('91');
  const [showPicker, setShowPicker] = useState(false);
  const [inputData, setInputData] = useState({
    fullname: '',
    username: '',
    email: '',
    password: '',
    phone: '',
  });

  const handleInputChange = (fieldName: string, value: string) => {
    setInputData(prev => ({ ...prev, [fieldName]: value }));
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
              Sign Up
            </CustomText>
            <Spacer />
            <CustomText type="small" style={styles.txt}>
              Create an account to continue!
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
              <CustomText
                type="small"
                color={COLORS.black}
                fontWeight={'500'}
                fontFamily="light"
              >
                Date of Birth
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
                  {date ? date.toLocaleDateString() : 'Date of Birth'}
                </CustomText>
                <VectorIcon
                  type="MaterialIcons"
                  name="date-range"
                  size={20}
                  color={COLORS.shottxt}
                />
              </TouchableOpacity>
              <CustomText
                type="small"
                color={COLORS.black}
                fontWeight={'500'}
                fontFamily="light"
              >
                Phone Number
              </CustomText>
              <View
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
              </View>

              <CustomInput
                type="password"
                placeholder="Password"
                onChangeText={value => handleInputChange('password', value)}
                value={inputData.password}
                label="Set Password"
              />
            </View>
            <Spacer size={30} />

            <CustomButton
              onPress={() => navigation.navigate('ChildRegister')}
              title="Register"
            />
            <Spacer size={30} />

            <CustomText
              type="small"
              color={COLORS.shottxt}
              style={{ textAlign: 'center' }}
            >
              Already have an account?{` `}
              <CustomText
                onPress={() => navigation.navigate('Login')}
                type="small"
                color={COLORS.blue}
                style={{ textAlign: 'center' }}
              >
                Log In
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
