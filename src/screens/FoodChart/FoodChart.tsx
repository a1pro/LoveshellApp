import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store/Store";

import GradientBackground from "../../components/GradientBackground";
import { KeyboardAvoidingContainer } from "../../components/KeyboardAvoidingComponent";
import Spacer from "../../components/Spacer";
import VectorIcon from "../../components/VectorIcon";
import { CustomText } from "../../components/CustomText";

import COLORS from "../../utils/Colors";
import styles from "./style";
import { RootStackParamList } from "../../types";
import CustomButton from "../../components/CustomButton";
import Toast from "react-native-toast-message";
import ENDPOINTS, { API_URL } from "../../APIService/endPoints";

type Props = NativeStackScreenProps<RootStackParamList, "FoodChart">;

type NutrientItem = {
  id: string;
  name: string;
  ddr: string;
  achieved: number;
  key: string;
  status: string;
};

type ApiResponse = {
  success: boolean;
  message?: string;
  data: {
    child_info: {
      id: number;
      name: string;
      age_months: number;
      age_description: string;
      dob: string;
    };
    period: {
      type: string;
      start_date: string;
      end_date: string;
      display_range: string;
      days_count: number;
    };
    nutrient_summary: {
      nutrients: Record<
        string,
        {
          display_name: string;
          percentage: number;
          total: number;
          dri_weekly: number;
          unit: string;
          status: string;
          has_data: boolean;
        }
      >;
      statistics: {
        total_nutrients: number;
        nutrients_with_data: number;
        average_percentage: number;
        total_percentage_sum: number;
        overall_status: string;
        age_months: number;
      };
    };
  };
};

