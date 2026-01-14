import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, FlatList, ScrollView, Alert, ActivityIndicator, Modal, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './style';
import IMAGES from '../../assets/images';
import COLORS from '../../utils/Colors';
import { CustomText } from '../../components/CustomText';
import CustomInput from '../../components/CustomInput';
import { verticalScale, horizontalScale } from '../../utils/Metrics';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabParamList } from '../../types';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ENDPOINTS, { API_URL } from '../../APIService/endPoints';
import Toast from 'react-native-toast-message';
import { useTranslation } from 'react-i18next';
import DatePicker from 'react-native-date-picker';
import GenderModal from '../../components/GenderModal';
import VectorIcon from '../../components/VectorIcon';

// API Response Types
type ApiChildData = {
  id: number;
  name: string;
  dob: string;
  sex: string;
  allergies: string;
  weight: string;
  height: string | null;
  created_at: string;
};

type ApiResponse = {
  status: boolean;
  message: string;
  children: ApiChildData[];
  total_children: number;
};

// Local Child Data Type for List Tab
type ChildData = {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: string;
  allergies: string;
};

// Type for Add Child Tab
type AddChildData = {
  id: number;
  name: string;
  email: string;
  date: Date;
  sex: string;
  allergies: string;
  weight: string;
  weightUnit: string;
  height: string;
  heightUnit: string;
};

type Props = NativeStackScreenProps<BottomTabParamList, 'Child'>;

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

// Tab types
type TabType = 'list' | 'add';

