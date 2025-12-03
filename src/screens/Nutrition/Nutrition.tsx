import React, { useEffect, useState } from "react";
import { 
  View, 
  TouchableOpacity, 
  FlatList, 
  Image, 
  ActivityIndicator,
  StatusBar 
} from "react-native";
import { CustomText } from '../../components/CustomText';
import GradientBackground from "../../components/GradientBackground";
import COLORS from "../../utils/Colors";
import { RootStackParamList } from "../../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import axios from "axios";
import styles from "./style";
import ENDPOINTS, { API_URL } from "../../APIService/endPoints";
import IMAGES from "../../assets/images";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from "react-i18next";

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedChild } from '../../store/slice/childSlice';
import { RootState } from '../../store/store/Store';

type Props = NativeStackScreenProps<RootStackParamList, 'Nutrition'>;

type NutritionProduct = {
  id: number;
  name: string;
  image: string;
  status: string;
  created_at: string;
  updated_at: string;
};

const Nutrition: React.FC<Props> = ({ navigation }) => {
  const [children, setChildren] = useState<any[]>([]);
  const [nutritionProducts, setNutritionProducts] = useState<NutritionProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const { t } = useTranslation();

  // Redux
  const dispatch = useDispatch();
  const selectedChild = useSelector((state: RootState) => state.child.selectedChild);

  useEffect(() => {
    fetchUserData();
    fetchChildren();
    fetchNutritionProducts();
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

  const fetchChildren = async () => {
    try {
      const token = await AsyncStorage.getItem('Usertoken');
      if (!token) {
        console.log('No token found');
        return;
      }
      const response = await axios.get(
        `${API_URL}${ENDPOINTS.getchild}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      if (response.data.status && response.data.children.length > 0) {
        setChildren(response.data.children);
        // Set first child as default in the store
        dispatch(setSelectedChild(response.data.children[0]));
      } else {
        const defaultChildren = [
          { id: 1, name: "Daniel" },
          { id: 2, name: "Mister" },
          { id: 3, name: "Mister's" },
        ];
        setChildren(defaultChildren);
        dispatch(setSelectedChild(defaultChildren[0]));
      }
    } catch (err: any) {
      const defaultChildren = [
        { id: 1, name: "Daniel" },
        { id: 2, name: "Mister" },
        { id: 3, name: "Mister's" },
      ];
      setChildren(defaultChildren);
      dispatch(setSelectedChild(defaultChildren[0]));
    } finally {
      setLoading(false);
    }
  };

  const fetchNutritionProducts = async () => {
    try {
      setProductsLoading(true);
      const token = await AsyncStorage.getItem('Usertoken');
      if (!token) {
        console.log('No token found for nutrition products');
        return;
      }
      const response = await axios.get(
        `${API_URL}${ENDPOINTS.nutritionProduct}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      if (response.data.success) {
        setNutritionProducts(response.data.data);
      }
    } catch (err: any) {
      //
    } finally {
      setProductsLoading(false);
    }
  };

  const handleChildPress = (child: any) => {
    dispatch(setSelectedChild(child));
    navigation.navigate('Meals');
  };

  const renderChildItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[
        styles.childButton,
        selectedChild?.id === item.id && styles.childButtonActive
      ]}
      onPress={() => handleChildPress(item)}
    >
      <CustomText 
        style={[
          styles.childText,
          selectedChild?.id === item.id && styles.childTextActive
        ]}
      >
        {item.name}
      </CustomText>
    </TouchableOpacity>
  );
  const renderProductItem = ({ item }: { item: NutritionProduct }) => (
    <TouchableOpacity 
      style={styles.gridItem}
    >
      <View style={styles.productImageContainer}>
        <Image 
          source={{ uri: item.image }} 
          style={styles.productImage} 
          resizeMode="cover" 
          defaultSource={IMAGES.apple} 
        />
      </View>
      <View style={styles.productInfo}>
        <CustomText style={styles.productName} numberOfLines={2}>
          {item.name}
        </CustomText>
        <CustomText style={styles.productStatus}>
          {item.status}
        </CustomText>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <GradientBackground>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.blue} />
            <CustomText style={styles.loadingText}>
                {t("loading")}...
            </CustomText>
        </View>
      </GradientBackground>
    );
  }

  return (
    <GradientBackground>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.appLinear1} />
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.headerIcon} onPress={()=>navigation.goBack()}>
          <MaterialIcons name="arrow-back-ios" size={24} color={COLORS.White} />
        </TouchableOpacity>
        <CustomText type="heading" style={styles.headerText} >
           {userName}
        </CustomText>
        <TouchableOpacity style={styles.headerIcon} onPress={()=>navigation.navigate('HomeScreen')}>
          <MaterialIcons name="home" size={24} color={COLORS.White} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.childSection}>
        <CustomText style={styles.sectionTitle}>
          {t("selectChild")}
        </CustomText>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={children}
          keyExtractor={item => item.id.toString()}
          renderItem={renderChildItem}
          contentContainerStyle={styles.childListContent}
        />
      </View>
      <View style={styles.productsSection}>
        <CustomText style={styles.sectionTitle}>
         {t("nutritionProducts")}
        </CustomText>
        
        {productsLoading ? (
          <View style={styles.productsLoadingContainer}>
            <ActivityIndicator size="small" color={COLORS.blue} />
            <CustomText style={styles.productsLoadingText}>
              {t("loadingproducts...")}
            </CustomText>
          </View>
        ) : nutritionProducts.length > 0 ? (
          <FlatList
            data={nutritionProducts}
            numColumns={2}
            keyExtractor={item => item.id.toString()}
            columnWrapperStyle={styles.gridRow}
            renderItem={renderProductItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.gridContent}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <CustomText style={styles.emptyText}>
              {t("noproductsfound")}
            </CustomText>
            <TouchableOpacity 
              style={styles.retryButton}
              onPress={fetchNutritionProducts}
            >
              <CustomText style={styles.retryButtonText}>
                {t("retry")}
              </CustomText>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </GradientBackground>
  );
};

export default Nutrition;