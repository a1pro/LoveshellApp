import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Image, ScrollView, ActivityIndicator } from "react-native";
import { RootStackParamList } from "../../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CustomText } from "../../components/CustomText";
import GradientBackground from "../../components/GradientBackground";
import styles from "./style";
import COLORS from "../../utils/Colors";
import VectorIcon from '../../components/VectorIcon';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Spacer from "../../components/Spacer";
import IMAGES from "../../assets/images";
import { useTranslation } from "react-i18next";
import Toast from "react-native-toast-message";
import axios from "axios";
import ENDPOINTS, { API_URL } from "../../APIService/endPoints";
import { RootState } from "../../store/store/Store";
import { useSelector } from "react-redux";

interface Activity {
  id: number;
  child_id: number;
  age_months: number;
  suggested_date: string;
  development_area: string;
  activity_title: string;
  activity_description: string;
  is_completed: boolean;
  materials_needed: string;
  instructions: string;
  benefits: string;
  safety_notes: string;
  difficulty_level: number;
  duration_minutes: number;
  ai_analysis?: string;
}

interface ActivityDay {
  date: string;
  day_name: string;
  day_short: string;
  activities: Activity[];
  activity_count: number;
  completed_count: number;
}

interface ActivitiesData {
  child_info: {
    id: number;
    name: string;
    age_months: number;
  };
  week_range: {
    start_date: string;
    end_date: string;
    display_range: string;
  };
  activities_by_day: ActivityDay[];
  statistics: {
    total_activities: number;
    completed_activities: number;
    completion_rate: number;
    average_rating: number;
    days_covered: number;
  };
  raw_activities: Activity[];
}

interface CreateActivityResponse {
  activity_title: string;
  activity_description: string;
  instructions: string;
  benefits: string;
  materials_needed: string;
  duration_minutes: number;
  difficulty_level: number;
  safety_notes: string;
  ai_analysis: string;
  analysis_language: string;
  child_id: number;
  age_months: number;
  suggested_date: string;
  development_area: string;
  updated_at: string;
  created_at: string;
  id: number;
}

interface CreateActivitiesResponse {
  success: boolean;
  message: string;
  data: {
    activities: CreateActivityResponse[];
    week_range: {
      start_date: string;
      end_date: string;
      display_range: string;
    };
    regenerated: boolean;
    activities_count: number;
  };
}

type Props = NativeStackScreenProps<RootStackParamList, 'PrankScreen'>;

