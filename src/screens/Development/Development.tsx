import React, { useEffect, useState } from "react";
import { View,TouchableOpacity,Image, ActivityIndicator, FlatList } from "react-native";
import { CustomText } from "../../components/CustomText";
import GradientBackground from "../../components/GradientBackground";
import styles from "./style";
import VectorIcon from "../../components/VectorIcon";
import COLORS from "../../utils/Colors";
import { useTranslation } from "react-i18next";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store/Store";
import ENDPOINTS, { API_URL } from "../../APIService/endPoints";
import axios from "axios";
import { setSelectedChild } from "../../store/slice/childSlice";
import Spacer from "../../components/Spacer";
import IMAGES from "../../assets/images";
type Props = NativeStackScreenProps<RootStackParamList, "Development">;
const Development: React.FC<Props> = ({navigation}) => {
  const [userName, setUserName] = useState("");
  const dispatch = useDispatch();
  const selectedChild = useSelector((state: RootState) => state.child.selectedChild);
  const [children, setChildren] = useState<any[]>([]);
   const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
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
    useEffect(() => {
      fetchUserData();
        fetchChildren();
    }, []);
     const fetchChildren = async () => {
    try {
      const token = await AsyncStorage.getItem('Usertoken');
      if (!token) {
        console.log('No token found');
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
        // Set first child as default in the store
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

  const handleChildPress = (child: any) => {
    dispatch(setSelectedChild(child));
    navigation.navigate('DetailDevelopment');
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
      <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity
            style={styles.backIcon}
            onPress={() => navigation.goBack()}
          >
            <VectorIcon
              name="arrow-back-ios"
              type="MaterialIcons"
                size={22}
                color={COLORS.White}
            />
          </TouchableOpacity>
            <CustomText
            type="heading"
            fontFamily="semiBold"
            style={styles.headerTitle}
            >   
             {userName}
          </CustomText>
            <TouchableOpacity
            style={styles.backIcon}
            onPress={() => navigation.navigate("HomeScreen")}
          >
            <VectorIcon
              type="MaterialIcons"
              name="home"
                size={28}   
                color={COLORS.White}    
            />
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
          <View style={styles.gridContainer}>
                        <TouchableOpacity style={styles.card} >
                            <Image source={IMAGES.baby} style={styles.cardIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.card}>
                            <Image source={IMAGES.baby1} style={styles.cardIcon} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.card}>
                            <Image source={IMAGES.baby3} style={styles.cardIcon} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.card}>
                            <Image source={IMAGES.baby4} style={styles.cardIcon} />
                        </TouchableOpacity>
                </View>
        </View>
    </GradientBackground>
  );
}
export default Development;