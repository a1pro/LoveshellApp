import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store/Store";
import { View, TouchableOpacity, ScrollView } from "react-native";
import { CustomText } from "../../components/CustomText";
import CustomInput from "../../components/CustomInput";
import GradientBackground from "../../components/GradientBackground";
import { styles } from "./style";
import VectorIcon from "../../components/VectorIcon";
import COLORS from "../../utils/Colors";
import Spacer from "../../components/Spacer";
import { useTranslation } from "react-i18next";
import DatePicker from "react-native-date-picker";
import CustomButton from "../../components/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import axios from "axios";
import ENDPOINTS, { API_URL } from "../../APIService/endPoints";

type Props = NativeStackScreenProps<RootStackParamList, "VaccinationForm">;

const VaccinationForm: React.FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();

  const selectedChild = useSelector(
    (state: RootState) => state.child.selectedChild
  );

  const [vaccineName, setVaccineName] = useState("");
  const [doseNumber, setDoseNumber] = useState("");
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [status, setStatus] = useState("scheduled");
  const [administeredDate, setAdministeredDate] = useState<Date | null>(null);

  const [isDueDatePickerOpen, setIsDueDatePickerOpen] = useState(false);
  const [isAdminDatePickerOpen, setIsAdminDatePickerOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const formatDateForDisplay = (date: Date | null) => {
    if (!date) return "";
    return date.toLocaleDateString();
  };

   
  const formatDateForApi = (date: Date | null) => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, "0");
    const day = `${date.getDate()}`.padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const showToast = (
    type: "success" | "error",
    text1: string,
    text2?: string
  ) => {
    Toast.show({
      type,
      text1,
      text2,
      position: "top",
    });
  };

  const handleSave = async () => {
    // validations
    if (!selectedChild?.id) {
      showToast("error", "Error", "Child id is required");
      return;
    }
    if (!vaccineName.trim()) {
      showToast("error", "Validation", "Vaccine name field is required");
      return;
    }
    if (!doseNumber.trim()) {
      showToast("error", "Validation", "Dose number field is required");
      return;
    }
    if (!dueDate) {
      showToast("error", "Validation", "Due date is required");
      return;
    }

    const token = await AsyncStorage.getItem("Usertoken");
    if (!token) {
      showToast("error", "Error", "User token not found");
      return;
    }

    const payload = {
      child_id: selectedChild.id,
      vaccine_name: vaccineName.trim(),
      dose_number: doseNumber.trim(),
      due_date: formatDateForApi(dueDate),
      // status: status || "scheduled",
      administered_date: administeredDate
        ? formatDateForApi(administeredDate)
        : null,
    };

    try {
      setLoading(true);

      const res = await axios.post(
        `${API_URL}${ENDPOINTS.addVaccination}`,
        payload,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res?.data?.success) {
        showToast("success", "Success", "Vaccination created successfully");

        // reset form
        setVaccineName("");
        setDoseNumber("");
        setDueDate(null);
        setStatus("scheduled");
        setAdministeredDate(null);

        navigation.goBack();
      } else {
        showToast(
          "error",
          "Error",
          res?.data?.message || "Something went wrong"
        );
      }
    } catch (error: any) {
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to create vaccination";
      showToast("error", "Error", msg);
    } finally {
      setLoading(false);
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
            {t("Add Vaccination")}
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

        <Spacer style={{ height: 16 }} />

        {/* Form */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.formContainer}
        >
          <CustomInput
            label={t("Vaccine Name")}
            placeholder={t("Enter vaccine name")}
            value={vaccineName}
            onChangeText={setVaccineName}
          />

          <Spacer style={{ height: 12 }} />

          <CustomInput
            label={t("Dose Number")}
            placeholder={t("Enter dose number")}
            value={doseNumber}
            keyboardType="numeric"
            onChangeText={setDoseNumber}
          />

          <Spacer style={{ height: 12 }} />

          {/* Due Date */}
          <CustomInput
            label={t("Due Date")}
            placeholder={t("Select due date")}
            type="date"
            value={formatDateForDisplay(dueDate)}
            onChangeText={() => {}}
            disabled={false}
            onBtnPress={() => setIsDueDatePickerOpen(true)}
          />

          <Spacer style={{ height: 12 }} />

         

          <CustomInput
            label={t("Administered Date")}
            placeholder={t("Select administered date")}
            type="date"
            value={formatDateForDisplay(administeredDate)}
            onChangeText={() => {}}
            disabled={false}
            onBtnPress={() => setIsAdminDatePickerOpen(true)}
          />

          <Spacer style={{ height: 30 }} />

          <CustomButton
            title={loading ? "Saving..." : "Add Vaccination"}
            disabled={loading}
            onPress={handleSave}
          />

          <Spacer style={{ height: 20 }} />
        </ScrollView>

        {/* Due Date Picker */}
        <DatePicker
          modal
          open={isDueDatePickerOpen}
          date={dueDate || new Date()}
          mode="date"
          onConfirm={(date) => {
            setIsDueDatePickerOpen(false);
            setDueDate(date);
          }}
          onCancel={() => setIsDueDatePickerOpen(false)}
        />

        {/* Administered Date Picker */}
        <DatePicker
          modal
          open={isAdminDatePickerOpen}
          date={administeredDate || new Date()}
          mode="date"
          onConfirm={(date) => {
            setIsAdminDatePickerOpen(false);
            setAdministeredDate(date);
          }}
          onCancel={() => setIsAdminDatePickerOpen(false)}
        />
      </View>
    </GradientBackground>
  );
};

export default VaccinationForm;
