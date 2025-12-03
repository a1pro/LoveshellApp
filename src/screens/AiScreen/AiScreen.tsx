import React from "react";
import { View, TouchableOpacity, ScrollView, Image } from "react-native";
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
type Props = NativeStackScreenProps<RootStackParamList, "AiScreen">;


const AiScreen: React.FC<Props> = ({ navigation, route }) => {
    const selectedChild = useSelector((state: RootState) => state.child.selectedChild);
    const { data: selectedMeal } = route.params || {};
    console.log("route data", selectedMeal);
      const { t } = useTranslation(); 
    return (
        <GradientBackground>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.goBack()}>
                        <VectorIcon type="MaterialIcons" name="arrow-back-ios" size={22} color={COLORS.White} />
                    </TouchableOpacity>
                    <CustomText type="heading" fontFamily="semiBold" style={styles.headerTitle}>
                        {selectedChild ? `${selectedChild.name}` : "Zion Meals"}
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
                            <CustomText style={styles.cardStat}>{t("amount")}</CustomText>
                            <CustomText style={styles.boldText} >{selectedMeal.amount} g</CustomText>
                        </View>
                        <View>
                            <CustomText style={styles.cardStat}>{t('protein')} </CustomText>
                            <CustomText style={styles.boldText}>{selectedMeal.protein_g} g</CustomText>
                        </View>
                    </View>
                    <View style={styles.cardStatsRow}>
                        <View>
                            <CustomText style={styles.cardStat}>  {t("carbs")}</CustomText>
                            <CustomText style={styles.boldText}>{selectedMeal.carbs_g} g</CustomText>
                        </View>
                        <View>
                            <CustomText style={styles.cardStat}>{t("totalcalories")} </CustomText>
                            <CustomText style={styles.boldText}>{selectedMeal.total_calories} cal</CustomText>
                        </View>
                    </View>
                </View>

                <View style={styles.analysisCard}>
                    <CustomText style={styles.analysisHeading} type="heading">{t("anlaysis")}</CustomText>
                    <View style={styles.cardStatsRow}>
                        <View style={styles.cardRow}>
                            <CustomText style={styles.analysisLabel}> {t("rating")} :</CustomText>
                            <CustomText style={styles.boldText}>{selectedMeal.ai_analysis.rating}</CustomText>
                        </View>
                        <View style={styles.cardRow}>
                            <CustomText style={styles.analysisLabel}>{t("nutritionscore")} :</CustomText>
                            <CustomText style={styles.boldText}>{selectedMeal.ai_analysis.nutrition_score}</CustomText>
                        </View>
                    </View>
                    <CustomText style={styles.analysisLabel}>{t('ageAppro')}:</CustomText>
                    <CustomText style={styles.analysisValue}>{selectedMeal.ai_analysis.age_appropriateness}</CustomText>
                    <CustomText style={styles.analysisLabel}>{t('nutritonbenefit')}:</CustomText>
                    <CustomText style={styles.analysisValue}>{selectedMeal.ai_analysis.nutritional_benefits}</CustomText>
                    <CustomText style={styles.analysisLabel}>{t('additionalnutrition')}:</CustomText>
                    <CustomText style={styles.analysisValue}>{selectedMeal.ai_analysis.additional_nutrition_suggestions}</CustomText>
                    <View>
                        <CustomText style={styles.analysisLabel}>{t("improvementSuggest")} :</CustomText>
                        <View style={{ marginLeft: 12 }}>
                            {(selectedMeal.ai_analysis.improvement_suggestions as string[]).map((suggestion: string, idx: number) => (
                                <CustomText key={idx} style={styles.analysisValue}>
                                    • {suggestion}
                                </CustomText>
                            ))}
                        </View>
                        <CustomText style={styles.analysisLabel}>{t('warnings')}: </CustomText>
                           <View style={{ marginLeft: 12 }}>
                            {(selectedMeal.ai_analysis.warnings as string[]).map((warns: string, idx: number) => (
                                <CustomText key={idx} style={styles.analysisValue}>
                                    • {warns}
                                </CustomText>
                            ))}
                        </View>
                        <CustomText style={styles.analysisLabel}>{t('comparisoion')}:</CustomText>
                        <CustomText style={styles.analysisValue}>{selectedMeal.ai_analysis.comparison_to_recommended}</CustomText>
                        <CustomText style={styles.analysisLabel}>{t('keyrecmandation')}: </CustomText>
                           <View style={{ marginLeft: 12 }}>
                            {(selectedMeal.ai_analysis.key_recommendations as string[]).map((keys: string, idx: number) => (
                                <CustomText key={idx} style={styles.analysisValue}>
                                    • {keys}
                                </CustomText>
                            ))}
                        </View>
                    </View>
                </View>
            </ScrollView>
        </GradientBackground>
    );
};
export default AiScreen;