const PrankScreen: React.FC<Props> = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [activitiesData, setActivitiesData] = useState<ActivitiesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [creatingActivities, setCreatingActivities] = useState(false);
  const [shouldShowCreateButton, setShouldShowCreateButton] = useState(false);
  const { t } = useTranslation();

  const selectedChild = useSelector(
    (state: RootState) => state.child.selectedChild
  );

  const checkActivitiesExpiry = async () => {
    try {
      const activitiesCreatedAt = await AsyncStorage.getItem('prankActivitiesCreatedAt');
      if (!activitiesCreatedAt) {
        setShouldShowCreateButton(true);
        return;
      }

      const createdDate = new Date(activitiesCreatedAt);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - createdDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
 
      setShouldShowCreateButton(diffDays >= 7);
    } catch (error) {
      console.error('Error checking activities expiry:', error);
      setShouldShowCreateButton(true);
    }
  };

  useEffect(() => {
    fetchUserData();
    checkActivitiesExpiry();
    fetchActivities();
  }, []);

  const fetchUserData = async () => {
    try {
      const userDataString = await AsyncStorage.getItem('userData');
      if (userDataString) {
        const user = JSON.parse(userDataString);
        setUserName(user.username || "User");
      }
    } catch (e) {
      console.error('Failed to load user data', e);
      setUserName("User");
    }
  };

  const fetchActivities = async () => {
    try {
      const token = await AsyncStorage.getItem('Usertoken');
      if (!token) {
        Toast.show({
          type: 'error',
          text1: t('errorTitle'),
          text2: t('userTokenMissing')
        });
        return;
      } 
      
      const response = await axios.get(
        `${API_URL}${ENDPOINTS.GET_PRANKS}`,  
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            child_id: selectedChild?.id
          }
        }
      );

      if (response.data.success) {
        setActivitiesData(response.data.data);
        console.log('Fetched activities data:', response.data.data);
      } else {
        setActivitiesData(null);
      }
    } catch (error) {
      console.error('Failed to load activities', error);
      Toast.show({
        type: 'error',
        text1: t('errorTitle'),
        text2: t('failedToLoadData')
      });
      setActivitiesData(null);
    } finally {
      setLoading(false);
    }
  }; 

  const getImageForDay = (dayName: string) => {
    switch (dayName.toLowerCase()) {
      case 'monday':
        return IMAGES.prank11; 
      case 'tuesday':
        return IMAGES.prank12;  
      case 'wednesday':
        return IMAGES.prank13; 
      case 'thursday':
        return IMAGES.prank14;  
      case 'friday':
        return IMAGES.prank15 || IMAGES.prank1;  
      case 'saturday':
        return IMAGES.prank16 || IMAGES.prank2;  
      case 'sunday':
        return IMAGES.prank1|| IMAGES.prank3;  
      default:
        return IMAGES.prank1; 
    }
  }; 

  const getBackgroundColor = (dayName: string) => {
    switch (dayName.toLowerCase()) {
      case 'monday':
        return COLORS.lightyellow;
      case 'tuesday':
        return COLORS.lightorange;
      case 'wednesday':
        return COLORS.lightred;
      case 'thursday':
        return COLORS.lightGreen;
      case 'friday':
        return COLORS.lightblue4|| COLORS.lightyellow;
      case 'saturday':
        return COLORS.lightblue4 || '#C4E4F4';
      case 'sunday':
        return COLORS.lightpink || '#F4C4E4';
      default:
        return COLORS.lightyellow;
    }
  };

  const getTextColor = (dayName: string) => {
    switch (dayName.toLowerCase()) {
      case 'monday':
      case 'tuesday':
        return COLORS.orange;
      case 'wednesday':
      case 'sunday':
        return COLORS.purple;
      case 'thursday':
        return COLORS.green;
      case 'friday':
        return COLORS.purple || COLORS.purple;
      case 'saturday':
        return COLORS.blue3 || COLORS.blue;
      default:
        return COLORS.orange;
    }
  };

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleCardPress = (day: ActivityDay, activity: Activity) => {
    navigation.navigate('PrankDetails', {
      activityData: activity,
      dayInfo: {
        date: day.date,
        day_name: day.day_name,
        day_short: day.day_short
      }
    });
  };

  const renderActivityCards = () => {
    if (!activitiesData || !activitiesData.activities_by_day || activitiesData.activities_by_day.length === 0) {
      return null;
    }

    const activityDays = activitiesData.activities_by_day.slice(0, 7);
    return activityDays.map((day, index) => {
      const activity = day.activities && day.activities.length > 0 ? day.activities[0] : null;
      
      if (!activity) {
        return (
          <View 
            key={`${day.date}-${index}`}
            style={[styles.card, { 
              backgroundColor: getBackgroundColor(day.day_name),
              opacity: 0.6
            }]} 
          >
            <Image 
              source={getImageForDay(day.day_name)} 
              style={[styles.cardIcon, { opacity: 0.5 }]} 
            />
            <CustomText 
              type="small" 
              style={[styles.cardText, { 
                color: getTextColor(day.day_name), 
                marginBottom: 5 
              }]}
            >
              {day.day_name}
            </CustomText>
            <CustomText 
              type="small" 
              style={[styles.cardText, { 
                color: getTextColor(day.day_name), 
                fontSize: 16 
              }]}
            >
              {t("noActivities")}
            </CustomText>
          </View>
        );
      }

      return (
        <TouchableOpacity 
          key={`${day.date}-${index}`}
          style={[styles.card, { backgroundColor: getBackgroundColor(day.day_name) }]} 
          onPress={() => handleCardPress(day, activity)}
        >
          <Image 
            source={getImageForDay(day.day_name)} 
            style={styles.cardIcon} 
          />
          <CustomText 
            type="small" 
            style={[styles.cardText, { 
              color: getTextColor(day.day_name), 
              marginBottom: 5 
            }]}
          >
            {day.day_name}
          </CustomText>
          <CustomText 
            type="small" 
            style={[styles.cardText, { 
              color: getTextColor(day.day_name), 
              fontSize: 16 
            }]}
          >
            {capitalizeFirstLetter(activity.development_area)}
          </CustomText>
        </TouchableOpacity>
      );
    });
  };

  const handleCreateActivities = async () => {
    try {
      const token = await AsyncStorage.getItem('Usertoken');
      if (!token) {
        Toast.show({
          type: 'error',
          text1: t('errorTitle'),
          text2: t('userTokenMissing')
        });
        return;    
      }
      
      if (!selectedChild?.id) {
        Toast.show({
          type: 'error',
          text1: t('errorTitle'),
          text2: 'Please select a child first'
        });
        return;
      }

      setCreatingActivities(true);
      
      const formData = new FormData();
      formData.append("child_id", String(selectedChild.id));
      
      const response = await axios.post<CreateActivitiesResponse>(
        `${API_URL}${ENDPOINTS.CREATE_PRANKS}`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (response.data.success) { 
        await AsyncStorage.setItem('prankActivitiesCreatedAt', new Date().toISOString());
        setShouldShowCreateButton(false);  
        
        Toast.show({
          type: 'success',
          text1: t("successTitle"),
          text2: response.data.message || t("activityCreatedSuccess")
        });
       
        if (response.data.data.activities_count > 0) {
          Toast.show({
            type: 'success',
            text1:t("successTitle"),
            text2: `${response.data.data.activities_count} ${t("activitiesGenerated")}`
          });
        }
       
        await fetchActivities();
      } else {
        Toast.show({
          type: 'error',
          text1: t("errorTitle"),
          text2: response.data.message || 'Failed to create activities'
        });
      }
    } catch (error: any) {
      console.error('Failed to create activities:', error);
      
      let errorMessage = 'Failed to create activities';
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      Toast.show({
        type: 'error',
        text1: t("errorTitle"),
        text2: errorMessage
      });
    } finally {
      setCreatingActivities(false);
    }
  };
 
  const hasAnyActivities = () => {
    if (!activitiesData || !activitiesData.activities_by_day) {
      return false;
    }
    return activitiesData.activities_by_day.some(day => 
      day.activities && day.activities.length > 0
    );
  };
 
  const shouldShowCreateButtonSection = () => {
    return !hasAnyActivities() && shouldShowCreateButton;
  };

  return (
    <GradientBackground>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
              <VectorIcon
                type="MaterialIcons"
                name="arrow-back-ios"
                size={25}
                color={COLORS.White} />
            </TouchableOpacity>
            <CustomText type="heading" fontFamily="semiBold" style={styles.headerTitle}>
              {userName}
            </CustomText>
            <TouchableOpacity style={styles.backIcon} onPress={() => navigation.navigate('HomeScreen')}>
              <VectorIcon
                type="MaterialIcons"
                name="home"
                size={25}
                color={COLORS.White} />
            </TouchableOpacity>
          </View>
          
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={COLORS.blue} />
              <CustomText style={styles.loadingText}>
                {t("loading")}...
              </CustomText>
            </View>
          ) : (
            <> 
              {hasAnyActivities() ? (
               
                <View style={styles.gridContainer}>
                  {renderActivityCards()}
                </View>
              ) : shouldShowCreateButtonSection() ? (
                 
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 60 }}>
                  <CustomText 
                    type="subTitle" 
                    style={{ 
                      color: COLORS.black, 
                      textAlign: 'center',
                      marginBottom: 10
                    }}
                  >
                   {t("noActivities")}
                  </CustomText>
                  <CustomText 
                    type="small" 
                    style={{ 
                      color: COLORS.grey,
                      textAlign: 'center',
                      marginBottom: 40,
                      paddingHorizontal: 40
                    }}
                  >
                    {t("weeklyActivities")}{selectedChild?.name || 'your child'}
                  </CustomText>
                  
                  <TouchableOpacity
                    style={{
                      backgroundColor: COLORS.blue,
                      paddingVertical: 15,
                      paddingHorizontal: 40,
                      borderRadius: 12,
                      alignItems: 'center',
                      justifyContent: 'center',
                      shadowColor: COLORS.black,
                      shadowOpacity: 0.1,
                      shadowOffset: { width: 0, height: 2 },
                      shadowRadius: 4,
                      elevation: 3,
                      opacity: creatingActivities ? 0.7 : 1
                    }}
                    onPress={handleCreateActivities}
                    disabled={creatingActivities}
                  >
                    {creatingActivities ? (
                      <>
                        <ActivityIndicator size="small" color={COLORS.White} />
                        <CustomText 
                          type="subTitle" 
                          style={{ 
                            color: COLORS.White,
                            fontFamily: 'Poppins-SemiBold',
                            marginLeft: 10
                          }}
                        >
                          {t("creating")}
                        </CustomText>
                      </>
                    ) : (
                      <CustomText 
                        type="subTitle" 
                        style={{ 
                          color: COLORS.White,
                          fontFamily: 'Poppins-SemiBold'
                        }}
                      >
                        {t("createActivity")}
                      </CustomText>
                    )}
                  </TouchableOpacity>
                </View>
              ) : ( 
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 60 }}>
                  <CustomText 
                    type="subTitle" 
                    style={{ 
                      color: COLORS.black, 
                      textAlign: 'center',
                      marginBottom: 10
                    }}
                  >
                    {t("activitiesAlreadyCreated")}
                  </CustomText>
                  <CustomText 
                    type="small" 
                    style={{ 
                      color: COLORS.grey,
                      textAlign: 'center',
                      paddingHorizontal: 40
                    }}
                  >
                    {t("newactivities")} {7 - Math.floor(Math.random() * 3 + 4)} {t("days")}
                  </CustomText>
                </View>
              )}
            </>
          )}
        </View>
      </ScrollView>
    </GradientBackground>
  );
};

export default PrankScreen;
