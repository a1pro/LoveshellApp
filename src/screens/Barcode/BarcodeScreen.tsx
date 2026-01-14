import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  Image,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";
import { Camera, CameraType } from "react-native-camera-kit"; 
import axios from "axios";
import GradientBackground from "../../components/GradientBackground";
import { KeyboardAvoidingContainer } from "../../components/KeyboardAvoidingComponent";
import Spacer from "../../components/Spacer";
import VectorIcon from "../../components/VectorIcon";
import { CustomText } from "../../components/CustomText";
import CustomInput from "../../components/CustomInput"; 
import COLORS from "../../utils/Colors";
import styles from "./style";
import { RootStackParamList } from "../../types";
import CustomButton from "../../components/CustomButton";
import { verticalScale } from "../../utils/Metrics";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store/Store";
import ENDPOINTS, { API_URL } from "../../APIService/endPoints";
import Toast from "react-native-toast-message";

type Props = NativeStackScreenProps<RootStackParamList, "BarcodeScreen">;

interface ManualAnalysisData {
  id: number;
  food_description: string;
  quantity: number;
  unit: string;
  analysis: {
    rating: string;
    score: number;
    benefits: string;
    concerns: string;
    recommendation: string;
    age_appropriate: string;
    analysis_timestamp: string;
    is_fallback: boolean;
  };
  added_at: string;
}

interface BarcodeProductInfo {
  name: string;
  brand: string;
  description: string;
  image_url: string;
  nutriscore: string | null;
  categories: string;
  ingredients: string[];
  allergens: string;
  default_serving: string;
}

interface BarcodeAnalysisData {
  id: number;
  barcode: string;
  product_info: BarcodeProductInfo;
  nutrition_facts: any;
  child_analysis: {
    rating: string;
    score: number;
    benefits: string;
    concerns: string;
    recommendation: string;
    age_appropriate: string;
    allergen_check: string;
    feeding_tips: string;
    analysis_timestamp: string;
    is_fallback: boolean;
  };
  added_at: string;
}

interface SearchInfo {
  today_searches: number;
  remaining_searches: number;
  daily_limit: number;
}

