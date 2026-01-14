import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, ScrollView, FlatList, Modal, Alert, Platform } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { CustomText } from "../../components/CustomText";
import CustomInput from "../../components/CustomInput";
import GradientBackground from "../../components/GradientBackground";
import styles from "./style";
import COLORS from "../../utils/Colors";
import VectorIcon from '../../components/VectorIcon';
import Spacer from "../../components/Spacer";
import { useTranslation } from "react-i18next";
import { RootStackParamList } from "../../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootState } from "../../store/store/Store";
import { useSelector } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ENDPOINTS, { API_URL } from "../../APIService/endPoints";
import axios from "axios";
import Toast from "react-native-toast-message";

type Props = NativeStackScreenProps<RootStackParamList, 'WeightScreen'>;

type GrowthRecord = {
  id: number;
  child_id: number;
  record_date: string;
  weight: string;
  weight_unit: string;
  height: string;
  height_unit: string;
  head_circumference: string;
  head_circumference_unit: string;
  height_percentile: string;
  weight_percentile: string;
  head_circumference_percentile: string;
  bmi: string;
  bmi_percentile: string;
};

type ApiResponse = {
  success: boolean;
  message: string;
  data: {
    child_info: {
      id: number;
      name: string;
      age_months: number;
    };
    growth_records: GrowthRecord[];
    analysis_language: string;
  };
};

type FormState = {
  date: Date;
  weight: string;
  weightUnit: string;
  height: string;
  heightUnit: string;
  head_circumference: string;
  circumferenceUnit: string;
};

type Field = {
  key: keyof FormState;
  label: string;
  type: 'date' | 'text' | undefined;
  keyboardType?: any;
  style?: any;
};

const FIELDS: Field[] = [
  { key: 'weight', label: 'Weight', type: 'text', keyboardType: 'numeric', style: styles.inputMedium },
  { key: 'weightUnit', label: 'Unit', type: 'text', keyboardType: undefined, style: styles.inputSmall },
  { key: 'height', label: 'Height', type: 'text', keyboardType: 'numeric', style: styles.inputMedium },
  { key: 'heightUnit', label: 'Unit', type: 'text', keyboardType: undefined, style: styles.inputSmall },
  { key: 'head_circumference', label: 'Circumference', type: 'text', keyboardType: 'numeric', style: styles.inputMedium },
  { key: 'circumferenceUnit', label: 'Unit', type: 'text', keyboardType: undefined, style: styles.inputSmall },
];