const FoodChart: React.FC<Props> = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [childName, setChildName] = useState("");
  const [periodRange, setPeriodRange] = useState("");
  const [nutrients, setNutrients] = useState<NutrientItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { t } = useTranslation();
  const selectedChild = useSelector((state: RootState) => state.child.selectedChild);

  console.log("Selected Child in FoodChart:", selectedChild?.id);

  useEffect(() => {
    fetchUserData();
    if (selectedChild?.id) {
      fetchFoodChartData(selectedChild.id.toString());
    }
  }, [selectedChild?.id]);

  const fetchUserData = async () => {
    try {
      const userDataString = await AsyncStorage.getItem("userData");
      if (userDataString) {
        const user = JSON.parse(userDataString);
        setUserName(user.username || "User");
      } else {
        setUserName("User");
      }
    } catch (e) {
      console.error("Failed to load user data", e);
      setUserName("User");
    }
  };

  const fetchFoodChartData = async (childId: string) => {
    if (!childId) {
      console.log("No child ID available");
      return;
    }

    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("Usertoken");
      if (!token) {
        Toast.show({
          type: 'error',
          text1: t("errorTitle"),
          text2: t("userTokenMissing"),
        });
        return;
      }

     

      const response = await axios.get<ApiResponse>(
         `${API_URL}${ENDPOINTS.foodchart}?child_id=${childId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log("API Response:", response.data);

      if (response.data.success && response.data.data) {
        const apiData = response.data.data;

        setChildName(apiData.child_info.name);
        setPeriodRange(apiData.period.display_range);

        const nutrientData: NutrientItem[] = [];
        let idCounter = 1;

        Object.entries(apiData.nutrient_summary.nutrients).forEach(([key, nutrient]) => {
          if (nutrient.has_data !== false) {
            const percentage = Math.round(nutrient.percentage);
            const ddrValue = `${nutrient.dri_weekly.toFixed(1)} ${nutrient.unit}`;

            nutrientData.push({
              id: idCounter.toString(),
              name: nutrient.display_name,
              ddr: ddrValue,
              achieved: percentage,
              key: key,
              status: nutrient.status,
            });
            idCounter++;
          }
        });

        nutrientData.sort((a, b) => b.achieved - a.achieved);

        setNutrients(nutrientData);
        console.log("Transformed nutrients:", nutrientData);
      } else {
        throw new Error(response.data.message || "API returned unsuccessful response");
      }
    } catch (error: any) {
      console.error("Failed to fetch food chart data:", error);
      Toast.show({
        type: 'error',
        text1: t("errorTitle"),
        text2: error.message || t("api_error"),
      });
       
 
      loadStaticFoodChart();
    } finally {
      setLoading(false);
    }
  };

  const loadStaticFoodChart = () => {
    const staticData: NutrientItem[] = [
      { id: "1", name: "Protein", ddr: "91 g", achieved: 72, key: "protein_g", status: "adequate" },
      { id: "2", name: "Carbohydrates", ddr: "910 g", achieved: 64, key: "carbs_g", status: "adequate" },
      { id: "3", name: "Fats", ddr: "210 g", achieved: 55, key: "fat_g", status: "deficient" },
      { id: "4", name: "Potassium", ddr: "4900 mg", achieved: 48, key: "potassium_mg", status: "deficient" },
      { id: "5", name: "Calcium", ddr: "4900 mg", achieved: 61, key: "calcium_mg", status: "adequate" },
      { id: "6", name: "Iron", ddr: "49 mg", achieved: 40, key: "iron_mg", status: "deficient" },
      { id: "7", name: "Zinc", ddr: "21 mg", achieved: 80, key: "zinc_mg", status: "excellent" },
      { id: "8", name: "Magnesium", ddr: "560 mg", achieved: 52, key: "magnesium_mg", status: "adequate" },
      { id: "9", name: "Vitamin A", ddr: "2100 mcg", achieved: 67, key: "vitamin_A_mcg", status: "adequate" },
      { id: "10", name: "Vitamin B12", ddr: "6.3 mcg", achieved: 35, key: "vitamin_B12_mcg", status: "deficient" },
      { id: "11", name: "Vitamin C", ddr: "105 mg", achieved: 90, key: "vitamin_C_mg", status: "excellent" },
      { id: "12", name: "Vitamin D", ddr: "105 mcg", achieved: 30, key: "vitamin_D_mcg", status: "deficient" },
    ];

    setNutrients(staticData);
  };

  const renderRow = ({ item }: { item: NutrientItem }) => (
    <View style={styles.row}>
      <View style={styles.colName}>
        <CustomText style={styles.rowText}>{item.name}</CustomText>
      </View>
      <View style={styles.colDDR}>
        <CustomText style={styles.rowText}>{item.ddr}</CustomText>
      </View>
      <View style={styles.colAchieved}>
        <CustomText style={styles.rowText}>{item.achieved}%</CustomText>
      </View>
    </View>
  );

  return (
    <GradientBackground>
      <KeyboardAvoidingContainer>
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => navigation.goBack()}
            >
              <VectorIcon
                type="MaterialIcons"
                name="arrow-back-ios"
                size={22}
                color={COLORS.White}
              />
            </TouchableOpacity>

            <CustomText
              type="heading"
              fontFamily="semiBold"
              style={styles.headerTitle}
            >
              {t("Food Chart")}
            </CustomText>

            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => navigation.navigate("HomeScreen")}
            >
              <VectorIcon
                type="MaterialIcons"
                name="home"
                size={22}
                color={COLORS.White}
              />
            </TouchableOpacity>
          </View>

          <CustomText style={styles.subTitle}>
            {childName ? `${childName}'s Nutrition` : t("Last 7 days ZION")}
          </CustomText>

          <CustomText style={[styles.subTitle, { fontSize: 14, opacity: 0.8 }]}>
            {periodRange || t("Last 7 days")}
          </CustomText>

          <Spacer style={{ height: 16 }} />

          <View style={styles.card}>
            {/* Header row */}
            <View style={styles.tableHeader}>
              <View style={styles.colName}>
                <CustomText style={styles.headerText}>
                  {t("Nutrients")}
                </CustomText>
              </View>
              <View style={styles.colDDR}>
                <CustomText style={styles.headerText}>{t("DDR")}</CustomText>
              </View>
              <View style={styles.colAchieved}>
                <CustomText style={styles.headerText}>
                  % {t("Achieved")}
                </CustomText>
              </View>
            </View>

            <View style={styles.headerDivider} />

            {loading ? (
              <View style={styles.loaderContainer}>
                <ActivityIndicator size="small" color={COLORS.blue} />
              </View>
            ) : nutrients.length === 0 ? (
              <View style={styles.loaderContainer}>
                <CustomText style={{ textAlign: "center", color: COLORS.grey }}>
                  No nutrition data available
                </CustomText>
              </View>
            ) : (
              <FlatList
                data={nutrients}
                keyExtractor={(item) => item.id}
                renderItem={renderRow}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
              />
            )}

            <Spacer style={{ height: 16 }} />
            <CustomButton
              onPress={() => navigation.navigate("BarcodeScreen")}
              title={t('consultant')}
              isLoading={loading}
            />
          </View>
        </SafeAreaView>
      </KeyboardAvoidingContainer>
    </GradientBackground>
  );
};

export default FoodChart;
