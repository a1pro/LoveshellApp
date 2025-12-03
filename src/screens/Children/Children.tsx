import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, FlatList, ScrollView, Alert, ActivityIndicator } from 'react-native';
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

// Local Child Data Type
type ChildData = {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: string;
  allergies: string;
};

type Props = NativeStackScreenProps<BottomTabParamList, 'Child'>;
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

const Children: React.FC<Props> = ({ navigation }) => {
  const [childrenData, setChildrenData] = useState<ChildData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editingChildId, setEditingChildId] = useState<string | null>(null);
  const [editedData, setEditedData] = useState<ChildData | null>(null);
  const [userData, setUserData] = useState<any>(null);
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
          // You might want to navigate to login screen here
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
        text1: 'Error',
        text2: response.data.message || 'No children data found'
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
        text1: 'Error',
        text2: 'Failed to load children data'
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
        text1: 'Success',
        text2: 'Children data updated successfully!'
      });
    } catch (error: any) {
      console.error('Update Error:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to update children data'
      });
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
        {/* Name Field */}
        <View style={styles.fieldContainer}>
          <CustomText type="small" fontWeight="500" color={COLORS.darkgrey} style={styles.label}>
            Name
          </CustomText>
          {editingChildId === child.id ? (
            <CustomInput
              value={editedData?.name || ''}
              onChangeText={(value) => handleInputChange('name', value)}
              placeholder="Enter name"
              style={styles.inputContainer}
            />
          ) : (
            <CustomText type="small" fontWeight="600" color={COLORS.black} style={styles.value}>
              {child.name}
            </CustomText>
          )}
        </View>

        {/* Date of Birth and Gender Row */}
        <View style={styles.rowContainer}>
          {/* Date of Birth */}
          <View style={styles.halfField}>
            <CustomText type="small" fontWeight="500" color={COLORS.darkgrey} style={styles.label}>
              Date of Birth
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

          {/* Gender */}
          <View style={styles.halfField}>
            <CustomText type="small" fontWeight="500" color={COLORS.darkgrey} style={styles.label}>
              Sex
            </CustomText>
            {editingChildId === child.id ? (
              <CustomInput
                value={editedData?.gender || ''}
                onChangeText={(value) => handleInputChange('gender', value)}
                placeholder="Gender"
                style={styles.inputContainer}
              />
            ) : (
              <CustomText type="small" fontWeight="600" color={COLORS.black} style={styles.value}>
                {child.gender}
              </CustomText>
            )}
          </View>
        </View>

        {/* Allergies */}
        <View style={styles.fieldContainer}>
          <CustomText type="small" fontWeight="500" color={COLORS.darkgrey} style={styles.label}>
            Allergies
          </CustomText>
          {editingChildId === child.id ? (
            <CustomInput
              value={editedData?.allergies || ''}
              onChangeText={(value) => handleInputChange('allergies', value)}
              placeholder="Allergies"
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

  if (loading) {
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
        {/* Header */}
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
            Change Children's Data
          </CustomText>
        </View>

        {/* Children List */}
        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {childrenData.map((child, index) => renderChildCard(child, index))}
          
          {/* Update Button */}
          {childrenData.length > 0 && (
            <TouchableOpacity style={styles.updateButton} onPress={handleUpdateAll}>
              <CustomText
                type="title"
                fontWeight="700"
                color={COLORS.White}
              >
                Update
              </CustomText>
            </TouchableOpacity>
          )}

          {/* Empty State */}
          {childrenData.length === 0 && (
            <View style={styles.emptyState}>
              <CustomText
                type="subHeading"
                fontWeight="500"
                color={COLORS.darkgrey}
                style={styles.emptyText}
              >
                No children data available
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
                  Refresh
                </CustomText>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Children;