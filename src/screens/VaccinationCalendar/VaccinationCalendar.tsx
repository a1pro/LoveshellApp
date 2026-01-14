import React, { useState, useMemo, useCallback } from 'react';
import { View, TouchableOpacity, ScrollView, ActivityIndicator,Image } from 'react-native';
import GradientBackground from '../../components/GradientBackground';
import { RootStackParamList } from '../../types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store/Store';
import VectorIcon from '../../components/VectorIcon';
import { CustomText } from '../../components/CustomText';
import COLORS from '../../utils/Colors';
import { Calendar, DateData } from 'react-native-calendars';
import styles from './style';
import Icon from 'react-native-vector-icons/Fontisto';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ENDPOINTS, { API_URL } from '../../APIService/endPoints';
import CustomButton from '../../components/CustomButton';
import { useFocusEffect } from '@react-navigation/native';
import Spacer from '../../components/Spacer';
import Toast from 'react-native-toast-message';
import { useTranslation } from 'react-i18next';
 
import IMAGES from '../../assets/images';

type Props = NativeStackScreenProps<RootStackParamList, 'VaccinationCalendar'>;

type DoseStatus = 'completed' | 'pending' | 'upcoming' | 'overdue' | 'scheduled' | 'none';

interface VaccineData {
  id: number;
  child_id: number;
  user_id: number;
  vaccine_name: string;
  dose_number: number;
  status: 'completed' | 'scheduled';  
  due_date: string;
  administered_date: string | null;
}

interface ApiResponse {
  success: boolean;
  data: {
    vaccinations: VaccineData[];
  };
}

interface VaccinationRecord {
  id: number;
  vaccine_name: string;
  dose_number: number;
  status: DoseStatus;
  due_date: string;
  administered_date: string | null;
  ageLabel?: string;
}

const TODAY_STRING = new Date().toISOString().split('T')[0];