const WeightScreen: React.FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();
  const selectedChild = useSelector((state: RootState) => state.child.selectedChild);

  const [form, setForm] = useState<FormState>({
    date: new Date(),
    weight: "",
    weightUnit: "kg",
    height: "",
    heightUnit: "cm",
    head_circumference: "",
    circumferenceUnit: "cm",
  });
  const [historyData, setHistoryData] = useState<GrowthRecord[]>([]);
  const [childAge, setChildAge] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [showUnitModal, setShowUnitModal] = useState(false);
  const [selectedField, setSelectedField] = useState<keyof FormState | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const UNIT_OPTIONS = {
    weightUnit: ['kg', 'lb'],
    heightUnit: ['cm', 'inches'],
    circumferenceUnit: ['cm', 'in']
  };

  const formatDate = (date: Date) => {
    let month = `${date.getMonth() + 1}`;
    let day = `${date.getDate()}`;
    const year = date.getFullYear();
    if (month.length < 2) month = `0${month}`;
    if (day.length < 2) day = `0${day}`;
    return `${year}-${month}-${day}`;
  };

  const fetchGrowthHistory = async () => {
    if (!selectedChild?.id) {
      Toast.show({
        type: "error",
        text1: t("errorTitle"),
        text2: t("nochildselected")
      })
      return;
    }

    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('Usertoken');
      if (!token) {
        Toast.show({
          type: 'error',
          text1: t("errorTitle"),
          text2: t("userTokenMissing")
        });
        return;
      }

      const response = await axios.get<ApiResponse>(
        `${API_URL}${ENDPOINTS.growthdata}?child_id=${selectedChild.id}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        }
      );

      const result = response.data;
      console.log("get growth data ", result)

      if (result.success) {
        setHistoryData(result.data.growth_records || []);
        setChildAge(result.data.child_info?.age_months?.toString() || "");
      } else {
        Toast.show({
          type:"error",
          text1:t("errorTitle"),
          text2: result.message || t("failgrowthhistory")
        })
    
      }
    } catch (error: any) {
      console.error('API Error:', error);
      Toast.show({
          type:"error",
          text1:t("errorTitle"),
          text2:t("failgrowthhistory")
        })
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedChild?.id) {
      fetchGrowthHistory();
    }
  }, [selectedChild?.id]);

  const openUnitModal = (field: keyof FormState) => {
    setSelectedField(field);
    setShowUnitModal(true);
  };

  const selectUnit = (unit: string) => {
    if (selectedField) {
      setForm(prev => ({ ...prev, [selectedField]: unit } as FormState));
    }
    setShowUnitModal(false);
    setSelectedField(null);
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');  
    if (selectedDate) {
      setForm(prev => ({ ...prev, date: selectedDate }));
    }
  };

  const validateForm = (): boolean => {
    if (!form.weight || isNaN(Number(form.weight))) {
       Toast.show({
          type:"error",
          text1:t("vallidationError"),
          text2:("vallidWeight")
        })
       
      return false;
    }
    if (!form.height || isNaN(Number(form.height))) {
      Toast.show({
          type:"error",
          text1:t("vallidationError"),
          text2:("vallidHeight")
        })
      
      return false;
    }
    if (!form.date) {
      Toast.show({
          type:"error",
          text1:t("vallidationError"),
          text2:("vallidDate")
        }) 
      return false;
    }
    if (!form.weightUnit || !form.heightUnit) {
      Toast.show({
          type:"error",
          text1:t("vallidationError"),
          text2:("vallidUnit")
        }) 
      return false;
    }
    return true;
  };

  const handleSaveData = async () => {
    if (!validateForm()) return;

    if (!selectedChild?.id) {
       Toast.show({
          type:"error",
          text1:t("errorTitle"),
          text2:t("nochildselected")
        })
     
      return;
    }

    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('Usertoken');
      if (!token) {
           Toast.show({
          type: 'error',
          text1: t("errorTitle"),
          text2: t("userTokenMissing")
        });
        return;
      }

      const payload = {
        child_id: selectedChild.id,
        record_date: formatDate(form.date),
        height: form.height,
        height_unit: form.heightUnit,
        weight: form.weight,
        weight_unit: form.weightUnit,
        head_circumference: form.head_circumference || null,
        head_circumference_unit: form.head_circumference ? form.circumferenceUnit : null,
      };

      const response = await axios.post(
        `${API_URL}${ENDPOINTS.growthrecord}`,
        payload,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        }
      );

      if (response.data.success) {
         Toast.show({
          type:"success",
          text1:t("successTitle"),
          text2: t("growthSuccess")
        })
        
        fetchGrowthHistory();
      } else {
           Toast.show({
          type: 'error',
          text1: t("errorTitle"),
          text2: t("Failedtosave")
        });
    
      }
    } catch (error: any) {
      console.error('error for save data ', error);
      Toast.show({
          type: 'error',
          text1: t("errorTitle"),
          text2: t("Failedtosave")
        });
   
    } finally {
      setLoading(false);
    }
  };

  const renderField = ({ item }: { item: Field }) => {
    const isUnitField = item.key === 'weightUnit' || item.key === 'heightUnit' || item.key === 'circumferenceUnit';

    if (item.key === 'date') {
      return (
        <View style={styles.dataField}>
          <TouchableOpacity style={styles.inputContainer} onPress={() => setShowDatePicker(true)}>
            <CustomInput
              label={item.label}
              type={item.type}
              placeholder={item.label}
              value={form.date.toLocaleDateString()}
              disabled={false}
              onChangeText={()=>('')}
              style={item.style}
            />
            <VectorIcon
              type="MaterialIcons"
              name="keyboard-arrow-down"
              size={20}
              color={COLORS.grey}
              style={styles.dropdownIcon}
            />
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={form.date}
              mode="date"
              display="default"
              onChange={onDateChange}
              maximumDate={new Date()}
            />
          )}
        </View>
      );
    }

    return (
      <View style={styles.dataField}>
        <TouchableOpacity
          style={styles.inputContainer}
          onPress={() => isUnitField && openUnitModal(item.key)}
          disabled={!isUnitField}
        >
          <CustomInput
            label={item.label}
            type={item.type}
            placeholder={item.label}
            value={form[item.key].toString()}
            onChangeText={val => setForm(prev => ({ ...prev, [item.key]: val } as FormState))}
            keyboardType={item.keyboardType}
            style={item.style}
            disabled={!isUnitField}
          />
          {isUnitField && (
            <VectorIcon
              type="MaterialIcons"
              name="keyboard-arrow-down"
              size={20}
              color={COLORS.grey}
              style={styles.dropdownIcon}
            />
          )}
        </TouchableOpacity>
      </View>
    );
  };

  const renderUnitModal = () => (
    <Modal
      visible={showUnitModal}
      transparent
      animationType="slide"
      onRequestClose={() => setShowUnitModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.unitModal}>
          <View style={styles.modalHeader}>
            <CustomText style={styles.modalTitle}>{t("selectUnit")}</CustomText>
            <TouchableOpacity onPress={() => setShowUnitModal(false)}>
              <VectorIcon type="MaterialIcons" name="close" size={24} color={COLORS.grey} />
            </TouchableOpacity>
          </View>

          <FlatList
            data={selectedField ? UNIT_OPTIONS[selectedField as keyof typeof UNIT_OPTIONS] : []}
            keyExtractor={item => item}
            numColumns={2}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.unitOption,
                  form[selectedField as keyof FormState] === item && styles.unitOptionSelected,
                ]}
                onPress={() => selectUnit(item)}
              >
                <CustomText
                  style={[
                    styles.unitOptionText,
                    form[selectedField as keyof FormState] === item && styles.unitOptionTextSelected,
                  ]}
                >
                  {item.toUpperCase()}
                </CustomText>
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.unitList}
          />
        </View>
      </View>
    </Modal>
  );

  const renderHistoryRow = (item: GrowthRecord, idx: number) => (
    <View key={idx} style={styles.gridRow}>
      <TouchableOpacity
        style={styles.consultantButton}
        onPress={() => navigation.navigate('HeightAiScreen', { selectedGrowthRecord: { ...item, id: item.id.toString() } })}
      >
        <CustomText style={styles.consultantButtonText}>{t("consultant")}</CustomText>
      </TouchableOpacity>
      <CustomInput
        style={styles.gridItem}
        value={childAge}
        placeholder={t("age")}
        label={t("age")}
        onChangeText={() => { }}
        disabled={false}
      />
      <CustomInput
        style={styles.gridItem}
        value={item.weight}
        placeholder={t("weight")}
        label={t("weight")}
        onChangeText={() => { }}
        disabled={false}
      />
      <CustomInput
        style={styles.gridUnitSmall}
        value={item.weight_unit}
        placeholder={t("unit")}
        label={t("unit")}
        onChangeText={() => { }}
        disabled={false}
      />
      <CustomInput
        style={styles.gridItem}
        value={item.height}
        placeholder={t("height")}
        label={t("height")}
        onChangeText={() => { }}
        disabled={false}
      />
      <CustomInput
        style={styles.gridUnitSmall}
        value={item.height_unit}
        placeholder={t("unit")}
        label={t("unit")}
        onChangeText={() => { }}
        disabled={false}
      />
      <CustomInput
        style={styles.gridItemSmall}
        value={item.head_circumference}
        placeholder="Head"
        label="Head"
        onChangeText={() => { }}
        disabled={false}
      />
      <CustomInput
        style={styles.gridUnitSmall}
        value={item.head_circumference_unit}
        placeholder="Unit"
        label="Unit"
        onChangeText={() => { }}
        disabled={false}
      />
      {/* Consultant Button */}

    </View>
  );
  return (
    <GradientBackground>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
              <VectorIcon type="MaterialIcons" name="arrow-back-ios" size={25} color={COLORS.White} />
            </TouchableOpacity>
            <CustomText type="heading" fontFamily="semiBold" style={styles.headerTitle}>
              {t("weight")}&{t("height")}
            </CustomText>
            <TouchableOpacity style={styles.backIcon} onPress={() => navigation.navigate('HomeScreen')}>
              <VectorIcon type="MaterialIcons" name="home" size={25} color={COLORS.White} />
            </TouchableOpacity>
          </View>
          <Spacer size={10} />

          {/* Enter data card */}
          <View style={styles.dataCard}>
            <CustomText style={styles.cardTitle}>{t("EntertheData")}</CustomText>
            {/* Date field */}
            <FlatList
              data={[{ key: 'date', label: 'Date', type: 'date', keyboardType: 'numeric', style: styles.inputFull }]}
              keyExtractor={item => item.key}
              renderItem={renderField}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingVertical: 10 }}
            />
            {/* Other fields */}
            <FlatList
              data={FIELDS}
              keyExtractor={item => item.key}
              renderItem={renderField}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingVertical: 10 }}
            />
            <TouchableOpacity
              style={[styles.saveButton, loading && styles.saveButtonDisabled]}
              onPress={handleSaveData}
              disabled={loading}
            >
              <CustomText style={styles.saveButtonText}>
                {loading ? t("saving") : t("saveData")}
              </CustomText>
            </TouchableOpacity>
          </View>
          <Spacer size={10} />

          {/* Historic Data Card */}
          <View style={styles.dataCard}>
            <CustomText style={styles.cardTitle}>{t("HistoricData")}</CustomText>
            {loading ? (
              <CustomText style={styles.loadingText}>{t("loadingHistory")}</CustomText>
            ) : historyData.length > 0 ? (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.historyScrollContent}
              >
                <View style={styles.gridTable}>

                  {historyData.map((item, idx) => renderHistoryRow(item, idx))}
                </View>
              </ScrollView>
            ) : (
              <CustomText style={styles.noDataText}>{t("noHistory")}</CustomText>
            )}
          </View>
          <Spacer size={30} />
        </View>
      </ScrollView>

      {renderUnitModal()}
    </GradientBackground>
  );
};

export default WeightScreen;
