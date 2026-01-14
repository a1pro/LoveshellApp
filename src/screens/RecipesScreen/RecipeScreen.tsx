import React, { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store/Store";
import {
  TouchableOpacity,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { CustomText } from "../../components/CustomText";
import GradientBackground from "../../components/GradientBackground";
import { styles } from "./style";
import VectorIcon from "../../components/VectorIcon";
import COLORS from "../../utils/Colors";
import Spacer from "../../components/Spacer";
import { useTranslation } from "react-i18next";
import axios from "axios";
import ENDPOINTS, { API_URL } from "../../APIService/endPoints";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import CustomButton from "../../components/CustomButton";

type Props = NativeStackScreenProps<RootStackParamList, "RecipeScreen">;

export interface RecipeItem {
  id: number;
  child_id?: number;
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  prep_time: string;
  cook_time: string;
  total_time: string;
  servings: string | number;
  meal_type: string;
  age_group: string;
  allergy_notes: string;
  nutritional_info: {
    calories: string;
    protein: string;
    carbs: string;
    fat: string;
    iron?: string;
    [key: string]: string | undefined;
  };
  serving_suggestions: string;
  web_links: string[];
  generation_batch_id?: string;
  generated_at: string;
  suggested_date: string;
  is_active: boolean;
}

type ApiResponse = {
  success: boolean;
  message: string;
  data: {
    child: {
      id: number;
      name: string;
      age_months: number;
      age_group: string;
      allergies: string | null;
      dietary_restrictions: string | null;
    };
    recipes: RecipeItem[];
    recipe_count: number;
    weekly_plan: Array<{
      date: string;
      day_name: string;
      recipes: RecipeItem[];
      recipe_count: number;
    }>;
    week_info: {
      start_date: string;
      end_date: string;
      display_range: string;
    };
    generation_info: {
      last_generated: string;
      has_web_links: boolean;
      total_web_links: number;
    };
  };
};

// AddRecipe API response (short form based on your example)
type AddRecipeResponse = {
  success: boolean;
  message: string;
  data: {
    recipes: RecipeItem[];
    count: number;
    generation_info: {
      generated_at: string;
      week_start: string;
      week_end: string;
      week_display: string;
      batch_id: string;
    };
    child_info: {
      name: string;
      age_months: number;
      age_group: string;
    };
  };
};

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
const LAST_RECIPE_GENERATED_KEY = "lastRecipeGeneratedAt";

const RecipeScreen: React.FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();

  const selectedChild = useSelector(
    (state: RootState) => state.child.selectedChild
  );

  const [recipes, setRecipes] = useState<RecipeItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [recipeCount, setRecipeCount] = useState<number>(0);
  const [weekRange, setWeekRange] = useState<string>("");
  const [showAddButton, setShowAddButton] = useState<boolean>(false);
  const [adding, setAdding] = useState<boolean>(false);

  const getRecipe = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("Usertoken");
      if (!token) {
        Toast.show({
          type: "error",
          text1: t("errorTitle"),
          text2: t("userTokenMissing"),
        });
        setLoading(false);
        return;
      }

      const response = await axios.get(
        `${API_URL}${ENDPOINTS.getrecipe}?child_id=${selectedChild?.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Recipes fetched successfully:", response.data);

      if (response.data?.success === true && response.data.data) {
        const apiData = response.data.data as ApiResponse["data"];
        setRecipes(apiData.recipes || []);
        setRecipeCount(apiData.recipe_count || 0);
        setWeekRange(apiData.week_info?.display_range || "");
      }
    } catch (error) {
      console.log("Error fetching recipes:", error);
      Toast.show({
        type: "error",
        text1: t("errorTitle"),
        text2: t("apiError") || "Failed to fetch recipes",
      });
    } finally {
      setLoading(false);
    }
  };

  const checkAddButtonVisibility = async () => {
    try {
      const value = await AsyncStorage.getItem(LAST_RECIPE_GENERATED_KEY);
      if (!value) {
        // never generated before -> show button
        setShowAddButton(true);
        return;
      }
      const last = Number(value);
      if (Number.isNaN(last)) {
        setShowAddButton(true);
        return;
      }
      const diff = Date.now() - last;
      setShowAddButton(diff >= SEVEN_DAYS_MS);
    } catch {
      setShowAddButton(true);
    }
  };

  const handleRecipePress = (recipe: RecipeItem) => {
    navigation.navigate("RecipeDetails", { recipe });
  };

  const addRecipe = async () => {
    if (!selectedChild?.id) {
      Toast.show({
        type: "error",
        text1: t("errorTitle"),
        text2: t("childNotSelected") || "Child not selected",
      });
      return;
    }

    try {
      setAdding(true);

      const token = await AsyncStorage.getItem("Usertoken");
      if (!token) {
        Toast.show({
          type: "error",
          text1: t("errorTitle"),
          text2: t("userTokenMissing"),
        });
        setAdding(false);
        return;
      }

       
      const formData = new FormData();
      formData.append("child_id", String(selectedChild.id));

      const response = await axios.post<AddRecipeResponse>(
        `${API_URL}${ENDPOINTS.AddRecipe}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Add recipe response:", response.data);

      if (response.data?.success) {
        const newRecipes = response.data.data.recipes || [];
         
        setRecipes(newRecipes);
        setRecipeCount(response.data.data.count || newRecipes.length);

         
        const display = response.data.data.generation_info?.week_display;
        if (display) {
          setWeekRange(display);
        }

        Toast.show({
          type: "success",
          text1: t("successTitle") || "Success",
          text2: response.data.message || "Recipes generated successfully",
        });
 
        await AsyncStorage.setItem(
          LAST_RECIPE_GENERATED_KEY,
          String(Date.now())
        );
        setShowAddButton(false);
      } else {
        Toast.show({
          type: "error",
          text1: t("errorTitle"),
          text2: response.data?.message || "Failed to add recipe",
        });
      }
    } catch (error) {
      console.log("Error adding recipe:", error);
      Toast.show({
        type: "error",
        text1: t("errorTitle"),
        text2: t("wrong") || "Failed to add recipe",
      });
    } finally {
      setAdding(false);
    }
  };

  useEffect(() => {
    if (selectedChild?.id) {
      getRecipe();
      checkAddButtonVisibility();
    }
  }, [selectedChild?.id]);

  const renderRecipeCard = ({ item }: { item: RecipeItem }) => {
    return (
      <TouchableOpacity
        style={styles.recipeCard}
        onPress={() => handleRecipePress(item)}
        activeOpacity={0.8}
      >
        <CustomText
          type="heading"
          fontFamily="semiBold"
          style={styles.recipeName}
        >
          {item.name}
        </CustomText>

        <View style={styles.mealTypeBadge}>
          <CustomText
            type="small"
            fontFamily="medium"
            style={styles.mealTypeText}
          >
            {item.meal_type.toUpperCase()}
          </CustomText>
        </View>

        <View style={styles.timingContainer}>
          <VectorIcon
            type="MaterialIcons"
            name="schedule"
            size={18}
            color={COLORS.orange}
          />
          <CustomText
            type="small"
            fontFamily="medium"
            style={styles.timingText}
          >
            {item.total_time}
          </CustomText>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <GradientBackground>
      <View style={styles.container}>
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
            {t("recipe")}
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

        <Spacer size={20} />

        {weekRange ? (
          <View style={styles.weekRangeContainer}>
            <CustomText style={styles.weekRangeText}>
              📅 {weekRange}
            </CustomText>
          </View>
        ) : null}

        {recipeCount > 0 && (
          <View style={styles.recipeCountContainer}>
            <CustomText style={styles.recipeCountText}>
              {recipeCount} {t("recipesavailable")}
            </CustomText>
          </View>
        )}

        {loading ? (
          <ActivityIndicator size="large" color={COLORS.blue} />
        ) : (
          <FlatList
            data={recipes}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapper}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
            renderItem={renderRecipeCard}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <VectorIcon
                  type="MaterialIcons"
                  name="restaurant-menu"
                  size={64}
                  color={COLORS.grey}
                />
                <CustomText style={styles.emptyTitle}>
                  {t("noData") || "No recipes found"}
                </CustomText>
                <CustomText style={styles.emptySubtitle}>
                  Weekly meal plan will appear here
                </CustomText>
              </View>
            }
            ListFooterComponent={ 
              showAddButton ? (
                <CustomButton
                  title={adding ? t("loading") || t("Pleasewait...") : t("addRecipe") || "Add Recipe"}
                  onPress={addRecipe}
                  disabled={adding}
                />
              ) : null
            }
          />
        )}
      </View>
    </GradientBackground>
  );
};

export default RecipeScreen;
