import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import LinearGradient from 'react-native-linear-gradient';
import styles from './style';
import IMAGES from '../../assets/images';
import COLORS from '../../utils/Colors';
import { CustomText } from '../../components/CustomText';
import { verticalScale } from '../../utils/Metrics';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabParamList } from '../../types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import ENDPOINTS, { API_URL } from '../../APIService/endPoints';
import { useTranslation } from 'react-i18next';

type Props = NativeStackScreenProps<BottomTabParamList, 'UserProfile'>;


const UserProfile: React.FC<Props> = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const user = {
    avatar: IMAGES.profile,
  };
  const [userData, setUserData] = useState<{ username?: string; email?: string }>({});
   const { t } = useTranslation();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDataString = await AsyncStorage.getItem('userData');
        if (userDataString) {
          const user = JSON.parse(userDataString);
          setUserData(user);
          console.log('Stored user data:', user);
        }
      } catch (e) {
        console.error('Failed to load user data', e);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('Usertoken');
      console.log("Logout token:", token);
      if (!token) {
        console.log('No token found');
       Toast.show({
                type: 'error',
                text1: t("errorTitle"),
                text2: t("userTokenMissing")
              });
        setLoading(false);
        return;
      }
      const res = await axios.post(`${API_URL}${ENDPOINTS.logout}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.status === true) {
        await AsyncStorage.removeItem('Usertoken');
        await AsyncStorage.removeItem('userData');
        Toast.show({
          type: 'success',
          text1: t("successTitle"),
          text2: t("logout"),
        });
        navigation.navigate('Login');
      } else {
        Toast.show({
          type: 'error',
          text1: t("logouterror"),
          text2: res.data.message || t("logouterror"),
        });
      }
    }  catch (error) {
  const err = error as any;
  if (err.response) {
    console.log("Logout API Response Error:", err.response.data);
  } else if (err.request) {
    console.log("Logout API Request Error:", err.request);
  } else {
    console.log("Other Error:", err.message);
  }
  Toast.show({
    type: 'error',
    text1: t("logouterror"),
    text2:t("logouterror"),
  });
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={[COLORS.appLinear1, COLORS.appLinear2]}
      style={styles.linearContainer}
    >
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back-ios-new" size={22} color={COLORS.black} />
        </TouchableOpacity>

        <View style={{ alignItems: 'center', marginTop: verticalScale(22) }}>
          <CustomText
            type="subHeading"
            fontWeight="700"
            color={COLORS.black}
            style={{ marginBottom: verticalScale(10) }}
          >
            {t("yourProfile")}
          </CustomText>
          <View style={styles.avatarWrapper}>
            <Image source={user.avatar} style={styles.avatar} />
          </View>
          <CustomText
            type="heading"
            fontWeight={'bold'}
            style={styles.profileName}
            color={COLORS.black}
          >
            {userData.username}
          </CustomText>
          <CustomText style={styles.profileRole} color={COLORS.black}>
            {userData.email}
          </CustomText>
        </View>

        <View style={styles.editProfileBtnWrap}>
          <TouchableOpacity style={styles.editProfileBtn}>
            <CustomText type="small" color={COLORS.White} fontWeight="bold">
              {t("editProfile")}
            </CustomText>
          </TouchableOpacity>
        </View>

        <View style={styles.listContainer}>
          <TouchableOpacity style={styles.listCard} onPress={handleLogout}>
            <MaterialIcons name="logout" size={24} color={COLORS.red} />
            <CustomText type="subHeading" style={styles.listTitle}>
              {loading ? (
                <>
          
                  <ActivityIndicator color={COLORS.red} size={18} style={{ marginLeft: 8 }} />
                </>
              ) :t("logoutbtn")}
            </CustomText>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default UserProfile;
