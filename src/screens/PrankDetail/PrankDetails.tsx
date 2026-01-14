import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import { useSelector } from 'react-redux';

import {CustomText} from '../../components/CustomText';
import GradientBackground from '../../components/GradientBackground';
import { useTranslation } from 'react-i18next';
import VectorIcon from '../../components/VectorIcon';
import Spacer from '../../components/Spacer';
import COLORS from '../../utils/Colors';
import styles from './style';
import IMAGES from '../../assets/images';
import { RootState } from '../../store/store/Store';

type Props = NativeStackScreenProps<RootStackParamList, 'PrankDetails'>;

interface PrankActivity {
  id: number;
  child_id: number;
  age_months: number;
  activity_title: string;
  activity_description: string;
  materials_needed: string;
  instructions: string;
  benefits: string;
  safety_notes: string;
  difficulty_level: number;
  duration_minutes: number;
  ai_analysis?: string;
  development_area: string;
  suggested_date: string;
  is_completed: boolean;
  child_rating?: number | null;
  parent_notes?: string | null;
}

const PrankDetails: React.FC<Props> = ({ navigation, route }) => {
  const { t } = useTranslation();
  const selectedChild = useSelector((state: RootState) => state.child.selectedChild);
  
  const { activityData, dayInfo } = route.params as {
    activityData: PrankActivity;
    dayInfo: { date: string; day_name: string; day_short: string };
  };

  // Parse JSON strings from API
  const parseJsonField = (field: string): string[] => {
    try {
      return JSON.parse(field) || [];
    } catch {
      return [];
    }
  };

  const materialsList = parseJsonField(activityData.materials_needed);
  const instructionsList = parseJsonField(activityData.instructions);
  const benefitsList = parseJsonField(activityData.benefits);

  const getDifficultyColor = (level: number) => {
    switch (level) {
      case 1: return COLORS.green;
      case 2: return COLORS.orange;
      case 3: return COLORS.red;
      default: return COLORS.grey;
    }
  };

  const getDifficultyText = (level: number) => {
    switch (level) {
      case 1: return 'Easy';
      case 2: return 'Medium';
      case 3: return 'Hard';
      default: return 'Unknown';
    }
  };

  return (
    <GradientBackground>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          
          <View style={styles.header}>
            <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
              <VectorIcon type="MaterialIcons" name="arrow-back-ios" size={22} color={COLORS.White} />
            </TouchableOpacity>
            <CustomText type="heading" fontFamily="semiBold" style={styles.headerTitle}>
              {selectedChild?.name} 
            </CustomText>
            <TouchableOpacity style={styles.backIcon} onPress={() => navigation.navigate('HomeScreen')}>
              <VectorIcon type="MaterialIcons" name="home" size={28} color={COLORS.White} />
            </TouchableOpacity>
          </View>

          <Spacer size={20} />
 
          <View style={styles.contentCard}> 
            <View style={{ alignItems: 'center', marginBottom: 20 }}>
              <CustomText type="subTitle" fontFamily="semiBold" style={{ color: COLORS.black }}>
                {dayInfo.day_name}, {new Date(dayInfo.date).toLocaleDateString()}
              </CustomText>
              <CustomText type="small" style={{ color: COLORS.grey, marginTop: 5 }}>
                {selectedChild?.name || 'Child'} - {activityData.age_months} months
              </CustomText>
            </View>
 
            <CustomText type="small" fontFamily="semiBold" style={{ 
              color: COLORS.black, 
              marginBottom: 15,
              textAlign: 'center'
            }}>
              {activityData.activity_title}
            </CustomText>

           
            <View style={{ 
              backgroundColor: 'rgba(147, 51, 234, 0.1)', 
              paddingHorizontal: 15, 
              paddingVertical: 8, 
              borderRadius: 20, 
              alignSelf: 'center',
              marginBottom: 20 
            }}>
              <CustomText type="subHeading" style={{ color: COLORS.purple, fontFamily: 'semiBold' }}>
                {activityData.development_area.charAt(0).toUpperCase() + activityData.development_area.slice(1)}
              </CustomText>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{
                  width: 12,
                  height: 12,
                  borderRadius: 6,
                  backgroundColor: getDifficultyColor(activityData.difficulty_level),
                  marginRight: 8
                }} />
                <CustomText type="small" style={{ color: COLORS.grey }}>
                  {getDifficultyText(activityData.difficulty_level)} • {activityData.duration_minutes} mins
                </CustomText>
              </View>
              <View style={{
                backgroundColor: activityData.is_completed ? 'rgba(34, 197, 94, 0.1)' : 'rgba(156, 163, 175, 0.1)',
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 20
              }}>
                <CustomText type="small" style={{ 
                  color: activityData.is_completed ? COLORS.green : COLORS.grey,
                  fontFamily: 'semiBold'
                }}>
                  {activityData.is_completed ? 'Completed' : 'Pending'}
                </CustomText>
              </View>
            </View>

            <Spacer size={20} />

            <CustomText type="small" style={{ color: COLORS.black, lineHeight: 22, marginBottom: 20 }}>
              {activityData.activity_description}
            </CustomText>
 
            {materialsList.length > 0 && (
              <>
                <CustomText type="subTitle" fontFamily="semiBold" style={{ color: COLORS.black, marginBottom: 12 }}>
                {t("materialsNeeded")}
                </CustomText>
                <View style={styles.sectionCard}>
                  {materialsList.map((material: string, index: number) => (
                    <View key={index} style={{ flexDirection: 'row', marginBottom: 8 }}>
                      <CustomText type="small" style={{ color: COLORS.purple, marginRight: 8 }}>•</CustomText>
                      <CustomText type="small" style={{ color: COLORS.black, flex: 1 }}>
                        {material}
                      </CustomText>
                    </View>
                  ))}
                </View>
                <Spacer size={20} />
              </>
            )}
 
            {instructionsList.length > 0 && (
              <>
                <CustomText type="subTitle" fontFamily="semiBold" style={{ color: COLORS.black, marginBottom: 12 }}>
                 {t("instructions")}
                </CustomText>
                <View style={styles.sectionCard}>
                  {instructionsList.map((instruction: string, index: number) => (
                    <View key={index} style={{ flexDirection: 'row', marginBottom: 10 }}>
                      <CustomText type="small" style={{ 
                        color: COLORS.blue, 
                        marginRight: 10, 
                        fontFamily: 'semiBold',
                        minWidth: 20
                      }}>
                        {index + 1}.
                      </CustomText>
                      <CustomText type="small" style={{ color: COLORS.black, flex: 1 }}>
                        {instruction}
                      </CustomText>
                    </View>
                  ))}
                </View>
                <Spacer size={20} />
              </>
            )}

            {/* Benefits */}
            {benefitsList.length > 0 && (
              <>
                <CustomText type="subTitle" fontFamily="semiBold" style={{ color: COLORS.green, marginBottom: 12 }}>
                  {t("benefits")}
                </CustomText>
                <View style={[styles.sectionCard, { backgroundColor: 'rgba(34, 197, 94, 0.05)' }]}>
                  {benefitsList.map((benefit: string, index: number) => (
                    <View key={index} style={{ flexDirection: 'row', marginBottom: 8 }}>
                      <CustomText type="small" style={{ color: COLORS.green, marginRight: 8 }}>✓</CustomText>
                      <CustomText type="small" style={{ color: COLORS.black }}>
                        {benefit}
                      </CustomText>
                    </View>
                  ))}
                </View>
                <Spacer size={20} />
              </>
            )}

            {/* Safety Notes */}
            {activityData.safety_notes && (
              <>
                <CustomText type="subTitle" fontFamily="semiBold" style={{ color: COLORS.red, marginBottom: 12 }}>
                  {t("safetyNotes")} ⚠️
                </CustomText>
                <View style={[styles.sectionCard, { backgroundColor: 'rgba(254, 226, 226, 0.9)' }]}>
                  <CustomText type="small" style={{ color: COLORS.red, lineHeight: 20 }}>
                    {activityData.safety_notes}
                  </CustomText>
                </View>
                <Spacer size={20} />
              </>
            )}
 
            {activityData.ai_analysis && (
              <>
                <CustomText type="subTitle" fontFamily="semiBold" style={{ color: COLORS.purple, marginBottom: 12 }}>
                  {t("ai_analysis")}
                </CustomText>
                <View style={[styles.sectionCard, { backgroundColor: 'rgba(168, 85, 247, 0.05)' }]}>
                  <CustomText type="small" style={{ 
                    color: COLORS.purple, 
                    lineHeight: 20, 
                    fontStyle: 'italic',
                    textAlign: 'center'
                  }}>
                    "{activityData.ai_analysis}"
                  </CustomText>
                </View>
              </>
            )}
          </View>
        </ScrollView>
      </View>
    </GradientBackground>
  );
};

export default PrankDetails;
