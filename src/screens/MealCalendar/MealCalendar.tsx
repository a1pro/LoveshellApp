import React, { useState, useEffect, useCallback } from "react";
import { View, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import { Calendar, CalendarProps } from "react-native-calendars";
import { CustomText } from "../../components/CustomText";
import GradientBackground from "../../components/GradientBackground";
import styles from "./style";
import COLORS from "../../utils/Colors";
import VectorIcon from "../../components/VectorIcon";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Spacer from "../../components/Spacer";
import { RootStackParamList } from "../../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store/Store";
import ENDPOINTS, { API_URL } from "../../APIService/endPoints";
import { useTranslation } from "react-i18next";

type Props = NativeStackScreenProps<RootStackParamList, "MealCalendar">;

const getTodayDateString = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

const MealCalendar: React.FC<Props> = ({ navigation }) => {
  const [mealStatus, setMealStatus] = useState<{ [key: string]: any }>({});
  const [currentMonth, setCurrentMonth] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const { t } = useTranslation();
  const selectedChild = useSelector((state: RootState) => state.child.selectedChild);

  useEffect(() => {
    fetchMealStatus();
    const today = new Date();
    const monthNames = [
      "January", "February", "March", "April", "May", "June", "July",
      "August", "September", "October", "November", "December"
    ];
    setCurrentMonth(`${monthNames[today.getMonth()]} ${today.getFullYear()}`);
  }, []);

  const fetchMealStatus = async () => {
    try {
      setLoading(true);
      const userToken = await AsyncStorage.getItem("Usertoken");
      const res = await axios.get(`${API_URL}${ENDPOINTS.getstatus}`, {
        params: { child_id: selectedChild?.id },
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      if (res.data.success) {
        const dateMap: { [key: string]: any } = {};
        res.data.data.daily_meal_summary.forEach((summary: any) => {
          dateMap[summary.date] = summary;
        });
        setMealStatus(dateMap);
      }
    } catch (error) {
      console.log("Error loading meal status", error);
    } finally {
      setLoading(false);
    }
  };

  const getIconName = (quality_status: string) => {
    switch (quality_status) {
      case "good": return "check-square";
      case "fair": return "meh-o";
      case "poor": return "thumbs-down";
      case "bad": return "close";
      case "missing": return "warning";
      default: return null;
    }
  };

  const getIconColor = (quality_status: string) => {
    switch (quality_status) {
      case "good": return COLORS.darkgreen2;
      case "fair": return COLORS.blue3;
      case "poor": return COLORS.red2;
      case "bad": return COLORS.darkred;
      case "missing": return COLORS.yellow3;
      default: return "#BDBDBD";
    }
  };

  // **FIXED: Pass mealStatus and handlers as props**
  const renderDayComponent = useCallback(({ date, state }: any) => {
    if (!date) return <View style={styles.emptyDay} />;
    
    const dateString = date.dateString;
    const info = mealStatus[dateString];
    const today = getTodayDateString();
    const isToday = dateString === today;

    return (
      <TouchableOpacity
        style={[
          styles.dayContainer,
          isToday && styles.todayDayContainer
        ]}
        onPress={() => navigation.navigate("AddmealScreen" as any, { date: dateString })}
        activeOpacity={0.7}
      >
        <CustomText
          style={[
            styles.dayText,
            isToday && styles.todayDayText,
          ]}
        >
          {date.day}
        </CustomText>
        {info && getIconName(info.quality_status) && (
          <VectorIcon
            type="FontAwesome"
            name={getIconName(info.quality_status) || "circle"}
            size={14}
            color={getIconColor(info.quality_status)}
            style={styles.dayIcon}
          />
        )}
      </TouchableOpacity>
    );
  }, [mealStatus, navigation]);

  const onMonthChange = (month: any) => {
    const monthNames = [
      "January", "February", "March", "April", "May", "June", "July",
      "August", "September", "October", "November", "December"
    ];
    setCurrentMonth(`${monthNames[month.month - 1]} ${month.year}`);
  };

  return (
    <GradientBackground>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
              <VectorIcon type="MaterialIcons" name="arrow-back-ios" size={25} color={COLORS.White} />
            </TouchableOpacity>
            <CustomText type="subTitle" fontFamily="semiBold" style={styles.headerTitle}>
              {t("stayontrack")}{"\n"}{t('dailynutrition')}
            </CustomText>
            <TouchableOpacity style={styles.backIcon} onPress={() => navigation.navigate("HomeScreen")}>
              <VectorIcon type="MaterialIcons" name="home" size={30} color={COLORS.White} />
            </TouchableOpacity>
          </View>

          <Spacer size={20} />

          <View style={styles.calendarContainer}>
            {loading ? (
              <ActivityIndicator size="large" color={COLORS.blue} style={{ marginTop: 25 }} />
            ) : (
              <Calendar
                style={styles.calendar}
                theme={calendarTheme}
                current={getTodayDateString()}
                onMonthChange={onMonthChange}
                hideExtraDays={false}
                firstDay={1}
               
                renderHeader={(date: any) => {
                  const monthNames = [
                    "January", "February", "March", "April", "May", "June", "July",
                    "August", "September", "October", "November", "December"
                  ];
                  return (
                    <View style={styles.calendarHeader}>
                      <CustomText style={styles.calendarHeaderText}>
                        {monthNames[date.getMonth()]} {date.getFullYear()}
                      </CustomText>
                    </View>
                  );
                }}
                dayComponent={renderDayComponent}  
              />
            )}
          </View>

          <Spacer size={30} />

          <View style={styles.legendContainer}>
            <CustomText type="subHeading" fontFamily="semiBold" style={styles.legendTitle}>
              {t("legend")}
            </CustomText>
            <Spacer size={15} />
            <View style={styles.legendItem}>
              <VectorIcon type="FontAwesome" name="check-square" size={20} color={COLORS.darkgreen2} style={styles.legendIcon} />
              <CustomText type="small" fontFamily="regular" style={styles.legendText}>
                {t("goodnutrientbalance")}
              </CustomText>
            </View>
            <View style={styles.legendItem}>
              <VectorIcon type="FontAwesome" name="thumbs-down" size={20} color={COLORS.red2} style={styles.legendIcon} />
              <CustomText type="small" fontFamily="regular" style={styles.legendText}>
                {t("poornutrientbalance")}
              </CustomText>
            </View>
            <View style={styles.legendItem}>
              <VectorIcon type="FontAwesome" name="warning" size={20} color={COLORS.yellow3} style={styles.legendIcon} />
              <CustomText type="small" fontFamily="regular" style={styles.legendText}>
                {t("missingnutrientdata")}
              </CustomText>
            </View>
            {/* <View style={styles.legendItem}>
              <VectorIcon type="FontAwesome" name="meh-o" size={20} color={COLORS.blue3} style={styles.legendIcon} />
              <CustomText type="small" fontFamily="regular" style={styles.legendText}>
                {t("fairnutrients")}
              </CustomText>
            </View>
            <View style={styles.legendItem}>
              <VectorIcon type="FontAwesome" name="close" size={20} color={COLORS.darkred} style={styles.legendIcon} />
              <CustomText type="small" fontFamily="regular" style={styles.legendText}>
                {t("badnutrients")}
              </CustomText>
            </View> */}
          </View>

          <Spacer size={20} />
        </View>
      </ScrollView>
    </GradientBackground>
  );
};

const calendarTheme = {
  backgroundColor: "transparent",
  calendarBackground: COLORS.White,
  textSectionTitleColor: COLORS.black,
  textSectionTitleDisabledColor: COLORS.grey,
  "stylesheet.calendar.header": {
    header: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 10,
    },
    week: {
      marginTop: 7,
      flexDirection: "row",
      justifyContent: "space-around",
      borderBottomWidth: 1,
      borderBottomColor: COLORS.lightGrey,
      paddingBottom: 10,
    },
    dayHeader: {
      width: 32,
      textAlign: "center",
      fontSize: 14,
      fontWeight: "bold",
      color: COLORS.black,
    },
  },
  textDayHeaderFontSize: 14,
  textDayHeaderFontFamily: "Poppins-SemiBold",
  textDayHeaderColor: COLORS.black,
  textDayFontSize: 14,
  textDayFontFamily: "Poppins-Regular",
  textDayColor: COLORS.black,
  textDisabledColor: COLORS.grey,
  selectedDayBackgroundColor: "transparent",
  selectedDayTextColor: COLORS.black,
  todayTextColor: COLORS.blue,
  todayBackgroundColor: "transparent",
  dotColor: COLORS.blue,
  selectedDotColor: COLORS.White,
  arrowColor: COLORS.black,
  arrowStyle: {
    padding: 5,
  },
  monthTextColor: COLORS.black,
  textMonthFontSize: 18,
  textMonthFontFamily: "Poppins-Bold",
  "stylesheet.calendar.main": {
    container: {
      paddingLeft: 0,
      paddingRight: 0,
    },
    monthView: {
      backgroundColor: "transparent",
    },
  },
};

export default MealCalendar;
