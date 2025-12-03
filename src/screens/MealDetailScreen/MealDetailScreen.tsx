import React, { useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
  FlatList,
  Platform,
  TextInput,
  Text,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { CustomText } from "../../components/CustomText";
import CustomInput from "../../components/CustomInput";
import VectorIcon from "../../components/VectorIcon";
import COLORS from "../../utils/Colors";
import GradientBackground from "../../components/GradientBackground";
import { styles } from "./style";
import CustomButton from "../../components/CustomButton";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store/Store";
import axios from "axios";
import ENDPOINTS, { API_URL } from "../../APIService/endPoints";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { useTranslation } from "react-i18next";

type Props = NativeStackScreenProps<RootStackParamList, "MealDetailScreen">;

const MEAL_OPTIONS = [
  "Breakfast",
  "Morning Snack",
  "Lunch",
  "Afternoon Snack",
  "Evening Snack",
  "Dinner",
  
];

const MealDetailScreen: React.FC<Props> = ({ navigation }) => {
  const selectedChild = useSelector(
    (state: RootState) => state.child.selectedChild
  );

  
  const [date, setDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState<Date>(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [mealModalVisible, setMealModalVisible] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<string>("");
  const [foodDescription, setFoodDescription] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const { t } = useTranslation();

  const UNIT = "Gram";

 
  const onChangeDate = (event: any, selected?: Date) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selected) setDate(selected);
  };

  const onChangeTime = (event: any, selected?: Date) => {
    setShowTimePicker(Platform.OS === "ios");
    if (selected) setTime(selected);
  };

  const openMealModal = () => setMealModalVisible(true);
  const closeMealModal = () => setMealModalVisible(false);

  const handleSelectMeal = (item: string) => {
    setSelectedMeal(item);
    closeMealModal();
  };
const handleSave = async () => {
  try {
    setLoading(true);

    const token = await AsyncStorage.getItem("Usertoken");
    if (!token) {
      Toast.show({
         type: "error", 
         text1: t("errorTitle"),
          text2: t("userTokenMissing"), });
      setLoading(false);
      return;
    }
    if (!selectedMeal) {
      Toast.show({
         type: "error",
          text1:t('errorTitle'),
           text2: t("selectMealType"), });
      setLoading(false);
      return;
    }
    if (!foodDescription.trim()) {
      Toast.show({  
         type: "error",
          text1:t('errorTitle'),
           text2: t("foodDescriptionRequired"), });
      setLoading(false);
      return;
    }
    if (!amount.trim() || isNaN(Number(amount))) {
      Toast.show({ 
        type: "error",
         text1: t('errorTitle'),
          text2: t("enterValidAmount"), });
      setLoading(false);
      return;
    }

    // Format time as "HH:mm"
    const formattedTime = time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });

    const payload = {
      child_id: selectedChild?.id,
      meal_type: selectedMeal,
      food_description: foodDescription,
      amount: Number(amount || 0),
      unit: UNIT,
      meal_date: date.toISOString(),
      start_time: formattedTime, // formatted time string
    };

    console.log("Save Meal payload:", payload);

    const res = await axios.post(
      `${API_URL}${ENDPOINTS.addMealPlan}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (res?.data?.success) {
      Toast.show({
         type: "success",
          text1: t("successTitle"),
           text2: res.data.message ?? t('mealLoged') });
      navigation.goBack();
      setSelectedMeal("");
      setFoodDescription("");
      setAmount("");
    } else {
      Toast.show({ 
        type: "error",
         text1:t('errorTitle'),
          text2: res.data.message ||t("failedtolog") });
    }
  } catch (error: any) {
    Toast.show({
       type: "error",
        text1: "Error",
         text2: error?.response?.data?.message ||t("errorsavemeal"), });
    console.error("Error saving meal:", error);
  } finally {
    setLoading(false);
  }
};




 
  const formatDate = (d: Date) =>
    `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;

  const formatTime = (d: Date) =>
    d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <GradientBackground>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {/* HEADER */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.headerIcon}
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
              style={styles.headerIcon}
              onPress={() => navigation.navigate("HomeScreen")}
            >
              <VectorIcon
                type="MaterialIcons"
                name="home"
                size={26}
                color={COLORS.White}
              />
            </TouchableOpacity>
          </View>


      <View style={styles.dateview}>
    <View style={styles.dateTimeContainer}>
      <CustomText style={styles.fieldLabel}>Date</CustomText>
      <TouchableOpacity onPress={() => setShowDatePicker(true)} activeOpacity={0.8}>
        <View style={[styles.formInput, { flexDirection: "row", justifyContent: "space-between", alignItems: "center" }]}>
          <Text style={styles.dateText}>
            {formatDate(date)}
          </Text>
          <VectorIcon
            type="MaterialIcons"
            name="calendar-today"
            size={18}
            color={COLORS.grey}
          />
        </View>
      </TouchableOpacity>
    </View>

    <View style={styles.dateTimeContainer}>
      <CustomText style={styles.fieldLabel}>{t("hour")}</CustomText>
      <TouchableOpacity onPress={() => setShowTimePicker(true)} activeOpacity={0.8}>
        <View style={[styles.formInput, { flexDirection: "row", justifyContent: "space-between", alignItems: "center" }]}>
          <Text style={styles.dateText}>
            {formatTime(time)}
          </Text>
          <VectorIcon
            type="MaterialIcons"
            name="access-time"
            size={18}
            color={COLORS.grey}
          />
        </View>
      </TouchableOpacity>
    </View>
  </View>

          {/* DateTimePickers */}
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={onChangeDate}
              maximumDate={new Date(2100, 0, 1)}
            />
          )}

          {showTimePicker && (
            <DateTimePicker
              value={time}
              mode="time"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={onChangeTime}
            />
          )}

          <View style={styles.cardForm}>
            <CustomText style={styles.fieldLabel}>{t('meals')}</CustomText>
            <TouchableOpacity onPress={openMealModal} activeOpacity={0.8}>
              <View style={[styles.formInput, { flexDirection: "row", justifyContent: "space-between", alignItems: "center" }]}>
                <Text style={{ color: selectedMeal ? COLORS.black : COLORS.placeholder, fontFamily: "Poppins-Regular", fontSize: 16 }}>
                  {selectedMeal || "Breakfast"}
                </Text>
                <VectorIcon
                  type="MaterialIcons"
                  name="keyboard-arrow-down"
                  size={22}
                  color={COLORS.grey}
                />
              </View>
            </TouchableOpacity>

            <CustomText style={styles.fieldLabel}>{t('foodDescription')}</CustomText>
            <TextInput
              style={[styles.formInput, styles.textAreaInput]}
              placeholder="Describe the food"
              placeholderTextColor={COLORS.placeholder}
              value={foodDescription}
              onChangeText={setFoodDescription}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />

            {/* How Much & Unit labels in one row */}
            <View style={styles.labelRow}>
              <CustomText style={styles.smallLabel}>{t("howmuch")}</CustomText>
              <CustomText style={styles.smallLabel}>{t('unit')}</CustomText>
            </View>

            {/* numeric input and unit (static) in one row */}
            <View style={styles.howMuchRow}>
              <TextInput
                style={[styles.formInput, { flex: 1 }]}
                placeholder="0"
                placeholderTextColor={COLORS.placeholder}
                value={amount}
                onChangeText={(t) => {
                  const cleaned = t.replace(/[^0-9.]/g, "");
                  setAmount(cleaned);
                }}
                keyboardType="numeric"
              />
              <View style={{ width: 12 }} />
              <View
                style={[styles.formInput, styles.unitInput]}
                pointerEvents="none"
              >
                <CustomText style={styles.unitText}>{UNIT}</CustomText>
              </View>
            </View>

            {/* Save button */}
        
          </View>

              <CustomButton
              style={styles.saveButton}
              isLoading={loading}
              title={t('save')}
              onPress={handleSave}
            />
        </View>
      </ScrollView>

      <Modal
        visible={mealModalVisible}
        animationType="fade"
        transparent
        onRequestClose={closeMealModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <CustomText style={styles.modalTitle}>{t("SelectMeal")}</CustomText>

            <FlatList
              data={MEAL_OPTIONS}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => handleSelectMeal(item)}
                >
                  <CustomText style={styles.modalItemText}>{item}</CustomText>
                </TouchableOpacity>
              )}
              ItemSeparatorComponent={() => <View style={styles.modalSeparator} />}
              showsVerticalScrollIndicator={false}
            />

            <TouchableOpacity style={styles.modalCloseBtn} onPress={closeMealModal}>
              <CustomText style={styles.modalCloseText}>{t('cancel')}</CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </GradientBackground>
  );
};

export default MealDetailScreen;
