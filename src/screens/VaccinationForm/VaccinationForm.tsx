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


  const handleSave = async () => {
    // validations
    if (!selectedChild?.id) {
         Toast.show({
        type:"error",
        text1:t("vallidationError"),
        text2:t("childId")
      })
       
      return;
    }
    if (!vaccineName.trim()) {
         Toast.show({
        type:"error",
        text1:t("vallidationError"),
        text2:t("vaccineRequired")
      }) 
      return;
    }
    if (!doseNumber.trim()) {
         Toast.show({
        type:"error",
        text1:t("vallidationError"),
        text2:t("doesRequired")
      }) 
      return;
    }
    if (!dueDate) {
      Toast.show({
        type:"error",
        text1:t("vallidationError"),
        text2:t("dueDateRequired")
      }) 
      
      return;
    }

    const token = await AsyncStorage.getItem("Usertoken");
    if (!token) {
      Toast.show({
        type:"error",
        text1:t("errorTitle"),
        text2:t("userTokenMissing")
      }) 
    ;
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
        Toast.show({
        type:"error",
        text1:t("successTitle"),
        text2:t("vaccinationCreate")
      })  

        // reset form
        setVaccineName("");
        setDoseNumber("");
        setDueDate(null);
        setStatus("scheduled");
        setAdministeredDate(null);

        navigation.goBack();
      } else {
        Toast.show({
         type: "error",
          text1:"Error",
         text2: res?.data?.message || t("wrong")
      });
      }
    } catch (error: any) {
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to create vaccination";

      Toast.show({ 
        type:"error",
        text1: t("errorTitle"),
        text2: msg});
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
            {t("addVaccination")}
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
            label={t("vaccineName")}
            placeholder={t("entervaccineName")}
            value={vaccineName}
            onChangeText={setVaccineName}
          />

          <Spacer style={{ height: 12 }} />

          <CustomInput
            label={t("doseNumber")}
            placeholder={t("doesNumber")}
            value={doseNumber}
            keyboardType="numeric"
            onChangeText={setDoseNumber}
          />

          <Spacer style={{ height: 12 }} />

          {/* Due Date */}
          <CustomInput
            label={t("dueDate")}
            placeholder={t("dueDate")}
            type="date"
            value={formatDateForDisplay(dueDate)}
            onChangeText={() => {}}
            disabled={false}
            onBtnPress={() => setIsDueDatePickerOpen(true)}
          />

          <Spacer style={{ height: 12 }} />

         

          <CustomInput
            label={t("adminDate")}
            placeholder={t("adminDate")}
            type="date"
            value={formatDateForDisplay(administeredDate)}
            onChangeText={() => {}}
            disabled={false}
            onBtnPress={() => setIsAdminDatePickerOpen(true)}
          />

          <Spacer style={{ height: 30 }} />

          <CustomButton
            title={loading ? t("saving") : t("addVaccination")}
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
