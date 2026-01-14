import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { CustomText } from "../../components/CustomText";
import GradientBackground from "../../components/GradientBackground";
import { KeyboardAvoidingContainer } from "../../components/KeyboardAvoidingComponent";
import Spacer from "../../components/Spacer";
import styles from "./style";
import IMAGES from "../../assets/images";
import { RootStackParamList } from "../../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import VectorIcon from '../../components/VectorIcon';
import COLORS from "../../utils/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";

type Props = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>;
const HomeScreen: React.FC<Props> = ({ navigation }) => {
      const [userData, setUserData] = useState<{ username: string } | null>(null);
       const { t } = useTranslation();
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
    return (
        <GradientBackground>
            <KeyboardAvoidingContainer>
                <SafeAreaView style={styles.container}>
                    <View style={styles.header}>
                        <View>
                            <CustomText type="subHeading" fontFamily="semiBold" style={styles.helloTxt}>
                                {userData?.username}
                            </CustomText>
                            {/* <CustomText type="small" style={styles.subtitle}>
                                A web phrase about children
                            </CustomText> */}
                        </View>
                        <TouchableOpacity style={styles.settingsIcon}>
                            <VectorIcon
                                type="MaterialIcons"
                                name="settings"
                                size={35} 
                                color={COLORS.White}/>

                        </TouchableOpacity>
                    </View>

                    <Spacer size={20} />

                    <View style={styles.gridContainer}>
                        <TouchableOpacity style={[styles.card, { backgroundColor: COLORS.skincolor}]} onPress={() => navigation.navigate('Nutrition')}>
                            <Image source={IMAGES.nutrition} style={styles.cardIcon} />
                            <CustomText type="small" style={[styles.cardText,{color:COLORS.orange2}]}>{t("nutrition")}</CustomText>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.card, { backgroundColor: COLORS.lightblue3 }]} onPress={()=>navigation.navigate("Vaccination")}>
                            <Image source={IMAGES.vaccine} style={styles.cardIcon} />
                            <CustomText type="small" style={[styles.cardText,{color:COLORS.navyblue}]}>{t("vaccination")}</CustomText>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.card, { backgroundColor: COLORS.yellow2 }]} onPress={()=>navigation.navigate('Growth')}>
                            <Image source={IMAGES.bottle} style={styles.cardIcon} />
                            <CustomText type="small" style={[styles.cardText,{color:COLORS.orange}]}>{t("growth")}</CustomText>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.card, { backgroundColor: COLORS.grey2 }]} onPress={()=>navigation.navigate('Community')}>
                            <Image source={IMAGES.community} style={styles.cardIcon} />
                            <CustomText type="small" style={[styles.cardText,{color:COLORS.navyblue}]}>{t("community")}</CustomText>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.card, { backgroundColor: COLORS.green2 }]} onPress={()=>navigation.navigate('Development')}>
                            <Image source={IMAGES.baby} style={styles.cardIcon} />
                            <CustomText type="small" style={[styles.cardText,{color:COLORS.darkgreen}]}>{t("development")}</CustomText>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.card, { backgroundColor: COLORS.lightpink }]} onPress={()=>navigation.navigate('InternetScreen')}>
                            <Image source={IMAGES.internet} style={styles.cardIcon} />
                            <CustomText type="small" style={[styles.cardText,{color:COLORS.purple}]}>{("internet")}</CustomText>
                        </TouchableOpacity>

                    </View>
                </SafeAreaView>
            </KeyboardAvoidingContainer>
        </GradientBackground>
    );
};

export default HomeScreen;
