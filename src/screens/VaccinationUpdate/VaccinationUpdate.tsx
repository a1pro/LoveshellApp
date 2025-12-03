import React, { useState, useEffect } from "react";
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

type Props = NativeStackScreenProps<RootStackParamList, "VaccinationUpdate">;

interface VaccineData {
  id: number;
  vaccine_name: string;
  dose_number: number;
  due_date: string;
  administered_date: string | null;
  status: string;
}

const VaccinationUpdate: React.FC<Props> = ({ route, navigation }) => {
  const { t } = useTranslation();

  const vaccineData = route.params?.vaccineData as unknown as VaccineData;

  const selectedChild = useSelector(
    (state: RootState) => state.child.selectedChild
  );

  const [administeredDate, setAdministeredDate] = useState<Date | null>(null);
  const [isAdminDatePickerOpen, setIsAdminDatePickerOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Initialize administered date if exists
  useEffect(() => {
    if (vaccineData?.administered_date) {
      setAdministeredDate(new Date(vaccineData.administered_date));
    }
  }, [vaccineData]);

  const formatDateForDisplay = (date: Date | null) => {
    if (!date) return "";
    return date.toLocaleDateString();
  };

  const formatDateForApi = (date: Date | null) => {
    if (!date) return null;
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
    // Validations
    if (!vaccineData?.id) {
      showToast("error", "Error", "Vaccination ID is required");
      return;
    }

    if (!administeredDate) {
      showToast("error", "Validation", "Please select administered date");
      return;
    }

    const token = await AsyncStorage.getItem("Usertoken");
    if (!token) {
      showToast("error", "Error", "User token not found");
      return;
    }

    
    const payload = {
      vaccination_ids: [vaccineData.id], 
      administered_date: formatDateForApi(administeredDate),
    };

    try {
      setLoading(true);

      const res = await axios.post(
        `${API_URL}${ENDPOINTS.updateVaccination}`,
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
        showToast("success", "Success", res.data.message || "Vaccination updated successfully");
        
       
        setTimeout(() => {
          navigation.goBack();
        }, 1500);
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
        "Failed to update vaccination";
      showToast("error", "Error", msg);
      console.log("error updtae",msg)
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
            {t("Update Vaccination")}
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
          {/* Read-only Vaccine Name - CustomText */}
          <View style={styles.infoField}>
            <CustomText style={styles.fieldLabel}>Vaccine Name</CustomText>
            <CustomText style={styles.fieldValue}>
              {vaccineData?.vaccine_name || 'N/A'}
            </CustomText>
          </View>

          <Spacer style={{ height: 16 }} />

          {/* Read-only Dose Number - CustomText */}
          <View style={styles.infoField}>
            <CustomText style={styles.fieldLabel}>Dose Number</CustomText>
            <CustomText style={styles.fieldValue}>
              {vaccineData?.dose_number ? `Dose ${vaccineData.dose_number}` : 'N/A'}
            </CustomText>
          </View>

          <Spacer style={{ height: 16 }} />

          {/* Read-only Due Date - CustomText */}
          <View style={styles.infoField}>
            <CustomText style={styles.fieldLabel}>Due Date</CustomText>
            <CustomText style={styles.fieldValue}>
              {vaccineData?.due_date 
                ? new Date(vaccineData.due_date).toLocaleDateString() 
                : 'N/A'
              }
            </CustomText>
          </View>

          <Spacer style={{ height: 24 }} />

          {/* Editable Administered Date */}
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
            title={loading ? "Updating..." : "Update Vaccination"}
            disabled={loading || !administeredDate}
            onPress={handleSave}
          />

          <Spacer style={{ height: 20 }} />
        </ScrollView>

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
          maximumDate={new Date()} // Can't select future date for administration
        />
      </View>
    </GradientBackground>
  );
};

export default VaccinationUpdate;