const VaccinationCalendar: React.FC<Props> = ({ navigation }) => {
  const selectedChild = useSelector(
    (state: RootState) => state.child.selectedChild,
  );
 const { t } = useTranslation();
  const [selectedDate, setSelectedDate] = useState<string>(TODAY_STRING);
  const [vaccineData, setVaccineData] = useState<Record<string, VaccinationRecord[]>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      if (selectedChild?.id) {
        fetchVaccineData();
      }
    }, [selectedChild?.id])
  );

  const fetchVaccineData = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = await AsyncStorage.getItem('Usertoken');
      if (!token) {
          Toast.show({
               type:"error",
               text1:t("errorTitle"),
               text2:t("userTokenMissing")
             }) 
        setLoading(false);
        return;
      }

      const response = await axios.get<ApiResponse>(
        `${API_URL}${ENDPOINTS.getVaccination}${selectedChild?.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.success) {
        console.log("vaccine data", response.data);
        const formattedData: Record<string, VaccinationRecord[]> = {};

        response.data.data.vaccinations.forEach((vaccine: VaccineData) => {
          // Determine the date key - if administered, use that date, otherwise use due date
          const dateKey = vaccine.administered_date
            ? vaccine.administered_date.split('T')[0]
            : vaccine.due_date.split('T')[0];
 
          const uiStatus: DoseStatus = vaccine.status === 'scheduled' ? 'pending' : vaccine.status;

          const record: VaccinationRecord = {
            id: vaccine.id,
            vaccine_name: vaccine.vaccine_name,
            dose_number: vaccine.dose_number,
            status: uiStatus,  
            due_date: vaccine.due_date,
            administered_date: vaccine.administered_date,
            ageLabel: `Dose ${vaccine.dose_number}`,
          };

          if (formattedData[dateKey]) {
            formattedData[dateKey].push(record);
          } else {
            formattedData[dateKey] = [record];
          }
        });

        setVaccineData(formattedData);
      }
    } catch (err: any) {
      console.error('Error fetching vaccine data:', err);
      setError(err.response?.data?.message || 'Failed to fetch vaccine data');
    } finally {
      setLoading(false);
    }
  };

  const selectedRecords: VaccinationRecord[] | undefined = useMemo(
    () => vaccineData[selectedDate],
    [selectedDate, vaccineData]
  );

  const onDayPress = (day: DateData) => {
    setSelectedDate(day.dateString);
  };

  const markedDates = useMemo(() => {
    const marks: any = {};
    Object.keys(vaccineData).forEach(date => {
      const records = vaccineData[date];
      if (records && records.length > 0) {
        marks[date] = {
          selected: date === selectedDate,
          selectedColor: COLORS.appLinear1,
          selectedTextColor: COLORS.White,
        };
      }
    });
    if (selectedDate) {
      marks[selectedDate] = {
        ...(marks[selectedDate] || {}),
        selected: true,
        selectedColor: COLORS.appLinear1,
        selectedTextColor: COLORS.White,
      };
    }
    return marks;
  }, [selectedDate, vaccineData]);

  const getVaccineIconColor = (status: DoseStatus) => {
    switch (status) {
      case 'completed': return '#22c55e';
      case 'pending':
      case 'scheduled':  
      case 'upcoming': return '#f59e0b';
      case 'overdue': return '#ef4444';
      default: return '#f59e0b';
    }
  };

  const renderDay = (date: DateData) => {
    const dateStr = date.dateString;
    const vaccines = vaccineData[dateStr];
    const isSelected = dateStr === selectedDate;
    const isToday = dateStr === TODAY_STRING;

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => onDayPress(date)}
        style={styles.dayContainer}
      >
        <View
          style={[
            styles.dayContent,
            isSelected && styles.selectedDay,
            isToday && !isSelected && styles.todayDay,
          ]}
        >
          <CustomText
            style={[
              styles.dayNumber,
              isSelected && styles.selectedDayText,
              isToday && !isSelected && styles.todayText,
            ]}
          >
            {date.day}
          </CustomText>

          {vaccines && vaccines.length > 0 && (
            <View style={styles.vaccineIconContainer}>
              <Icon
                name="injection-syringe"
                size={14}
                color={getVaccineIconColor(vaccines[0].status)}
              />
              {vaccines.length > 1 && (
                <View style={styles.vaccineCountBadge}>
                  <CustomText style={styles.vaccineCountText}>
                    +{vaccines.length - 1}
                  </CustomText>
                </View>
              )}
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const renderStatusRow = (status: DoseStatus) => {
    let iconName = 'alarm';
    let iconColor = '#f59e0b';
    let textColor = '#f97316';
    let label = 'Pending';

    switch (status) {
      case 'completed': 
        iconName = 'check-circle'; 
        iconColor = '#22c55e'; 
        textColor = '#10b981'; 
        label = 'Completed'; 
        break;
      case 'upcoming': 
        iconName = 'schedule'; 
        iconColor = '#3b82f6'; 
        textColor = '#2563eb'; 
        label = 'Upcoming'; 
        break;
      case 'overdue': 
        iconName = 'warning'; 
        iconColor = '#ef4444'; 
        textColor = '#dc2626'; 
        label = 'Overdue'; 
        break;
      case 'scheduled':  
      case 'pending': 
        iconName = 'alarm'; 
        iconColor = '#f59e0b'; 
        textColor = '#f97316'; 
        label = 'Pending'; 
        break;
    }

    return (
      <View style={styles.statusRow}>
        <VectorIcon
          type="MaterialIcons"
          name={iconName}
          color={iconColor}
          size={20}
        />
        <CustomText style={[styles.statusText, { color: textColor }]}>
          {label}
        </CustomText>
      </View>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

    const handleUpdateVaccine = (record: VaccinationRecord) => {
   
    navigation.navigate('VaccinationUpdate' as any, {
      vaccineData: {
        id: record.id,
        vaccine_name: record.vaccine_name,
        dose_number: record.dose_number,
        due_date: record.due_date,
        administered_date: record.administered_date,
        status: record.status,
      },
    });
  };

 const renderVaccineCard = (record: VaccinationRecord, index: number) => {
  const shouldShowUpdateButton = record.status === 'pending' || record.status === 'scheduled' || record.status === 'upcoming';

  return (
    <View key={index} style={styles.vaccineCard}>
      
      <View style={styles.cardTopRow}>
       
   
      
        <View style={styles.vaccineTextContainer}>
          <View style={styles.vaccineHeader}>
            <View style={styles.vaccineInfo}>
              <CustomText style={styles.vaccineTitle}>
                {record.vaccine_name}
              </CustomText>
              <CustomText style={styles.vaccineSubTitle}>
                {record.ageLabel || `Dose ${record.dose_number}`}
                {record.administered_date && ` • Administered on ${formatDate(record.administered_date)}`}
                {!record.administered_date && record.due_date && ` • Due on ${formatDate(record.due_date)}`}
              </CustomText>
            </View>
            {renderStatusRow(record.status)}
          </View>
          <Spacer style={{height:10}}/>
          {shouldShowUpdateButton && (
            <CustomButton 
              title={t("updateVaccination")} 
              onPress={() => handleUpdateVaccine(record)}
            />
          )}
        </View>
             <Image
          source={IMAGES.vacinechild}  
          style={styles.vaccineImage}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};
 
  const renderCalendar = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.appLinear1} />
          <CustomText style={styles.loadingText}>{t("vaccineLoading")}</CustomText>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.errorContainer}>
          <VectorIcon
            type="MaterialIcons"
            name="error-outline"
            size={40}
            color="#ef4444"
          />
          <CustomText style={styles.errorText}>{error}</CustomText>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={fetchVaccineData}
          >
            <CustomText style={styles.retryButtonText}>{t("retry")}</CustomText>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.calendarCard}>
        <Calendar
          current={TODAY_STRING}
          onDayPress={onDayPress}
          markedDates={markedDates}
          style={styles.calendar}
          hideExtraDays={false}
          dayComponent={({ date }) => {
            if (!date) return <View style={styles.emptyDay} />;
            return renderDay(date);
          }}
          theme={{
            calendarBackground: 'transparent',
            textSectionTitleColor: COLORS.black,
            dayTextColor: 'transparent',
            monthTextColor: COLORS.black,
            arrowColor: COLORS.White,
            todayTextColor: 'transparent',
            textDayFontFamily: 'Poppins-Regular',
            textMonthFontFamily: 'Poppins-SemiBold',
            textDayHeaderFontFamily: 'Poppins-Medium',
            textDayFontSize: 14,
            textDayHeaderFontSize: 12,
          }}
        />
      </View>
    );
  };

  return (
    <GradientBackground>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.goBack()}>
            <VectorIcon type="MaterialIcons" name="arrow-back-ios" size={22} color={COLORS.White} />
          </TouchableOpacity>

          <CustomText type="heading" fontFamily="semiBold" style={styles.headerTitle}>
            {selectedChild ? `${selectedChild.name}` : 'Vaccination Calendar'}
          </CustomText>

          <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.navigate('HomeScreen')}>
            <VectorIcon type="MaterialIcons" name="home" size={28} color={COLORS.White} />
          </TouchableOpacity>
        </View>

        <CustomText style={styles.pageTitle}>
         {t("stayonTrack")}
        </CustomText>

        {renderCalendar()}

        {!loading && !error && (
          <View style={styles.summaryCard}>
            <CustomText style={styles.selectedDateText}>
              {formatDate(selectedDate)}
            </CustomText>

            {selectedRecords && selectedRecords.length > 0 ? (
              selectedRecords.map((record, index) => renderVaccineCard(record, index))
            ) : (
              <>
                <CustomText style={styles.vaccineTitle}>{t("noVaccination")}</CustomText>
                <CustomText style={styles.vaccineSubTitle}>{t("noVaccineAppointment")}</CustomText>
                <CustomButton 
                  title={t("addVaccination")}
                  onPress={() => navigation.navigate("VaccinationForm" as any)} 
                  
                />
              </>
            )}
          </View>
        )}

        {/* Legend */}
        {!loading && !error && Object.keys(vaccineData).length > 0 && (
          <View style={styles.legendContainer}>
            <View style={styles.legendItem}>
              <Icon name="injection-syringe" size={14} color="#22c55e" />
              <CustomText style={styles.legendText}>{t("completed")}</CustomText>
            </View>
            <View style={styles.legendItem}>
              <Icon name="injection-syringe" size={14} color="#f59e0b" />
              <CustomText style={styles.legendText}>{t("pending")}</CustomText>
            </View>
            <View style={styles.legendItem}>
              <Icon name="injection-syringe" size={14} color="#ef4444" />
              <CustomText style={styles.legendText}>{t("overdue")}</CustomText>
            </View>
          </View>
        )}
      </ScrollView>
    </GradientBackground>
  );
};

export default VaccinationCalendar;