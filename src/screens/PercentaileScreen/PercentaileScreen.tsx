import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Dimensions, ScrollView, ActivityIndicator } from "react-native";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { CustomText } from "../../components/CustomText";
import GradientBackground from "../../components/GradientBackground";
import VectorIcon from "../../components/VectorIcon";
import Spacer from "../../components/Spacer";
import COLORS from "../../utils/Colors";
import { RootState } from "../../store/store/Store";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import { LineChart } from "react-native-chart-kit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import styles from "./style"; 
import ENDPOINTS, { API_URL } from "../../APIService/endPoints";

const screenWidth = Dimensions.get("window").width;

type Props = NativeStackScreenProps<RootStackParamList, 'PercentaileScreen'>;
type ApiResponse = {
  success: boolean;
  data: {
    child_info: { id: number; name: string; age_months: number };
    chart_data: {
      height_chart: { data: { x: string; y: string }[] };
      weight_chart: { data: { x: string; y: string }[] };
    };
    growth_summary: { summary: string; recommendations: string[] };
  };
};

const PercentaileScreen: React.FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();
  const selectedChild = useSelector((state: RootState) => state.child.selectedChild);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [apiData, setApiData] = useState<ApiResponse["data"] | null>(null);

  const fetchGrowthData = async () => {
    if (!selectedChild?.id) {
      setError(t("no_child_selected"));
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("Usertoken");
      
      const response = await axios.get(
       `${API_URL}${ENDPOINTS.graphdata}?child_id=${selectedChild.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.success) {
        setApiData(response.data.data);
        setError("");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || t("api_error"));
      console.error("Growth data fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGrowthData();
  }, [selectedChild?.id]);

  const getChartData = (chartType: 'height_chart' | 'weight_chart') => {
    if (!apiData?.chart_data) {
      return {
        labels: ["0", "5", "10", "15", "20", "25"],
        datasets: [{ data: [0, 0, 0, 0, 0, 0], strokeWidth: 2, color: () => COLORS.blue }],
        legend: [t("weight_label") + " (kg)"]
      };
    }

    const chartPoints = apiData.chart_data[chartType].data;
    const labels = chartPoints.map(point => point.x);
    const dataValues = chartPoints.map(point => parseFloat(point.y));

    return {
      labels,
      datasets: [{
        data: dataValues,
        strokeWidth: 2,
        color: chartType === 'height_chart' ? () => COLORS.lightblue : () => COLORS.blue
      }],
      legend: [chartType === 'height_chart' ? t("height_label") + " (cm)" : t("weight_label") + " (kg)"]
    };
  };

  const chartConfig = {
    backgroundGradientFrom: COLORS.White,
    backgroundGradientTo: COLORS.White,
    color: () => COLORS.blue,
    labelColor: () => COLORS.grey,
    propsForDots: { r: "4", strokeWidth: "2", stroke: COLORS.blue },
  };

  if (loading) {
    return (
      <GradientBackground>
        <View style={styles.container}>
          <ActivityIndicator size="large" color={COLORS.blue} style={{ flex: 1, justifyContent: 'center' }} />
        </View>
      </GradientBackground>
    );
  }

  return (
    <GradientBackground>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
              <VectorIcon type="MaterialIcons" name="arrow-back-ios" size={25} color={COLORS.White} />
            </TouchableOpacity>
            <CustomText type="heading" fontFamily="semiBold" style={styles.headerTitle}>
              {selectedChild ? selectedChild.name : t("zion_meals")}
            </CustomText>
            <TouchableOpacity style={styles.backIcon} onPress={() => navigation.navigate('HomeScreen')}>
              <VectorIcon type="MaterialIcons" name="home" size={25} color={COLORS.White} />
            </TouchableOpacity>
          </View>
          
          <Spacer size={18} />

          {error ? (
            <View style={[styles.card, { backgroundColor: COLORS.red2 }]}>
              <CustomText type="small" style={{ color: COLORS.red }}>
                {error}
              </CustomText>
              <TouchableOpacity onPress={fetchGrowthData} style={{ marginTop: 10 }}>
                <CustomText type="small" style={{ color: COLORS.blue }}>Retry</CustomText>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <View style={styles.card}>
                <CustomText type="subTitle" style={styles.cardTitle}>{t("weight_percentile")}</CustomText>
                <CustomText type="small" style={{ marginBottom: 4 }}>
                  {t("chart_x_axis_age")} | {t("chart_y_axis_weight")}
                </CustomText>
                <LineChart
                  data={getChartData('weight_chart')}
                  width={screenWidth - 40}
                  height={160}
                  chartConfig={chartConfig}
                  bezier
                  style={styles.chartStyle}
                />
              </View>

              <Spacer size={18} />

              <View style={styles.card}>
                <CustomText type="subTitle" style={styles.cardTitle}>{t("height_percentile")}</CustomText>
                <CustomText type="small" style={{ marginBottom: 4 }}>
                  {t("chart_x_axis_age")} | {t("chart_y_axis_height")}
                </CustomText>
                <LineChart
                  data={getChartData('height_chart')}
                  width={screenWidth - 40}
                  height={160}
                  chartConfig={{ ...chartConfig, color: () => COLORS.lightblue }}
                  bezier
                  style={styles.chartStyle}
                />
              </View>

              <Spacer size={18} />

             
              {apiData?.growth_summary && (
                <View style={styles.analysisCard}>
                  <CustomText style={styles.analysisHeading} type="small">{t("ai_analysis")}</CustomText>
                  <CustomText type="small" style={styles.analysisText}>
                    {apiData.growth_summary.summary}
                  </CustomText>
                  {apiData.growth_summary.recommendations?.length > 0 && (
                    <>
                      <CustomText type="small" style={{ marginTop: 10, fontWeight: 'bold' }}>
                        {t("recommendations")}
                      </CustomText>
                      {apiData.growth_summary.recommendations.map((rec, index) => (
                        <CustomText key={index} type="small" style={{ marginTop: 4 }}>
                          • {rec}
                        </CustomText>
                      ))}
                    </>
                  )}
                </View>
              )}
            </>
          )}
        </View>
      </ScrollView>
    </GradientBackground>
  );
};

export default PercentaileScreen;