const BarcodeScreen: React.FC<Props> = ({ navigation }) => {
  const selectedChild = useSelector(
    (state: RootState) => state.child.selectedChild
  );
  const [userName, setUserName] = useState("");
  const { t } = useTranslation(); 
  const [activeTab, setActiveTab] = useState<"manual" | "barcode">("manual"); 
  const [foodNameManual, setFoodNameManual] = useState("");
  const [qtyManual, setQtyManual] = useState("");
  const [unitManual, setUnitManual] = useState(""); 
  const [barcodeValue, setBarcodeValue] = useState(""); 
  const [showScanner, setShowScanner] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);
  const [manualAnalysis, setManualAnalysis] = useState<ManualAnalysisData | null>(null);
  const [barcodeAnalysis, setBarcodeAnalysis] = useState<BarcodeAnalysisData | null>(null);
  const [searchInfo, setSearchInfo] = useState<SearchInfo | null>(null);
  const [showAnalysis, setShowAnalysis] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const userDataString = await AsyncStorage.getItem("userData");
      if (userDataString) {
        const user = JSON.parse(userDataString);
        setUserName(user.username || "User");
      } else {
        setUserName("User");
      }
    } catch (e) {
      console.error("Failed to load user data", e);
      setUserName("User");
    }
  };

  const onScanPress = () => {
    setShowScanner(true);
    setScanned(false);
  };

  const closeScanner = () => {
    setShowScanner(false);
    setScanned(false);
  };

  const onBarcodeScan = (event: any) => {
    if (!scanned && event.nativeEvent.codeStringValue) {
      setScanned(true);
      const scannedValue = event.nativeEvent.codeStringValue;
      setBarcodeValue(scannedValue);
       
      setTimeout(() => {
        setShowScanner(false);
        setScanned(false);
      }, 1500);
    }
  };

  const validateManualInputs = () => {
    if (!foodNameManual.trim()) {
      Toast.show({
        type: 'error',
        text1: t("errorTitle"),
        text2: t("foodname")
      });
      return false;
    }
    
    if (!qtyManual.trim()) {
      Toast.show({
        type: 'error',
        text1: t("errorTitle"),
        text2: t("quantity")
      });
      return false;
    }
    
    if (!unitManual.trim()) {
      Toast.show({
        type: 'error',
        text1: t("errorTitle"),
        text2: t("enterunit")
      });
      return false;
    }
    
    if (!selectedChild?.id) {
      Toast.show({
        type: 'error',
        text1: t("errorTitle"),
        text2: t("enterChild")
      });
      return false;
    }
    
    return true;
  };

  const validateBarcodeInputs = () => {
    if (!barcodeValue.trim()) {
      Toast.show({
        type: 'error',
        text1: t("errorTitle"),
        text2: t("enterBarcode")
      });
      return false;
    }
    
    if (!selectedChild?.id) {
      Toast.show({
        type: 'error',
        text1: t("errorTitle"),
        text2: t("enterChild")
      });
      return false;
    }
    
    return true;
  };

  const submitManualData = async () => {
    if (!validateManualInputs()) return;
    
    setLoading(true);
    setManualAnalysis(null);
    setBarcodeAnalysis(null);
    setShowAnalysis(false);
    
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
      
      const response = await axios.post(
        `${API_URL}${ENDPOINTS.manualBarcode}`,
        {
          child_id: selectedChild?.id,
          food_description: foodNameManual.trim(),
          food_quant: qtyManual.trim(),
          food_unit: unitManual.trim()
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      console.log("Manual API Response:", response.data);
      
      if (response.data.success) {
        setManualAnalysis(response.data.data);
        setSearchInfo(response.data.search_info);
        setShowAnalysis(true);
        
        Toast.show({
          type: 'success',
          text1: t("successTitle"),
          text2: response.data.message || t("foodSuccess")
        });
      } else {
        Toast.show({
          type: 'error',
          text1: t("errorTitle"),
          text2: response.data.message || t("foodFail")
        });
      }
      
    } catch (error: any) {
      console.log("Manual API Error:", error);
      Toast.show({
        type: 'error',
        text1: t("Error"),
        text2: error.response?.data?.message || error.message || t("networkerror")
      });
    } finally {
      setLoading(false);
    }
  };

  const submitBarcodeData = async () => {
    if (!validateBarcodeInputs()) return;
    
    setLoading(true);
    setManualAnalysis(null);
    setBarcodeAnalysis(null);
    setShowAnalysis(false);
    
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
      
      const response = await axios.post(
        `${API_URL}${ENDPOINTS.barcodeScan}`,
        {
          child_id: selectedChild?.id,
          barcode: barcodeValue.trim()
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      console.log("Barcode API Response:", response.data);
      
      if (response.data.success) {
        setBarcodeAnalysis(response.data.data);
        setSearchInfo(response.data.search_info);
        setShowAnalysis(true);
        
        Toast.show({
          type: 'success',
          text1: t("successTitle"),
          text2: response.data.message || t("barcodesuccess")
        });
      } else {
        Toast.show({
          type: 'error',
          text1: t("errorTitle"),
          text2: response.data.message || t("barcodefail")
        });
      }
      
    } catch (error: any) {
      console.log("Barcode API Error:", error);
      Toast.show({
        type: 'error',
        text1: t("errorTitle"),
        text2: error.response?.data?.message || error.message || t("networkerror")
      });
    } finally {
      setLoading(false);
    }
  };

  const onSubmitPress = () => {
    if (activeTab === "manual") {
      submitManualData();
    } else {
      submitBarcodeData();
    }
  };

  const renderAnalysisSection = () => {
    if (!showAnalysis) return null;

    return (
      <View style={styles.analysisContainer}>
        <CustomText type="subHeading" fontFamily="bold" style={styles.analysisTitle}>
          {t("analysisResult")}
        </CustomText>

        {searchInfo && (
          <View style={styles.searchInfoContainer}>
            <CustomText type="small" style={styles.searchInfoText}>
              {t("todaySearches ")}: {searchInfo.today_searches}/{searchInfo.daily_limit}
            </CustomText>
            <CustomText type="small" style={styles.searchInfoText}>
              {t("Remaining")}: {searchInfo.remaining_searches}
            </CustomText>
          </View>
        )}

        {activeTab === "manual" && manualAnalysis && (
          <ScrollView style={styles.analysisScroll} showsVerticalScrollIndicator={false}>
            {/* Food Information */}
            <View style={styles.infoCard}>
              <CustomText type="subTitle" fontFamily="bold" style={styles.sectionHeader}>
                {t("foodInfo")}
              </CustomText>
              <View style={styles.infoRow}>
                <CustomText type="small" fontFamily="bold">{t("food")}:</CustomText>
                <CustomText type="small" style={styles.infoValue}>
                  {manualAnalysis.food_description}
                </CustomText>
              </View>
              <View style={styles.infoRow}>
                <CustomText type="small" fontFamily="bold">{t("Quantity ")}:</CustomText>
                <CustomText type="small" style={styles.infoValue}>
                  {manualAnalysis.quantity} {manualAnalysis.unit}
                </CustomText>
              </View>
              <View style={styles.infoRow}>
                <CustomText type="small" fontFamily="bold">{t("added ")}:</CustomText>
                <CustomText type="small" style={styles.infoValue}>
                  {new Date(manualAnalysis.added_at).toLocaleDateString()}
                </CustomText>
              </View>
            </View>

           
            <View style={styles.infoCard}>
              <CustomText type="subTitle" fontFamily="bold" style={styles.sectionHeader}>
                {t("nutritionAnalysis")}
              </CustomText>
              
              <View style={styles.ratingContainer}>
                <View style={[
                  styles.ratingBadge,
                  { backgroundColor: getRatingColor(manualAnalysis.analysis.rating) }
                ]}>
                  <CustomText type="small" fontFamily="bold" style={styles.ratingText}>
                    {manualAnalysis.analysis.rating}
                  </CustomText>
                </View>
                <CustomText type="small" style={styles.scoreText}>
                  {t("score")}: {manualAnalysis.analysis.score}/10
                </CustomText>
              </View>

              <View style={styles.analysisDetail}>
                <CustomText type="small" fontFamily="bold" style={styles.detailText}>{t("benefits")}:</CustomText>
                <CustomText type="small" style={styles.detailText}>
                  {manualAnalysis.analysis.benefits}
                </CustomText>
              </View>

              <View style={styles.analysisDetail}>
                <CustomText type="small" fontFamily="bold" style={styles.detailText}>{t("concerns")}:</CustomText>
                <CustomText type="small" style={styles.detailText}>
                  {manualAnalysis.analysis.concerns}
                </CustomText>
              </View>

              <View style={styles.analysisDetail}>
                <CustomText type="small" fontFamily="bold" style={styles.detailText}>{t("recommendations ")}:</CustomText>
                <CustomText type="small" style={styles.detailText}>
                  {manualAnalysis.analysis.recommendation}
                </CustomText>
              </View>

              <View style={styles.analysisDetail}>
                <CustomText type="small" fontFamily="bold" style={styles.detailText}>{t("ageAppro")}:</CustomText>
                <CustomText type="small" style={styles.detailText}>
                  {manualAnalysis.analysis.age_appropriate}
                </CustomText>
              </View>

              {manualAnalysis.analysis.is_fallback && (
                <View style={styles.fallbackNote}>
                  <VectorIcon name="info" size={16} color={COLORS.blue} type="MaterialIcons" />
                  <CustomText type="extraSmall" style={styles.fallbackText}>
                    {t("note")}
                  </CustomText>
                </View>
              )}
            </View>
          </ScrollView>
        )}

        {activeTab === "barcode" && barcodeAnalysis && (
          <ScrollView style={styles.analysisScroll} showsVerticalScrollIndicator={false}>
            
            <View style={styles.infoCard}>
              <CustomText type="subTitle" fontFamily="bold" style={styles.sectionHeader}>
                {t("productInfo")}
              </CustomText>
              
              {barcodeAnalysis.product_info.image_url && (
                <View style={styles.productImageContainer}>
                  <Image
                    source={{ uri: barcodeAnalysis.product_info.image_url }}
                    style={styles.productImage}
                    resizeMode="contain"
                  />
                </View>
              )}

              <View style={styles.infoRow}>
                <CustomText type="small" fontFamily="bold">{t("product")}:</CustomText>
                <CustomText type="small" style={styles.infoValue}>
                  {barcodeAnalysis.product_info.name}
                </CustomText>
              </View>

              <View style={styles.infoRow}>
                <CustomText type="small" fontFamily="bold">{t("brand")}:</CustomText>
                <CustomText type="small" style={styles.infoValue}>
                  {barcodeAnalysis.product_info.brand}
                </CustomText>
              </View>

              {barcodeAnalysis.product_info.description && (
                <View style={styles.infoRow}>
                  <CustomText type="small" fontFamily="bold">{t("description")}:</CustomText>
                  <CustomText type="small" style={styles.infoValue}>
                    {barcodeAnalysis.product_info.description}
                  </CustomText>
                </View>
              )}

              <View style={styles.infoRow}>
                <CustomText type="small" fontFamily="bold">{t("barcode")}:</CustomText>
                <CustomText type="small" style={styles.infoValue}>
                  {barcodeAnalysis.barcode}
                </CustomText>
              </View>

              {barcodeAnalysis.product_info.default_serving && (
                <View style={styles.infoRow}>
                  <CustomText type="small" fontFamily="bold">{t("servingsize:")}</CustomText>
                  <CustomText type="small" style={styles.infoValue}>
                    {barcodeAnalysis.product_info.default_serving}
                  </CustomText>
                </View>
              )}

              {barcodeAnalysis.product_info.categories && (
                <View style={styles.infoRow}>
                  <CustomText type="small" fontFamily="bold">{t("categories")}:</CustomText>
                  <CustomText type="small" style={styles.infoValue}>
                    {barcodeAnalysis.product_info.categories}
                  </CustomText>
                </View>
              )}

              {barcodeAnalysis.product_info.allergens && (
                <View style={styles.infoRow}>
                  <CustomText type="small" fontFamily="bold">{t("allergies")}:</CustomText>
                  <CustomText type="small" style={styles.infoValue}>
                    {barcodeAnalysis.product_info.allergens}
                  </CustomText>
                </View>
              )}
            </View>

            {/* Child Analysis */}
            <View style={styles.infoCard}>
              <CustomText type="subTitle" fontFamily="bold" style={styles.sectionHeader}>
                {t("chilAnalysis")}
              </CustomText>
              
              <View style={styles.ratingContainer}>
                <View style={[
                  styles.ratingBadge,
                  { backgroundColor: getRatingColor(barcodeAnalysis.child_analysis.rating) }
                ]}>
                  <CustomText type="small" fontFamily="bold" style={styles.ratingText}>
                    {barcodeAnalysis.child_analysis.rating}
                  </CustomText>
                </View>
                <CustomText type="small" style={styles.scoreText}>
                  {t("score")}: {barcodeAnalysis.child_analysis.score}/10
                </CustomText>
              </View>

              <View style={styles.analysisDetail}>
                <CustomText type="small" fontFamily="bold">{t("benefits")}:</CustomText>
                <CustomText type="small" style={styles.detailText}>
                  {barcodeAnalysis.child_analysis.benefits}
                </CustomText>
              </View>

              <View style={styles.analysisDetail}>
                <CustomText type="small" fontFamily="bold">{t("concerns")}:</CustomText>
                <CustomText type="small" style={styles.detailText}>
                  {barcodeAnalysis.child_analysis.concerns}
                </CustomText>
              </View>

              <View style={styles.analysisDetail}>
                <CustomText type="small" fontFamily="bold">{t("recommendations")}:</CustomText>
                <CustomText type="small" style={styles.detailText}>
                  {barcodeAnalysis.child_analysis.recommendation}
                </CustomText>
              </View>

              <View style={styles.analysisDetail}>
                <CustomText type="small" fontFamily="bold">{t("feedingTip:")}</CustomText>
                <CustomText type="small" style={styles.detailText}>
                  {barcodeAnalysis.child_analysis.feeding_tips}
                </CustomText>
              </View>

              <View style={styles.analysisDetail}>
                <CustomText type="small" fontFamily="bold">{t("ageAppro")}:</CustomText>
                <CustomText type="small" style={styles.detailText}>
                  {barcodeAnalysis.child_analysis.age_appropriate}
                </CustomText>
              </View>

              <View style={styles.analysisDetail}>
                <CustomText type="small" fontFamily="bold">{t("allergycheck")}:</CustomText>
                <CustomText type="small" style={styles.detailText}>
                  {barcodeAnalysis.child_analysis.allergen_check}
                </CustomText>
              </View>

              {barcodeAnalysis.child_analysis.is_fallback && (
                <View style={styles.fallbackNote}>
                  <VectorIcon name="info" size={16} color={COLORS.blue} type="MaterialIcons" />
                  <CustomText type="extraSmall" style={styles.fallbackText}>
                    {t("note")}
                  </CustomText>
                </View>
              )}
            </View>
          </ScrollView>
        )}

        <CustomButton
          title={t("newanalysis")}
          onPress={() => {
            setShowAnalysis(false);
            setManualAnalysis(null);
            setBarcodeAnalysis(null);
            if (activeTab === "manual") {
              setFoodNameManual("");
              setQtyManual("");
              setUnitManual("");
            } else {
              setBarcodeValue("");
            }
          }}
          style={styles.newAnalysisButton}
        />
      </View>
    );
  };

  const getRatingColor = (rating: string) => {
    switch (rating.toLowerCase()) {
      case 'excellent':
      case 'good':
        return COLORS.green;
      case 'average':
        return COLORS.orange;
      case 'poor':
        return COLORS.red;
      default:
        return COLORS.blue;
    }
  };

  const renderScanner = () => {
    if (!showScanner) return null;

    return (
      <View style={styles.scannerContainer}>
        <Camera
          style={styles.barcodeScanner}
          cameraType={CameraType.Back}
          scanBarcode={true}
          onReadCode={onBarcodeScan}
          showFrame={true}
          laserColor={COLORS.blue}
          frameColor={COLORS.White}
        />
        
        <View style={styles.scannerOverlay}>
          <View style={styles.scannerHeader}>
            <CustomText type="heading" style={styles.scannerTitle}>
              {t("scanBarcode")}
            </CustomText>
            <TouchableOpacity onPress={closeScanner} style={styles.closeButton}>
              <VectorIcon
                type="MaterialIcons"
                name="close"
                size={28}
                color={COLORS.White}
              />
            </TouchableOpacity>
          </View>
          
          <View style={styles.scannerInstructions}>
            <CustomText style={styles.instructionsText}>
              {t("barcodeframe")}
            </CustomText>
            
            {scanned && (
              <>
                <CustomText style={styles.scannedText}>
                  {t("scanSuccess")}
                </CustomText>
                <Spacer style={{ height: 8 }} />
                <CustomText style={styles.barcodeDataText}>
                  {barcodeValue}
                </CustomText>
              </>
            )}
            
            {!scanned && (
              <>
                <View style={styles.manualEntryContainer}>
                  <CustomText style={styles.manualEntryText}>
                    {t("failScan:")}
                  </CustomText>
                  <Spacer style={{ height: 8 }} />
                  <View style={styles.manualInputRow}>
                    <CustomInput
                      placeholder={t("enterbarcode")}
                      value={barcodeValue}
                      onChangeText={setBarcodeValue}
                      keyboardType="numeric"
                      style={styles.manualInput}
                    />
                    <CustomButton
                      title={t("Use")}
                      onPress={closeScanner}
                      style={styles.addButton}
                      disabled={!barcodeValue.trim()}
                    />
                  </View>
                </View>
              </>
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <GradientBackground>
      <KeyboardAvoidingContainer>
        <SafeAreaView style={styles.container}> 
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.iconButton}
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
              {t("tryingnew")}
            </CustomText>

            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => navigation.navigate("HomeScreen")}
            >
              <VectorIcon
                type="MaterialIcons"
                name="home"
                size={22}
                color={COLORS.White}
              />
            </TouchableOpacity>
          </View>

          <Spacer style={{ height: 12 }} /> 
          
        

          {!showAnalysis ? (
            <View style={styles.card}> 
              <View style={styles.tabRow}>
                <TouchableOpacity
                  style={[
                    styles.tabButton,
                    activeTab === "manual" && styles.tabButtonActive,
                  ]}
                  onPress={() => setActiveTab("manual")}
                >
                  <CustomText
                    style={[
                      styles.tabText,
                      activeTab === "manual" && styles.tabTextActive,
                    ]}
                  >
                    {t("manual")}
                  </CustomText>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.tabButton,
                    activeTab === "barcode" && styles.tabButtonActive,
                  ]}
                  onPress={() => setActiveTab("barcode")}
                >
                  <CustomText
                    style={[
                      styles.tabText,
                      activeTab === "barcode" && styles.tabTextActive,
                    ]}
                  >
                    {t("barcode")}
                  </CustomText>
                </TouchableOpacity>
              </View>

              <Spacer style={{ height: 12 }} />

              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
              > 
                {activeTab === "manual" && (
                  <View>
                    <CustomText style={styles.sectionTitle}>
                      {t("description")}
                    </CustomText>

                    <Spacer style={{ height: 8 }} />

                    <CustomInput
                      label={t("food")}
                      placeholder={t("example")}
                      value={foodNameManual}
                      onChangeText={setFoodNameManual}
                    />

                    <Spacer style={{ height: 12 }} />

                    <View style={styles.row}>
                      <View style={{ flex: 1 }}>
                        <CustomInput
                          label={t("Quantity")}
                          placeholder={t("e.g., 200")}
                          value={qtyManual}
                          onChangeText={setQtyManual}
                          keyboardType="numeric"
                        />
                      </View>
                      <Spacer style={{ width: 8 }} />
                      <View style={styles.unitBoxWrapper}>
                        <CustomInput
                          label={t("unit")}
                          placeholder="g"
                          value={unitManual}
                          onChangeText={setUnitManual}
                          keyboardType="default"
                        />
                      </View>
                    </View>
                  </View>
                )} 
                
                {activeTab === "barcode" && (
                  <View>
                    <CustomText style={styles.sectionTitle}>
                      {t("barcode")}
                    </CustomText> 
                    <Spacer style={{ height: 8 }} /> 
                    <CustomInput
                      label={t("scanItem")}
                      placeholder={t("scanbarcode")}
                      value={barcodeValue}
                      onChangeText={setBarcodeValue}
                      keyboardType="numeric"
                    />

                    <Spacer style={{ height: 12 }} /> 
                    <View style={styles.scanButtonContainer}>
                      <CustomButton
                        title={t("scan")}
                        onPress={onScanPress} 
                        style={styles.scanButton}
                      /> 
                    </View> 
                  </View>
                )}

                <Spacer style={{ height: 20 }} />

                <CustomButton
                  title={loading ? t("analyzing") : t("check")}
                  onPress={onSubmitPress}
                  disabled={loading}
                />
                
                {loading && (
                  <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color={COLORS.blue} />
                    <CustomText style={styles.loadingText}>
                      {t("foodAnalyzing")}
                    </CustomText>
                  </View>
                )}
              </ScrollView>
            </View>
          ) : (
            renderAnalysisSection()
          )}
        </SafeAreaView>
      </KeyboardAvoidingContainer> 
      {renderScanner()}
    </GradientBackground>
  );
};

export default BarcodeScreen;