import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import {
  TouchableOpacity,
  View,
  ScrollView,
  Linking,
} from "react-native";
import { CustomText } from "../../components/CustomText";
import GradientBackground from "../../components/GradientBackground";
import { styles } from "./style";
import VectorIcon from "../../components/VectorIcon";
import COLORS from "../../utils/Colors";
import Spacer from "../../components/Spacer";
import { useTranslation } from "react-i18next";

type Props = NativeStackScreenProps<RootStackParamList, "RecipeDetails">;

const RecipeDetails: React.FC<Props> = ({ navigation, route }) => {
  const { t } = useTranslation();
 const { recipe } = route.params; 

  const handleOpenLink = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        console.log("Cannot open URL:", url);
      }
    } catch (err) {
      console.log("Error opening URL:", err);
    }
  };

  return (
    <GradientBackground>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backIcon}
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
            {t("Recipesdetails")}
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

        <Spacer size={10} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        > 
          <View style={styles.card}>
            <View style={styles.cardHeaderRow}>
              <CustomText
                type="subHeading"
                fontFamily="semiBold"
                style={styles.cardTitle}
              >
                {t("nutrionsummary") || "Nutrition Summary"}
              </CustomText>
            </View>

            <Spacer size={10} />

            <View style={styles.nutritionRow}>
              <View style={styles.nutritionItem}>
                <CustomText style={styles.nutritionLabel}>
                  {t("calories") || "Calories"}
                </CustomText>
                <CustomText style={styles.nutritionValue}>
                  {recipe.nutritional_info?.calories || "-"}
                </CustomText>
              </View>

              <View style={styles.nutritionItem}>
                <CustomText style={styles.nutritionLabel}>
                  {t("protein") || "Protein"}
                </CustomText>
                <CustomText style={styles.nutritionValue}>
                  {recipe.nutritional_info?.protein || "-"}
                </CustomText>
              </View>
            </View>

            <View style={styles.nutritionRow}>
              <View style={styles.nutritionItem}>
                <CustomText style={styles.nutritionLabel}>
                  {t("carbs") || "Carbs"}
                </CustomText>
                <CustomText style={styles.nutritionValue}>
                  {recipe.nutritional_info?.carbs || "-"}
                </CustomText>
              </View>

              <View style={styles.nutritionItem}>
                <CustomText style={styles.nutritionLabel}>
                  {t("fat") || "Fat"}
                </CustomText>
                <CustomText style={styles.nutritionValue}>
                  {recipe.nutritional_info?.fat || "-"}
                </CustomText>
              </View>
            </View>

            <View style={styles.nutritionRow}>
              <View style={styles.nutritionItemFull}>
                <CustomText style={styles.nutritionLabel}>
                  {t("iron") || "Iron"}
                </CustomText>
                <CustomText style={styles.nutritionValue}>
                  {recipe.nutritional_info?.iron || "-"}
                </CustomText>
              </View>
            </View>
          </View>

          <Spacer size={16} />
          <View style={styles.card}>
         
            <View style={styles.topRow}>
              <View style={styles.topRowLeft}>
                <CustomText
                  type="small"
                  fontFamily="semiBold"
                  style={styles.topName}
                >
                  {recipe.name}
                </CustomText>
                <View style={styles.mealBadge}>
                  <CustomText style={styles.mealBadgeText}>
                    {recipe.meal_type}
                  </CustomText>
                </View>
              </View>

              <View style={styles.dateContainer}>
                <VectorIcon
                  type="MaterialIcons"
                  name="event"
                  size={16}
                  color={COLORS.orange}
                />
                <CustomText style={styles.dateText}>
                  {recipe.suggested_date}
                </CustomText>
              </View>
            </View>

            <Spacer size={12} />
 
            <CustomText style={styles.sectionLabel}>
              {t("description") || "Description"}
            </CustomText>
            <CustomText style={styles.sectionText}>
              {recipe.description}
            </CustomText>

            <Spacer size={12} />
 
            <CustomText style={styles.sectionLabel}>
              {t("Ingredients") || "Ingredients"}
            </CustomText>
            {recipe.ingredients?.map((ing, index) => (
              <View key={index} style={styles.bulletRow}>
                <View style={styles.bulletDot} />
                <CustomText style={styles.sectionText}>{ing}</CustomText>
              </View>
            ))}

            <Spacer size={12} />
 
            <CustomText style={styles.sectionLabel}>
              {t("Instructions") || "Instructions"}
            </CustomText>
            {recipe.instructions?.map((step, index) => (
              <View key={index} style={styles.bulletRow}>
                <CustomText style={styles.stepNumber}>
                  {index + 1}.
                </CustomText>
                <CustomText style={styles.sectionText}>{step}</CustomText>
              </View>
            ))}

            <Spacer size={12} />
 
            <View style={styles.timeRow}>
              <View style={styles.timeItem}>
                <CustomText style={styles.sectionLabelSmall}>
                  {t("PrepTime") || "Prep time"}
                </CustomText>
                <CustomText style={styles.sectionText}>
                  {recipe.prep_time}
                </CustomText>
              </View>
              <View style={styles.timeItem}>
                <CustomText style={styles.sectionLabelSmall}>
                  {t("TotalTime") || "Total time"}
                </CustomText>
                <CustomText style={styles.sectionText}>
                  {recipe.total_time}
                </CustomText>
              </View>
            </View>

            <Spacer size={12} />
 
            <CustomText style={styles.sectionLabel}>
              {t("ServingSuggestions") || "Serving suggestions"}
            </CustomText>
            <CustomText style={styles.sectionText}>
              {recipe.serving_suggestions}
            </CustomText>

            <Spacer size={12} />
 
            {recipe.web_links && recipe.web_links.length > 0 && (
              <>
                <CustomText style={styles.sectionLabel}>
                  {t("webLinks") || "Web links"}
                </CustomText>
                {recipe.web_links.map((link: string, index: number) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.linkRow}
                    onPress={() => handleOpenLink(link)}
                    activeOpacity={0.7}
                  >
                    <VectorIcon
                      type="MaterialIcons"
                      name="open-in-new"
                      size={18}
                      color={COLORS.blue}
                    />
                    <CustomText style={styles.linkText} numberOfLines={1}>
                      {link}
                    </CustomText>
                  </TouchableOpacity>
                ))}
              </>
            )}
          </View>

          <Spacer size={30} />
        </ScrollView>
      </View>
    </GradientBackground>
  );
};

export default RecipeDetails;
