import React, { useCallback } from "react";
import { View, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import { CustomText } from "../../components/CustomText";
import VectorIcon from "../../components/VectorIcon";
import COLORS from "../../utils/Colors";
import GradientBackground from "../../components/GradientBackground";
import { styles } from "./style";
import CustomButton from "../../components/CustomButton";
import { t } from "i18next";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store/Store";
import { horizontalScale } from "../../utils/Metrics";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import axios from "axios";
import ENDPOINTS, { API_URL } from "../../APIService/endPoints";
import { useFocusEffect } from "@react-navigation/native";
import { addFavorite, removeFavorite, setFavorites } from "../../store/slice/favoritesSlice";
import { useTranslation } from "react-i18next";

type Props = NativeStackScreenProps<RootStackParamList, "AddmealScreen">;

type MealLog = {
  id: number;
  meal_type: string;
  food_description: string;
  amount: string;
  unit: string;
  start_time: string;
};

const AddmealScreen: React.FC<Props> = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const selectedChild = useSelector((state: RootState) => state.child.selectedChild);
  const favorites = useSelector((state: RootState) => state.favorites.favoritesMap);
  const [meals, setMeals] = React.useState<MealLog[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const { date } = route.params || {};
  const { t } = useTranslation();
  useFocusEffect(
    useCallback(() => {
      if (date && selectedChild) {
        fetchMealdata(date);
      } else {
        setMeals([]);
      }
    }, [date, selectedChild])
  );
  const formatDate = (dateObj: string | number | Date) => {

    const date = new Date(dateObj);
    return date.toISOString().slice(0, 10); 
  };
  const fetchMealdata = async (date: string) => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("Usertoken");
      console.log("token", token);
      const childId = selectedChild?.id;
      if (!token) {
        setLoading(false);
        Toast.show({ 
          type: "error", 
          text1: t("errorTitle"),
           text2: t("userTokenMissing") });
        return;
      }
      if (!childId) {
        Toast.show({ type: "error", text1: t("errorTitle"), text2: t("childNotSelected") });
        return;
      }

      const formData = new FormData();
      formData.append("date", formatDate(date));
      formData.append("child_id", childId.toString());

      const res = await axios.post(
        `${API_URL}${ENDPOINTS.getMealData}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        setMeals(res.data.data.meal_logs);
        console.log("Full meal logs:", JSON.stringify(res.data.data.meal_logs, null, 2));
        setLoading(false);

      } else {
        setMeals([]);
        Toast.show({ type: "info", text1: t('nodata'), text2: res.data.message || t("nomealdata") });
      }
    } catch (error) {
      setLoading(false);
      Toast.show({ type: "error", text1: t("errorTitle"), text2: t("errorFetching") });
      console.error("Error fetching meal data:", error);
      setMeals([]);
    }
  };

  const addToFavorites = async (mealId: number) => {
    try {
      const token = await AsyncStorage.getItem("Usertoken");
      if (!token) {
         Toast.show({
                type: "error",
                text1: t("errorTitle"), 
                text2: t("userTokenMissing"), 
              });
        return;
      }
      if (!selectedChild?.id) {
        Toast.show({ 
          type: "error",
           text1: t("errorTitle"),
            text2: t("childNotSelected") 
          });
        return;
      }

      const formData = new FormData();
      formData.append("child_id", selectedChild.id.toString());
      formData.append("meal_id", mealId.toString());

      const res = await axios.post(
        `${API_URL}${ENDPOINTS.favouriteMeal}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        Toast.show({ 
          type: "success", 
          text1: t("successTitle"),
           text2: res.data.message || t("favouriteAdded")});
        dispatch(addFavorite(mealId));
      } else {
        Toast.show({
           type: "error", 
           text1: t("errorTitle"),
            text2: res.data.message || t("failedtofavourite") });
      }
    } catch (error) {
      console.error("Error adding to favorites:", error);
      Toast.show({
         type: "error",
          text1: t("errorTitle"), 
          text2: t("erroraddingfav") });
    }
  };

  const toggleFavorite = (mealId: number) => {
    if (favorites[mealId]) {
      dispatch(removeFavorite(mealId));
    } else {
      addToFavorites(mealId);
    }
  };

