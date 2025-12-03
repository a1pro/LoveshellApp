import React, { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store/Store";
import {
  Image,
  TouchableOpacity,
  View,
  FlatList,
  ActivityIndicator,
  Linking,
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

type Props = NativeStackScreenProps<RootStackParamList, "RecipeScreen">;

type RecipeItem = {
  id: number;
  name: string;
  image: string;
  link: string;
  status: string;
  created_at: string;
  updated_at: string;
};

const RecipeScreen: React.FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();

  const selectedChild = useSelector(
    (state: RootState) => state.child.selectedChild
  );

  const [recipes, setRecipes] = useState<RecipeItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getRecipe = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${API_URL}${ENDPOINTS.getrecipe}`
      );
      console.log("Recipes fetched successfully:", response.data);

      if (response.data?.success === true && Array.isArray(response.data.data)) {
        setRecipes(response.data.data);
      }
    } catch (error) {
      console.log("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }
  };

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

  useEffect(() => {
    getRecipe();
  }, []);

  const renderRecipeCard = ({ item }: { item: RecipeItem }) => {
    return (
      <TouchableOpacity
        style={[styles.card, { backgroundColor: "#F8EFC6" }]}
        onPress={() => handleOpenLink(item.link)}
        activeOpacity={0.8}
      >
        <Image
          source={{ uri: item.image }}
          style={styles.cardIcon}
          resizeMode="cover"
        />
        <CustomText
          type="small"
          style={[styles.cardText, { color: "#E97132" }]}
        >
          {item.name}
        </CustomText>
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
            {selectedChild ? `${selectedChild.name}` : "Zion Meals"}
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

        {loading ? (
          <ActivityIndicator size="large" color={COLORS.White} />
        ) : (
          <FlatList
            data={recipes}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={styles.gridContainer}
            renderItem={renderRecipeCard}
            ListEmptyComponent={
              <CustomText type="small" style={styles.cardText}>
                {t("noData") || "No recipes found"}
              </CustomText>
            }
          />
        )}
      </View>
    </GradientBackground>
  );
};

export default RecipeScreen;
