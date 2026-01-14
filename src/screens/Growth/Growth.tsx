import React, { useEffect, useState } from "react";
import { 
  View, 
  TouchableOpacity, 
  FlatList, 
  Image, 
  ActivityIndicator,
  StatusBar 
} from "react-native";
import { CustomText } from '../../components/CustomText';
import GradientBackground from "../../components/GradientBackground";
import COLORS from "../../utils/Colors";
import { RootStackParamList } from "../../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import axios from "axios";
import styles from "../Nutrition/style";
import ENDPOINTS, { API_URL } from "../../APIService/endPoints";
import IMAGES from "../../assets/images";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedChild } from '../../store/slice/childSlice';
import { RootState } from '../../store/store/Store';
import Spacer from "../../components/Spacer";
import style from "./style";
import Toast from "react-native-toast-message";

type Props = NativeStackScreenProps<RootStackParamList, 'Growth'>;

type GrowthImage = {
  id: number;
  image: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
};

const Growth: React.FC<Props> = ({ navigation }) => {
  const [children, setChildren] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const [growthImages, setGrowthImages] = useState<GrowthImage[]>([]);
  const [growthLoading, setGrowthLoading] = useState(true);
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const selectedChild = useSelector((state: RootState) => state.child.selectedChild);

  useEffect(() => {
    fetchUserData();
    fetchChildren();
    fetchGrowthImages();
  }, []);

  const fetchUserData = async () => {
    try {
      const userDataString = await AsyncStorage.getItem('userData');
      if (userDataString) {
        const user = JSON.parse(userDataString);
        setUserName(user.username || "User");
      }
    } catch (e) {
      console.error('Failed to load user data', e);
      setUserName("User");
    }
  };

  const fetchChildren = async () => {
    try {
      const token = await AsyncStorage.getItem('Usertoken');
      if (!token) {
        Toast.show({
          type: 'error',
          text1: t("errorTitle"),
          text2: t("userTokenMissing"),
        });
        return;
      }
      const response = await axios.get(
        `${API_URL}${ENDPOINTS.getchild}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      if (response.data.status && response.data.children.length > 0) {
        setChildren(response.data.children);
         
        dispatch(setSelectedChild(response.data.children[0]));
      } else {
        const defaultChildren = [
          { id: 1, name: "Daniel" },
          { id: 2, name: "Mister" },
          { id: 3, name: "Mister's" },
        ];
        setChildren(defaultChildren);
        dispatch(setSelectedChild(defaultChildren[0]));
      }
    } catch (err: any) {
      const defaultChildren = [
        { id: 1, name: "Daniel" },
        { id: 2, name: "Mister" },
        { id: 3, name: "Mister's" },
      ];
      setChildren(defaultChildren);
      dispatch(setSelectedChild(defaultChildren[0]));
    } finally {
      setLoading(false);
    }
  };

  const fetchGrowthImages = async () => {
    try {
      setGrowthLoading(true);
      const response = await axios.get(`${API_URL}${ENDPOINTS.growthImages}`);
      if (response.data?.success && Array.isArray(response.data.data)) {
        setGrowthImages(response.data.data);
      } else {
        setGrowthImages([]);
      }
    } catch (error) {
      console.error('Error fetching growth images', error);
      setGrowthImages([]);
    } finally {
      setGrowthLoading(false);
    }
  };

  const handleChildPress = (child: any) => {
    dispatch(setSelectedChild(child));
    navigation.navigate('GrowthDetails');
  };

  const renderChildItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[
        styles.childButton,
        selectedChild?.id === item.id && styles.childButtonActive
      ]}
      onPress={() => handleChildPress(item)}
    >
      <CustomText 
        style={[
          styles.childText,
          selectedChild?.id === item.id && styles.childTextActive
        ]}
      >
        {item.name}
      </CustomText>
    </TouchableOpacity>
  );

  const renderGrowthImage = ({ item }: { item: GrowthImage }) => (
    <TouchableOpacity style={style.card}>
      <Image
        source={{ uri: item.image }}
        style={style.cardIcon}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <GradientBackground>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.blue} />
          <CustomText style={styles.loadingText}>
            {t("loading")}...
          </CustomText>
        </View>
      </GradientBackground>
    );
  }

  return (
    <GradientBackground>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.appLinear1} />
      <View style={style.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.headerIcon} onPress={()=>navigation.goBack()}>
            <MaterialIcons name="arrow-back-ios" size={24} color={COLORS.White} />
          </TouchableOpacity>
          <CustomText type="heading" style={styles.headerText} >
            {userName}
          </CustomText>
          <TouchableOpacity style={styles.headerIcon} onPress={()=>navigation.navigate('HomeScreen')}>
            <MaterialIcons name="home" size={24} color={COLORS.White} />
          </TouchableOpacity>
        </View>
      
        <View style={styles.childSection}>
          <CustomText style={styles.sectionTitle}>
            {t("selectChild")}
          </CustomText>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={children}
            keyExtractor={item => item.id.toString()}
            renderItem={renderChildItem}
            contentContainerStyle={styles.childListContent}
          />
        </View>

        <Spacer size={20} />

        {growthLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.blue} />
            <CustomText style={styles.loadingText}>
              {t("loading")}...
            </CustomText>
          </View>
        ) : (
          <FlatList
            data={growthImages}
            numColumns={2}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderGrowthImage}
            columnWrapperStyle={style.gridContainer}
            contentContainerStyle={{ paddingBottom: 20 }}
            ListEmptyComponent={
              <CustomText style={styles.loadingText}>
                {t("noDataFound")}
              </CustomText>
            }
          />
        )}
      </View>
    </GradientBackground>
  );
};

export default Growth;
