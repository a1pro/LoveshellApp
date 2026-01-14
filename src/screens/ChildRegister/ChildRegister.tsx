import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import styles from './style';
import GradientBackground from '../../components/GradientBackground';
import {
  Alert,
  Platform,
  TouchableOpacity,
  View,
  FlatList,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomText } from '../../components/CustomText';
import Spacer from '../../components/Spacer';
import CustomInput from '../../components/CustomInput';
import COLORS from '../../utils/Colors';
import CustomButton from '../../components/CustomButton';
import { KeyboardAvoidingContainer } from '../../components/KeyboardAvoidingComponent';
import VectorIcon from '../../components/VectorIcon';
import DatePicker from 'react-native-date-picker';
import Toast from 'react-native-toast-message';
import GenderModal from '../../components/GenderModal';
import { useTranslation } from 'react-i18next';
import ENDPOINTS, { API_URL } from '../../APIService/endPoints';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = NativeStackScreenProps<RootStackParamList, 'ChildRegister'>;

const ChildRegister: React.FC<Props> = ({ navigation }) => {
  const [open, setOpen] = useState(false);
  const [activeChildIndex, setActiveChildIndex] = useState<number | null>(null);
  const [showGenderModal, setShowGenderModal] = useState(false);
  const [genderModalIndex, setGenderModalIndex] = useState<number | null>(null);

  const [showAllergyModal, setShowAllergyModal] = useState(false);
  const [allergyModalIndex, setAllergyModalIndex] = useState<number | null>(null);
  const [allergiesList, setAllergiesList] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const [children, setChildren] = useState([
    {
      id: 1,
      name: '',
      email: '',
      date: new Date(),
      sex: 'Male',
      allergies: 'None', // Changed default to 'None'
      weight: '',
      weightUnit: 'kg',
      height: '',
      heightUnit: 'cm',
    },
  ]);

  type ChildField = 'name' | 'email';

  const handleInputChange = (
    index: number,
    fieldName: ChildField,
    value: string
  ) => {
    setChildren(prev => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [fieldName]: value,
      };
      return updated;
    });
  };

  const handleDateChange = (index: number, selectedDate: Date) => {
    setChildren(prev => {
      const updated = [...prev];
      updated[index].date = selectedDate;
      return updated;
    });
  };

  const addChild = () => {
    if (children.length >= 6) {
      if (Platform.OS === 'android') {
        Toast.show({
          type: 'error',
          text1:t("errorTitle"),
          text2: t("childAdd"),
        });
      } else {
        Alert.alert('You can add only 6 child');
      }
      return;
    }
    const newId = children.length + 1;
    setChildren(prev => [
      ...prev,
      {
        id: newId,
        name: '',
        email: '',
        date: new Date(),
        sex: 'Male',
        allergies: 'None', // Changed default to 'None'
        weight: '',
        weightUnit: 'kg',
        height: '',
        heightUnit: 'cm',
      },
    ]);
  };

  const removeChild = (id: number) => {
    setChildren(prev => prev.filter(child => child.id !== id));
  };

  const fetchAllergies = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${API_URL}${ENDPOINTS.Allergies}`
      );
      if (response.data.status) {
        const names = response.data.data.map((item: any) => item.name);
        setAllergiesList(['None', ...names]);
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1:t("errorTitle"),
        text2: t('failload'),
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllergies();
  }, []);

  const handleRegisterChildren = async () => {
    setLoading(true);
    const formData = new FormData();

    children.forEach(child => {
      formData.append('name[]', child.name);
      formData.append('dob[]', child.date.toISOString().split('T')[0]);
      formData.append('sex[]', child.sex);
    
      if (child.allergies === 'None') {
        formData.append('allergies[]', '');
      } else {
        formData.append('allergies[]', child.allergies);
      }
      
      formData.append('weight[]', child.weight);
      formData.append('height[]', child.height);
    });
    console.log("send data in api",formData)
    try {
      const token = await AsyncStorage.getItem('Usertoken'); 
      const response = await axios.post(
        `${API_URL}${ENDPOINTS.childRegister}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data.message) {
        console.log("data", response.data);
        Toast.show({
          type: 'success',
          text1:t("successTitle"),
          text2: response.data.message,
        });
        navigation.navigate('HomeScreen');
      }
    } catch (error: any) {
      console.log(error.response?.data);
      Toast.show({
        type: 'error',
        text1:t("errorTitle"),
        text2: t("registerFail"),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <GradientBackground>
      <KeyboardAvoidingContainer>
        <SafeAreaView style={styles.container}>
          <Spacer />
          <VectorIcon
            type="MaterialIcons"
            name="arrow-back"
            onPress={() => navigation.goBack()}
          />
          <CustomText type="subHeading" fontFamily="bold" style={styles.txt}>
            {t('childRegister')}
          </CustomText>

          {children.map((child, index) => (
            <View key={child.id} style={styles.viewCon}>
              <View style={styles.deleteview}>
                <CustomText
                  type="subTitle"
                  fontFamily="bold"
                  style={[styles.txt, { textAlign: 'left' }]}
                >
                  {t('child')} {index + 1}
                </CustomText>
                {children.length > 1 && (
                  <TouchableOpacity onPress={() => removeChild(child.id)}>
                    <VectorIcon
                      type="MaterialIcons"
                      name="remove-circle"
                      size={24}
                      color={COLORS.red}
                    />
                  </TouchableOpacity>
                )}
              </View>

              <Spacer />

              <View style={{ gap: 10 }}>
                <CustomInput
                  label={t('name')}
                  placeholder="Name"
                  onChangeText={value => handleInputChange(index, 'name', value)}
                  value={child.name}
                />

                <View
                  style={{
                    flexDirection: 'row',
                    gap: 10,
                    alignItems: 'center',
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <CustomText type="small">{t('gender')}</CustomText>
                    <TouchableOpacity
                      style={{
                        borderWidth: 1,
                        borderColor: COLORS.inputBorder,
                        borderRadius: 16,
                        padding: 16,
                        backgroundColor: COLORS.White,
                      }}
                      onPress={() => {
                        setGenderModalIndex(index);
                        setShowGenderModal(true);
                      }}
                      activeOpacity={0.5}
                    >
                      <CustomText color={COLORS.black} type="small">
                        {child.sex ||t("genderselect")}
                      </CustomText>
                    </TouchableOpacity>
                  </View>

                  <View style={{ flex: 1 }}>
                    <CustomText type="small">{t('allergies')}</CustomText>
                    <TouchableOpacity
                      style={{
                        borderWidth: 1,
                        borderColor: COLORS.inputBorder,
                        borderRadius: 16,
                        padding: 16,
                        backgroundColor: COLORS.White,
                      }}
                      onPress={() => {
                        setAllergyModalIndex(index);
                        setShowAllergyModal(true);
                      }}
                      activeOpacity={0.5}
                    >
                      <CustomText color={COLORS.black} type="small">
                        {child.allergies}
                      </CustomText>
                    </TouchableOpacity>
                  </View>
                </View>

                <CustomText
                  type="small"
                  color={COLORS.black}
                  fontWeight={'500'}
                  fontFamily="light"
                >
                  {t('dob')}
                </CustomText>

                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => {
                    setActiveChildIndex(index);
                    setOpen(true);
                  }}
                >
                  <CustomText
                    type="small"
                    color={COLORS.black}
                    fontWeight={'500'}
                    fontFamily="light"
                  >
                    {child.date
                      ? child.date.toLocaleDateString()
                      : t('dob')}
                  </CustomText>
                  <VectorIcon
                    type="MaterialIcons"
                    name="date-range"
                    size={20}
                    color={COLORS.shottxt}
                  />
                </TouchableOpacity>

                <View
                  style={{
                    flexDirection: 'row',
                    gap: 10,
                    alignItems: 'center',
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <CustomInput
                      label={t('weight')}
                      placeholder="W"
                      keyboardType="numeric"
                      onChangeText={value => {
                        const updated = [...children];
                        updated[index].weight = value;
                        setChildren(updated);
                      }}
                      value={child.weight}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <CustomInput
                      disabled
                      label={t("unit")}
                      placeholder="U"
                      value={child.weightUnit}
                      onChangeText={function (text: string): void {
                        throw new Error('Function not implemented.');
                      }}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <CustomInput
                      label={t('height')}
                      placeholder="H"
                      keyboardType="numeric"
                      onChangeText={value => {
                        const updated = [...children];
                        updated[index].height = value;
                        setChildren(updated);
                      }}
                      value={child.height}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <CustomInput
                      disabled
                      label={t("unit")}
                      placeholder="U"
                      value={child.heightUnit}
                      onChangeText={function (text: string): void {
                        throw new Error('Function not implemented.');
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>
          ))}

          <Spacer size={20} />

          <CustomButton
            onPress={() => {
              handleRegisterChildren();
            }}
            isLoading={loading}
            title={t('continue')}
          />
          <Spacer size={10} />

          <CustomText
            onPress={addChild}
            type="small"
            color={COLORS.black}
            style={{ textAlign: 'center' }}
          >
            {t('addmoreChild')}
          </CustomText>
          <Spacer size={20} />

          <DatePicker
            modal
            mode="date"
            open={open}
            date={
              activeChildIndex !== null
                ? children[activeChildIndex].date
                : new Date()
            }
            onConfirm={date => {
              if (activeChildIndex !== null)
                handleDateChange(activeChildIndex, date);
              setOpen(false);
              setActiveChildIndex(null);
            }}
            onCancel={() => {
              setOpen(false);
              setActiveChildIndex(null);
            }}
          />

          <GenderModal
            visible={showGenderModal}
            selectedGender={
              genderModalIndex !== null ? children[genderModalIndex].sex : ''
            }
            onSelect={(selected: string) => {
              if (genderModalIndex !== null) {
                const updated = [...children];
                updated[genderModalIndex].sex = selected;
                setChildren(updated);
                setShowGenderModal(false);
                setGenderModalIndex(null);
              }
            }}
            onCancel={() => {
              setShowGenderModal(false);
              setGenderModalIndex(null);
            }}
          />

          <Modal
            transparent
            visible={showAllergyModal}
            animationType="slide"
            onRequestClose={() => setShowAllergyModal(false)}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: 'rgba(0,0,0,0.5)',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 20,
              }}
            >
              <View
                style={{
                  backgroundColor: COLORS.White,
                  borderRadius: 16,
                  padding: 20,
                  width: '100%',
                  maxHeight: '70%',
                }}
              >
                <CustomText
                  type="subHeading"
                  style={{ textAlign: 'center', marginBottom: 10 }}
                >
                  {t("selectAllergy")}
                </CustomText>

                {loading ? (
                  <ActivityIndicator size="large" color={COLORS.black} />
                ) : (
                  <FlatList
                    data={allergiesList}
                    keyExtractor={item => item}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={{
                          padding: 14,
                          borderBottomWidth: 1,
                          borderColor: COLORS.inputBorder,
                        }}
                        onPress={() => {
                          if (allergyModalIndex !== null) {
                            const updated = [...children];
                            updated[allergyModalIndex].allergies = item;
                            setChildren(updated);
                            setShowAllergyModal(false);
                            setAllergyModalIndex(null);
                          }
                        }}
                      >
                        <CustomText 
                          type="small" 
                          color={item === 'None' ? COLORS.grey : COLORS.black}
                          fontFamily={item === 'None' ? 'bold' : 'regular'}
                        >
                          {item}
                        </CustomText>
                      </TouchableOpacity>
                    )}
                  />
                )}

                <TouchableOpacity
                  style={{
                    marginTop: 10,
                    alignSelf: 'center',
                    padding: 10,
                  }}
                  onPress={() => setShowAllergyModal(false)}
                >
                  <CustomText color={COLORS.red}>{t("cancel")}</CustomText>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </SafeAreaView>
      </KeyboardAvoidingContainer>
    </GradientBackground>
  );
};

export default ChildRegister;