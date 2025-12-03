import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
  StatusBar,
  ScrollView,
} from "react-native";
import { CustomText } from "../../components/CustomText";
import GradientBackground from "../../components/GradientBackground";
import COLORS from "../../utils/Colors";
import { RootStackParamList } from "../../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import axios from "axios";
import styles from "./style";
import ENDPOINTS, { API_URL } from "../../APIService/endPoints";
import IMAGES from "../../assets/images";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";

import { useDispatch, useSelector } from "react-redux";
import { setSelectedChild } from "../../store/slice/childSlice";
import { RootState } from "../../store/store/Store";

type Props = NativeStackScreenProps<RootStackParamList, "Vaccination">;

const Vaccination: React.FC<Props> = ({ navigation }) => {
  const [children, setChildren] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const selectedChild = useSelector(
    (state: RootState) => state.child.selectedChild
  );

  useEffect(() => {
    fetchUserData();
    fetchChildren();
  }, []);

  const fetchUserData = async () => {
    try {
      const userDataString = await AsyncStorage.getItem("userData");
      if (userDataString) {
        const user = JSON.parse(userDataString);
        setUserName(user.username || "User");
      }
    } catch (e) {
      console.error("Failed to load user data", e);
      setUserName("User");
    }
  };

  const fetchChildren = async () => {
    try {
      const token = await AsyncStorage.getItem("Usertoken");
      if (!token) {
        console.log("No token found");
        return;
      }
      const response = await axios.get(
        `${API_URL}${ENDPOINTS.getchild}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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

  const handleChildPress = (child: any) => {
    dispatch(setSelectedChild(child));
    navigation.navigate("VaccinationCalendar");
  };

  const renderChildItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[
        styles.childButton,
        selectedChild?.id === item.id && styles.childButtonActive,
      ]}
      onPress={() => handleChildPress(item)}
    >
      <CustomText
        style={[
          styles.childText,
          selectedChild?.id === item.id && styles.childTextActive,
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
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.appLinear1}
      />

      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.headerIcon}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons
            name="arrow-back-ios"
            size={24}
            color={COLORS.White}
          />
        </TouchableOpacity>

        <View style={styles.headerTitleWrapper}>
          <CustomText type="heading" style={styles.headerText}>
             {userName}
          </CustomText>
          <CustomText style={styles.headerSubText}>
            {t("protectFutureVaccinateOnTime")}
          </CustomText>
        </View>

        <TouchableOpacity
          style={styles.headerIcon}
          onPress={() => navigation.navigate("HomeScreen")}
        >
          <MaterialIcons name="home" size={24} color={COLORS.White} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Child tabs */}
        <View style={styles.childSection}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={children}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderChildItem}
            contentContainerStyle={styles.childListContent}
          />
        </View>

       
        <View style={styles.productsSection}>
          <CustomText style={styles.sectionTitle}>
            {t("Vaccination")}
          </CustomText>
        </View>

        <View style={styles.cardContainer}>
          <View style={styles.imageGridRow}>
            <Image
              source={IMAGES.vaccination1}
              style={styles.gridImage}
              resizeMode="cover"
            />
            <Image
              source={IMAGES.vaccination2}
              style={styles.gridImage}
              resizeMode="cover"
            />
          </View>
          <View style={styles.imageGridRow}>
            <Image
              source={IMAGES.vaccination3}
              style={styles.gridImage}
              resizeMode="cover"
            />
            <Image
              source={IMAGES.vaccination4}
              style={styles.gridImage}
              resizeMode="cover"
            />
          </View>
        </View>
      </ScrollView>
    </GradientBackground>
  );
};

export default Vaccination;