const Children: React.FC<Props> = ({ navigation }) => {
  const [childrenData, setChildrenData] = useState<ChildData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editingChildId, setEditingChildId] = useState<string | null>(null);
  const [editedData, setEditedData] = useState<ChildData | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<TabType>('list');

  // States for Add Child Tab
  const [open, setOpen] = useState(false);
  const [activeChildIndex, setActiveChildIndex] = useState<number | null>(null);
  const [showGenderModal, setShowGenderModal] = useState(false);
  const [genderModalIndex, setGenderModalIndex] = useState<number | null>(null);
  const [showAllergyModal, setShowAllergyModal] = useState(false);
  const [allergyModalIndex, setAllergyModalIndex] = useState<number | null>(null);
  const [allergiesList, setAllergiesList] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingAllergies, setLoadingAllergies] = useState(false);

  const { t } = useTranslation();

  // Initial data for Add Child Tab
  const [addChildren, setAddChildren] = useState<AddChildData[]>([
    {
      id: 1,
      name: '',
      email: '',
      date: new Date(),
      sex: 'Male',
      allergies: 'None',
      weight: '',
      weightUnit: 'kg',
      height: '',
      heightUnit: 'cm',
    },
  ]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDataString = await AsyncStorage.getItem('userData');
        if (userDataString) {
          const user = JSON.parse(userDataString);
          setUserData(user);
          console.log('Stored user data:', user);
        }
      } catch (e) {
        console.error('Failed to load user data', e);
      }
    };

    fetchUserData();
  }, []);

  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    } catch (error) {
      return dateString;
    }
  };

  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use(
      async (config) => {
        const token = await AsyncStorage.getItem('Usertoken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          await AsyncStorage.removeItem('Usertoken');
          await AsyncStorage.removeItem('userData');
          Alert.alert('Session Expired', 'Please login again');
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  const fetchChildrenData = async () => {
    try {
      setLoading(true);
      
      const fullUrl = `${API_URL}${ENDPOINTS.getchild}`;
      console.log('Full URL:', fullUrl);
      
      const response = await api.get(ENDPOINTS.getchild); 
      
      console.log('API Response:', response.data);
      
      if (response.data.status) {
        const transformedData: ChildData[] = response.data.children.map((child: ApiChildData) => ({
          id: child.id.toString(),
          name: child.name,
          dateOfBirth: formatDate(child.dob),
          gender: child.sex,
          allergies: child.allergies || 'No'
        }));
        
        setChildrenData(transformedData);
        console.log('Transformed children data:', transformedData);
      } else {
        Toast.show({
          type: 'error',
          text1: t("errorTitle"),
          text2: response.data.message || t("noChilddata")
        });
        setChildrenData([]);
      }
    } catch (error: any) {
      console.error('API Error Details:', error);
      
      if (error.response) {
        console.log('Error Response:', error.response);
        console.log('Error Status:', error.response.status);
        console.log('Error Data:', error.response.data);
        
        Toast.show({
          type: 'error',
          text1: 'Endpoint Not Found',
          text2: 'Please check the API endpoint configuration'
        });
      } else if (error.request) {
        Toast.show({
          type: 'error',
          text1: 'Network Error',
          text2: 'Please check your internet connection'
        });
      } else {
        Toast.show({
          type: 'error',
          text1: t("errorTitle"),
          text2: t("failtoload")
        });
      }
      
      setChildrenData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChildrenData();
  }, []);

  // Functions for List Tab
  const handleEditChild = (child: ChildData) => {
    setEditingChildId(child.id);
    setEditedData({ ...child });
  };

  const handleSaveChild = (childId: string) => {
    if (editedData) {
      setChildrenData(prevData => 
        prevData.map(child => 
          child.id === childId ? editedData : child
        )
      );
    }
    setEditingChildId(null);
    setEditedData(null);
  };

  const handleCancelEdit = () => {
    setEditingChildId(null);
    setEditedData(null);
  };

  const handleInputChange = (field: keyof ChildData, value: string) => {
    if (editedData) {
      setEditedData(prev => prev ? { ...prev, [field]: value } : null);
    }
  };

  const handleUpdateAll = async () => {
    try {
      console.log('Update all children data:', childrenData);
      
      setEditingChildId(null);
      setEditedData(null);
      
      Toast.show({
        type: 'success',
        text1: t("successTitle"),
        text2: t("childDataupdated")
      });
    } catch (error: any) {
      console.error('Update Error:', error);
      Toast.show({
        type: 'error',
        text1: t("errorTitle"),
        text2: t("failchildDataupdated")
      });
    }
  };

  // Functions for Add Child Tab
  const fetchAllergies = async () => {
    try {
      setLoadingAllergies(true);
      const token = await AsyncStorage.getItem('Usertoken');
      const response = await axios.get(
        `${API_URL}${ENDPOINTS.Allergies}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.status) {
        const names = response.data.data.map((item: any) => item.name);
        setAllergiesList(['None', ...names]);
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: t("errorTitle"),
        text2: t('failload'),
      });
    } finally {
      setLoadingAllergies(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'add') {
      fetchAllergies();
    }
  }, [activeTab]);

  type AddChildField = 'name' | 'email';

  const handleAddChildInputChange = (
    index: number,
    fieldName: AddChildField,
    value: string
  ) => {
    setAddChildren(prev => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [fieldName]: value,
      };
      return updated;
    });
  };

  const handleDateChange = (index: number, selectedDate: Date) => {
    setAddChildren(prev => {
      const updated = [...prev];
      updated[index].date = selectedDate;
      return updated;
    });
  };

  const addMoreChild = () => {
    if (addChildren.length >= 6) {
      if (Platform.OS === 'android') {
        Toast.show({
          type: 'error',
          text1: t("errorTitle"),
          text2: t("childAdd"),
        });
      } else {
           Toast.show({
          type: 'error',
          text1: t("errorTitle"),
          text2: t("childAdd"),
        });
         
      }
      return;
    }
    const newId = addChildren.length + 1;
    setAddChildren(prev => [
      ...prev,
      {
        id: newId,
        name: '',
        email: '',
        date: new Date(),
        sex: 'Male',
        allergies: 'None',
        weight: '',
        weightUnit: 'kg',
        height: '',
        heightUnit: 'cm',
      },
    ]);
  };

  const removeAddChild = (id: number) => {
    setAddChildren(prev => prev.filter(child => child.id !== id));
  };

  const handleRegisterChildren = async () => {
    setIsSubmitting(true);
    const formData = new FormData();

    addChildren.forEach(child => {
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
    
    console.log("send data in api", formData);
    
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
          text1: t("successTitle"),
          text2: response.data.message,
        });
        
        
        setAddChildren([{
          id: 1,
          name: '',
          email: '',
          date: new Date(),
          sex: 'Male',
          allergies: 'None',
          weight: '',
          weightUnit: 'kg',
          height: '',
          heightUnit: 'cm',
        }]);
         
        setActiveTab('list');
        fetchChildrenData();
      }
    } catch (error: any) {
      console.log(error.response?.data);
      Toast.show({
        type: 'error',
        text1: t("errorTitle"),
        text2: t("registerFail"),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderChildCard = (child: ChildData, index: number) => (
    <View key={child.id} style={styles.childCard}>
      <View style={styles.cardHeader}>
        <CustomText
          type="subHeading"
          fontWeight="600"
          color={COLORS.black}
        >
          {child.name}
        </CustomText>
        {editingChildId === child.id ? (
          <View style={styles.editActions}>
            <TouchableOpacity 
              style={styles.saveButton}
              onPress={() => handleSaveChild(child.id)}
            >
              <MaterialIcons name="check" size={20} color={COLORS.blue} />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={handleCancelEdit}
            >
              <MaterialIcons name="close" size={20} color={COLORS.red} />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => handleEditChild(child)}
          >
            <MaterialIcons name="edit" size={20} color={COLORS.blue} />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.dataSection}>
        <View style={styles.fieldContainer}>
          <CustomText type="small" fontWeight="500" color={COLORS.darkgrey} style={styles.label}>
            {t("name")}
          </CustomText>
          {editingChildId === child.id ? (
            <CustomInput
              value={editedData?.name || ''}
              onChangeText={(value) => handleInputChange('name', value)}
              placeholder={t("enterName")}
              style={styles.inputContainer}
            />
          ) : (
            <CustomText type="small" fontWeight="600" color={COLORS.black} style={styles.value}>
              {child.name}
            </CustomText>
          )}
        </View>

        <View style={styles.rowContainer}>
          <View style={styles.halfField}>
            <CustomText type="small" fontWeight="500" color={COLORS.darkgrey} style={styles.label}>
              {t("dob")}
            </CustomText>
            {editingChildId === child.id ? (
              <CustomInput
                value={editedData?.dateOfBirth || ''}
                onChangeText={(value) => handleInputChange('dateOfBirth', value)}
                placeholder="DD/MM/YYYY"
                style={styles.inputContainer}
              />
            ) : (
              <CustomText type="small" fontWeight="600" color={COLORS.black} style={styles.value}>
                {child.dateOfBirth}
              </CustomText>
            )}
          </View>

          <View style={styles.halfField}>
            <CustomText type="small" fontWeight="500" color={COLORS.darkgrey} style={styles.label}>
              {t("sex")}
            </CustomText>
            {editingChildId === child.id ? (
              <CustomInput
                value={editedData?.gender || ''}
                onChangeText={(value) => handleInputChange('gender', value)}
                placeholder={t("gender")}
                style={styles.inputContainer}
              />
            ) : (
              <CustomText type="small" fontWeight="600" color={COLORS.black} style={styles.value}>
                {child.gender}
              </CustomText>
            )}
          </View>
        </View>
 
        <View style={styles.fieldContainer}>
          <CustomText type="small" fontWeight="500" color={COLORS.darkgrey} style={styles.label}>
            {t("allergies")}
          </CustomText>
          {editingChildId === child.id ? (
            <CustomInput
              value={editedData?.allergies || ''}
              onChangeText={(value) => handleInputChange('allergies', value)}
              placeholder={t("allergies")}
              style={styles.inputContainer}
            />
          ) : (
            <CustomText type="small" fontWeight="600" color={COLORS.black} style={styles.value}>
              {child.allergies}
            </CustomText>
          )}
        </View>
      </View>
    </View>
  );

   
  const renderAddChildTab = () => (
    <ScrollView 
      style={styles.addChildScrollView}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.addChildScrollContent}
    >
      {addChildren.map((child, index) => (
        <View key={child.id} style={styles.addChildCard}>
          <View style={styles.deleteview}>
            <CustomText
              type="subTitle"
              fontWeight="bold"
              style={[styles.childNumberText, { textAlign: 'left' }]}
            >
              {t('child')} {index + 1}
            </CustomText>
            {addChildren.length > 1 && (
              <TouchableOpacity onPress={() => removeAddChild(child.id)}>
                <VectorIcon
                  type="MaterialIcons"
                  name="remove-circle"
                  size={24}
                  color={COLORS.red}
                />
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.addChildForm}>
            <CustomInput
              label={t('name')}
              placeholder="Name"
              onChangeText={value => handleAddChildInputChange(index, 'name', value)}
              value={child.name}
              style={styles.addChildInput}
            />

            <View style={styles.genderAllergyRow}>
              <View style={styles.genderContainer}>
                <CustomText type="small">{t('gender')}</CustomText>
                <TouchableOpacity
                  style={styles.selectionButton}
                  onPress={() => {
                    setGenderModalIndex(index);
                    setShowGenderModal(true);
                  }}
                  activeOpacity={0.5}
                >
                  <CustomText color={COLORS.black} type="small">
                    {child.sex || t("genderselect")}
                  </CustomText>
                </TouchableOpacity>
              </View>

              <View style={styles.allergyContainer}>
                <CustomText type="small">{t('allergies')}</CustomText>
                <TouchableOpacity
                  style={styles.selectionButton}
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
            >
              {t('dob')}
            </CustomText>

            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => {
                setActiveChildIndex(index);
                setOpen(true);
              }}
            >
              <CustomText
                type="small"
                color={COLORS.black}
                fontWeight={'500'}
              >
                {child.date
                  ? child.date.toLocaleDateString()
                  : t('dob')}
              </CustomText>
              <VectorIcon
                type="MaterialIcons"
                name="date-range"
                size={20}
                color={COLORS.darkgrey}
              />
            </TouchableOpacity>

            <View style={styles.weightHeightRow}>
              <View style={styles.weightContainer}>
                <CustomInput
                  label={t('weight')}
                  placeholder="Weight"
                  keyboardType="numeric"
                  onChangeText={value => {
                    const updated = [...addChildren];
                    updated[index].weight = value;
                    setAddChildren(updated);
                  }}
                  value={child.weight}
                  style={styles.smallInput}
                />
              </View>
              <View style={styles.unitContainer}>
                <CustomInput
                  disabled
                  label={t("unit")}
                  placeholder="Unit"
                  value={child.weightUnit}
                  style={styles.unitInput}
                  onChangeText={()=>('')}
                />
              </View>
              <View style={styles.heightContainer}>
                <CustomInput
                  label={t('height')}
                  placeholder="Height"
                  keyboardType="numeric"
                  onChangeText={value => {
                    const updated = [...addChildren];
                    updated[index].height = value;
                    setAddChildren(updated);
                  }}
                  value={child.height}
                  style={styles.smallInput}
                />
              </View>
              <View style={styles.unitContainer}>
                <CustomInput
                  disabled
                  label={t("unit")}
                  placeholder="Unit"
                  value={child.heightUnit}
                  style={styles.unitInput}
                  onChangeText={()=>('')}
                />
              </View>
            </View>
          </View>
        </View>
      ))}

      <TouchableOpacity 
        style={styles.addMoreButton}
        onPress={addMoreChild}
      >
        <CustomText
          type="small"
          color={COLORS.blue}
          style={{ textAlign: 'center' }}
        >
          {t('addmoreChild')}
        </CustomText>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.registerButton}
        onPress={handleRegisterChildren}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <ActivityIndicator size="small" color={COLORS.White} />
        ) : (
          <CustomText
            type="title"
            fontWeight="700"
            color={COLORS.White}
          >
            {t('registerChildren')}
          </CustomText>
        )}
      </TouchableOpacity>

      {/* Date Picker Modal */}
      <DatePicker
        modal
        mode="date"
        open={open}
        date={
          activeChildIndex !== null
            ? addChildren[activeChildIndex].date
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

      {/* Gender Modal */}
      <GenderModal
        visible={showGenderModal}
        selectedGender={
          genderModalIndex !== null ? addChildren[genderModalIndex].sex : ''
        }
        onSelect={(selected: string) => {
          if (genderModalIndex !== null) {
            const updated = [...addChildren];
            updated[genderModalIndex].sex = selected;
            setAddChildren(updated);
            setShowGenderModal(false);
            setGenderModalIndex(null);
          }
        }}
        onCancel={() => {
          setShowGenderModal(false);
          setGenderModalIndex(null);
        }}
      />

      {/* Allergy Modal */}
      <Modal
        transparent
        visible={showAllergyModal}
        animationType="slide"
        onRequestClose={() => setShowAllergyModal(false)}
      >
        <View style={styles.allergyModalOverlay}>
          <View style={styles.allergyModalContent}>
            <CustomText
              type="subHeading"
              style={{ textAlign: 'center', marginBottom: 10 }}
            >
              {t("selectAllergy")}
            </CustomText>

            {loadingAllergies ? (
              <ActivityIndicator size="large" color={COLORS.black} />
            ) : (
              <FlatList
                data={allergiesList}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.allergyItem}
                    onPress={() => {
                      if (allergyModalIndex !== null) {
                        const updated = [...addChildren];
                        updated[allergyModalIndex].allergies = item;
                        setAddChildren(updated);
                        setShowAllergyModal(false);
                        setAllergyModalIndex(null);
                      }
                    }}
                  >
                    <CustomText 
                      type="small" 
                      color={item === 'None' ? COLORS.grey : COLORS.black}
                      fontWeight={item === 'None' ? 'bold' : 'normal'}
                    >
                      {item}
                    </CustomText>
                  </TouchableOpacity>
                )}
              />
            )}

            <TouchableOpacity
              style={styles.cancelAllergyButton}
              onPress={() => setShowAllergyModal(false)}
            >
              <CustomText color={COLORS.red}>{t("cancel")}</CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );

  // Render Child List Tab Content
  const renderChildListTab = () => (
    <>
      {childrenData.map((child, index) => renderChildCard(child, index))}
      
      {childrenData.length > 0 && (
        <TouchableOpacity style={styles.updateButton} onPress={handleUpdateAll}>
          <CustomText
            type="title"
            fontWeight="700"
            color={COLORS.White}
          >
            {t("update")}
          </CustomText>
        </TouchableOpacity>
      )}

      {childrenData.length === 0 && (
        <View style={styles.emptyState}>
          <CustomText
            type="subHeading"
            fontWeight="500"
            color={COLORS.darkgrey}
            style={styles.emptyText}
          >
            {t("noChild")}
          </CustomText>
          <TouchableOpacity 
            style={styles.refreshButton}
            onPress={fetchChildrenData}
          >
            <CustomText
              type="small"
              fontWeight="600"  
              color={COLORS.black}
            >
              {t("refresh")}
            </CustomText>
          </TouchableOpacity>
        </View>
      )}
    </>
  );

  if (loading && activeTab === 'list') {
    return (
      <LinearGradient
        colors={[COLORS.appLinear1, COLORS.appLinear2]}
        style={styles.linearContainer}
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.blue} />
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={[COLORS.appLinear1, COLORS.appLinear2]}
      style={styles.linearContainer}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <CustomText
            type="heading"
            fontWeight="800"
            color={COLORS.black}
            style={styles.headerTitle}
          >
            {userData?.username}
          </CustomText>
          <CustomText
            type="subHeading"
            fontWeight="600"
            color={COLORS.black}
            style={styles.subTitle}
          >
            {activeTab === 'list' ? t("changeChildData") : t("addNewChild")}
          </CustomText>
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[
              styles.tabButton, 
              activeTab === 'list' && styles.activeTabButton
            ]}
            onPress={() => setActiveTab('list')}
          >
            <CustomText
              type="title"
              fontWeight="700"
              color={activeTab === 'list' ? COLORS.White : COLORS.black}
            >
              {t("childList")}
            </CustomText>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.tabButton, 
              activeTab === 'add' && styles.activeTabButton
            ]}
            onPress={() => setActiveTab('add')}
          >
            <CustomText
              type="title"
              fontWeight="700"
              color={activeTab === 'add' ? COLORS.White : COLORS.black}
            >
              {t("addChild")}
            </CustomText>
          </TouchableOpacity>
        </View>

        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollContent,
            activeTab === 'add' && styles.addTabScrollContent
          ]}
        >
          {activeTab === 'list' ? renderChildListTab() : renderAddChildTab()}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Children;