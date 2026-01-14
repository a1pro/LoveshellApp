import React from "react";
import { ScrollView, TouchableOpacity, View, Image } from "react-native";
import { CustomText } from "../../components/CustomText";
import GradientBackground from "../../components/GradientBackground";
import { styles } from "./style";
import VectorIcon from "../../components/VectorIcon";
import COLORS from "../../utils/Colors";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store/Store";
import IMAGES from "../../assets/images";
import { useTranslation } from "react-i18next";

type Props = NativeStackScreenProps<RootStackParamList, "HeightAiScreen">;

type GrowthRecord = {
  id: number;
  ai_analysis: {
    growth_trend: string;
    growth_score: number;
    analysis_timestamp: string;
    analysis_method: string;
    language: string;
    overall_assessment: string;
    height_analysis: string;
    weight_analysis: string;
    bmi_assessment: string;
    percentile_interpretation: string;
    developmental_insights: string;
    recommendations: string[];
    when_to_consult: string[];
    positive_observations: string[];
  };
  height: string;
  height_unit: string;
  weight: string;
  weight_unit: string;
  head_circumference: string;
  head_circumference_unit: string;
  bmi: string;
  bmi_percentile: string;
  height_percentile: string;
  weight_percentile: string;
  record_date: string;
};

type HeightAiScreenParams = {
  selectedGrowthRecord: GrowthRecord;
};

const HeightAiScreen: React.FC<Props> = ({ navigation, route }) => {
  const selectedChild = useSelector((state: RootState) => state.child.selectedChild);
  const { t } = useTranslation(); 
  const selectedGrowthRecord = route.params?.selectedGrowthRecord as unknown as GrowthRecord;

  const aiAnalysis = selectedGrowthRecord?.ai_analysis || {};

  return (
    <GradientBackground>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.goBack()}>
            <VectorIcon type="MaterialIcons" name="arrow-back-ios" size={22} color={COLORS.White} />
          </TouchableOpacity>
          <CustomText type="heading" fontFamily="semiBold" style={styles.headerTitle}>
            {selectedChild ? `${selectedChild.name}` : "Growth Analysis"}
          </CustomText>
          <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.navigate("HomeScreen")}>
            <VectorIcon type="MaterialIcons" name="home" size={28} color={COLORS.White} />
          </TouchableOpacity>
        </View>

           <View style={styles.summaryCard}>
                    <CustomText style={styles.cardTitle}>{t("nutrionsummary")}</CustomText>
                    <View style={styles.cardRow}>
                        <Image source={IMAGES.diet1} style={styles.image} />
                        <Image source={IMAGES.diet2} style={styles.image} />
                        <Image source={IMAGES.diet3} style={styles.image} />
                        <Image source={IMAGES.diet4} style={styles.image} />
                        <Image source={IMAGES.diet5} style={styles.image} />
                    </View>
                    <View style={styles.cardStatsRow}>
                        <View >
                             <CustomText style={styles.cardStat}>{t('height')}</CustomText>
              <CustomText style={styles.boldText}>{selectedGrowthRecord?.height} {selectedGrowthRecord?.height_unit}</CustomText>
                        </View>
                        <View>
                            <CustomText style={styles.cardStat}>{t("weight")}</CustomText>
              <CustomText style={styles.boldText}>{selectedGrowthRecord?.weight} {selectedGrowthRecord?.weight_unit}</CustomText>
                        </View>
                    </View>
                    <View style={styles.cardStatsRow}>
                        <View>
                         <CustomText style={styles.cardStat}>{t('HeadCirc')}</CustomText>
              <CustomText style={styles.boldText}>{selectedGrowthRecord?.head_circumference} {selectedGrowthRecord?.head_circumference_unit}</CustomText>
                        </View>
                        <View>
                           <CustomText style={styles.cardStat}>{t("bmi")}</CustomText>
              <CustomText style={styles.boldText}>{selectedGrowthRecord?.bmi}</CustomText>
                        </View>
                    </View>
                </View>
       
        <View style={styles.analysisCard}>
          <CustomText style={styles.analysisHeading} type="heading">{t("ai_analysis")}</CustomText>
           
          <View style={styles.cardStatsRow}>
            <View style={styles.metricItem}>
              <CustomText style={styles.metricLabel}>{t("growthtrend")}:</CustomText>
              <CustomText style={styles.metricValue}>{aiAnalysis.growth_trend || 'N/A'}</CustomText>
            </View>
            <View style={styles.metricItem}>
              <CustomText style={styles.metricLabel}>{t('growthscore')}:</CustomText>
              <CustomText style={styles.metricValue}>{aiAnalysis.growth_score || 'N/A'}</CustomText>
            </View>
          </View>
 
          <CustomText style={styles.analysisLabel}>{t("overall")}:</CustomText>
          <CustomText style={styles.analysisValue}>{aiAnalysis.overall_assessment}</CustomText>
 
          <CustomText style={styles.analysisLabel}>{t('heightAnalyis')}:</CustomText>
          <CustomText style={styles.analysisValue}>{aiAnalysis.height_analysis}</CustomText>

          <CustomText style={styles.analysisLabel}>{t('weightAnalysis')}:</CustomText>
          <CustomText style={styles.analysisValue}>{aiAnalysis.weight_analysis}</CustomText>

          <CustomText style={styles.analysisLabel}>{t("bmiAssesment")}:</CustomText>
          <CustomText style={styles.analysisValue}>{aiAnalysis.bmi_assessment}</CustomText>
 
          <CustomText style={styles.analysisLabel}>{t("recommendations")}:</CustomText>
          <View style={styles.listContainer}>
            {aiAnalysis.recommendations?.map((recommendation: string, idx: number) => (
              <CustomText key={idx} style={styles.listItem}>
                • {recommendation}
              </CustomText>
            ))}
          </View>
 
          <CustomText style={styles.analysisLabel}>{t('whentoconsult')}:</CustomText>
          <View style={styles.listContainer}>
            {aiAnalysis.when_to_consult?.map((consult: string, idx: number) => (
              <CustomText key={idx} style={styles.listItem}>
                • {consult}
              </CustomText>
            ))}
          </View>
 
          <CustomText style={styles.analysisLabel}>{t('PositiveObservations')}:</CustomText>
          <View style={styles.listContainer}>
            {aiAnalysis.positive_observations?.map((observation: string, idx: number) => (
              <CustomText key={idx} style={styles.listItem}>
                • {observation}
              </CustomText>
            ))}
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </GradientBackground>
  );
};

export default HeightAiScreen;