const handleDelete = (id: number) => {
  try {
    Alert.alert(
      t("confirmDeleteTitle"), 
      t("confirmDeleteMessage"),  
      [
        {
          text: t("cancel"),  
          style: "cancel",
        },
        {
          text: t("delete"),  
          style: "destructive",
          onPress: async () => {
            const token = await AsyncStorage.getItem("Usertoken");
            if (!token) {
              Toast.show({
                type: "error",
                text1: t("errorTitle"), 
                text2: t("userTokenMissing"),  
              });
              return;
            }

            const formData = new FormData();
            formData.append("meal_id", id.toString());

            const res = await axios.post(
              `${API_URL}${ENDPOINTS.deleteMeal}`,
              formData,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "multipart/form-data",
                },
              }
            );

            if (res.data.success) {
              Toast.show({
                type: "success",
                text1: t("successTitle"), 
                text2: res.data.message || t("mealDeleteSuccess"),
              });
              fetchMealdata(date);
            } else {
              Toast.show({
                type: "error",
                text1: t("errorTitle"),
                text2: res.data.message || t("mealDeleteFailed"),
              });
            }
          },
        },
      ]
    );
  } catch (error) {
    console.error("Error deleting meal:", error);
    Toast.show({
      type: "error",
      text1: t("errorTitle"),
      text2: t("mealDeleteError"),
    });
  }
};


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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
              <VectorIcon type="MaterialIcons" name="arrow-back-ios" size={22} color={COLORS.White} />
            </TouchableOpacity>
            <CustomText type="heading" fontFamily="semiBold" style={styles.headerTitle}>
              {selectedChild ? `${selectedChild.name}` : "Zion Meals"}
            </CustomText>
            <TouchableOpacity style={styles.backIcon} onPress={() => navigation.navigate("HomeScreen")}>
              <VectorIcon type="MaterialIcons" name="home" size={28} color={COLORS.White} />
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            {meals.length > 0 ? (
              console.log("meals data", meals),
              meals.map((meal) => (
                <View key={meal.id} style={styles.mealCard}>
                  <View style={styles.mealHeader}>
                    <CustomText type="subHeading" fontFamily="semiBold" style={styles.mealSectionTitle}>
                      {meal.meal_type}
                    </CustomText>
                    <TouchableOpacity onPress={() => navigation.navigate('AiScreen', { data: meal })} >
                      <CustomText type="small" fontFamily="semiBold" style={styles.consultMealText}>
                        {t("consultantmeal")}
                      </CustomText>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.inputRow}>
                    <View style={styles.inputColumn}>
                      <CustomText style={styles.inputLabel}>{t('meals')}</CustomText>
                      <View style={styles.inputContainer}>
                        <CustomText style={styles.inputValue}>{meal.food_description}</CustomText>
                      </View>
                    </View>
                    <View style={styles.inputColumn}>
                      <CustomText style={styles.inputLabel}>{t('hour')}</CustomText>
                      <View style={styles.inputContainer}>
                        <CustomText style={styles.inputValue}>{meal.start_time}</CustomText>
                      </View>
                    </View>
                  </View>
                  <View style={styles.isrow}>
                    <TouchableOpacity onPress={() => toggleFavorite(meal.id)}>
                      <VectorIcon
                        type="MaterialIcons"
                        name={favorites[meal.id] ? "favorite" : "favorite-border"}
                        size={28}
                        color={favorites[meal.id] ? COLORS.red : COLORS.black}
                        style={{ marginRight: horizontalScale(15) }}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDelete(meal.id)}>
                      <VectorIcon type="MaterialIcons" name="delete" size={28} color={COLORS.red} />
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            ) : (
              <>
                <CustomText style={{ textAlign: "center", marginVertical: 50 }}>
                  {t('Nomeal')} {date}. {t('insertmeal')}.
                </CustomText>
              </>
            )}
          </View>
          <CustomButton
            style={{ width: "40%", alignSelf: "center" }}
            onPress={() => navigation.navigate("MealDetailScreen")}
            title={t("Insert Meal")}
          />
        </View>
      </ScrollView>
    </GradientBackground>
  );
};

export default AddmealScreen;
