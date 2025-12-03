import React from "react";
import { View, TouchableOpacity, Dimensions, ScrollView } from "react-native";
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
import styles from "./style"; 

const screenWidth = Dimensions.get("window").width;

type Props = NativeStackScreenProps<RootStackParamList, 'PercentaileScreen'>;

const PercentaileScreen: React.FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();
  const selectedChild = useSelector((state: RootState) => state.child.selectedChild);

  const weightData = {
    labels: ["0", "5", "10", "15", "20", "25"],
    datasets: [
      { data: [20, 35, 30, 40, 38, 45], strokeWidth: 2, color: () => COLORS.blue }
    ],
    legend: [t("weight_label") + " (kg)"]  
  };

  const heightData = {
    labels: ["0", "5", "10", "15", "20", "25"],
    datasets: [
      { data: [50, 70, 75, 82, 78, 90], strokeWidth: 2, color: () => COLORS.lightblue }
    ],
    legend: [t("height_label") + " (cm)"]  
  };

  const chartConfig = {
    backgroundGradientFrom: COLORS.White,
    backgroundGradientTo: COLORS.White,
    color: () => COLORS.blue,
    labelColor: () => COLORS.grey,
    propsForDots: { r: "4", strokeWidth: "2", stroke: COLORS.blue },
  };

  return (
    <GradientBackground>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
            <VectorIcon type="MaterialIcons" name="arrow-back-ios" size={25} color={COLORS.White} />
          </TouchableOpacity>
          <CustomText type="heading" fontFamily="semiBold" style={styles.headerTitle}>
            {selectedChild ? `${selectedChild.name}` : t("zion_meals")}
          </CustomText>
          <TouchableOpacity style={styles.backIcon} onPress={() => navigation.navigate('HomeScreen')}>
            <VectorIcon type="MaterialIcons" name="home" size={25} color={COLORS.White} />
          </TouchableOpacity>
        </View>
       
        <Spacer size={18} />
 
        <View style={styles.card}>
          <CustomText type="subTitle" style={styles.cardTitle}>{t("weight_percentile")}</CustomText>
          <CustomText type="small" style={{ marginBottom: 4 }}>
            {t("chart_x_axis_age")} | {t("chart_y_axis_weight")}
          </CustomText>
          <LineChart
            data={weightData}
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
            data={heightData}
            width={screenWidth - 40}
            height={160}
            chartConfig={{ ...chartConfig, color: () => COLORS.lightblue }}
            bezier
            style={styles.chartStyle}
          />
        </View>

        <Spacer size={18} />

        {/* AI Analysis Card */}
        <View style={styles.analysisCard}>
          <CustomText type="small">{t("ai_analysis")}</CustomText>
          <CustomText type="small" style={styles.analysisText}>{t("ai_analysis_text")}</CustomText>
        </View>
      </View>
      </ScrollView>
    </GradientBackground>
  );
};

export default PercentaileScreen;
