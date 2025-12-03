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
      const [userData, setUserData] = useState<string>('');
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
                        <TouchableOpacity style={[styles.card, { backgroundColor: "#FBDDC1" }]} onPress={() => navigation.navigate('Nutrition')}>
                            <Image source={IMAGES.nutrition} style={styles.cardIcon} />
                            <CustomText type="small" style={[styles.cardText,{color:"#FF7E00"}]}>{t("nutrition")}</CustomText>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.card, { backgroundColor: "#BCE2EA" }]} onPress={()=>navigation.navigate("Vaccination")}>
                            <Image source={IMAGES.vaccine} style={styles.cardIcon} />
                            <CustomText type="small" style={[styles.cardText,{color:"#156082"}]}>{t("vaccination")}</CustomText>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.card, { backgroundColor: "#FCF2B5" }]} onPress={()=>navigation.navigate('Growth')}>
                            <Image source={IMAGES.bottle} style={styles.cardIcon} />
                            <CustomText type="small" style={[styles.cardText,{color:"#E97132"}]}>{t("growth")}</CustomText>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.card, { backgroundColor: "#DAD1F0" }]}>
                            <Image source={IMAGES.community} style={styles.cardIcon} />
                            <CustomText type="small" style={[styles.cardText,{color:"#156082"}]}>{t("community")}</CustomText>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.card, { backgroundColor: "#CBEBC7" }]} onPress={()=>navigation.navigate('Development')}>
                            <Image source={IMAGES.baby} style={styles.cardIcon} />
                            <CustomText type="small" style={[styles.cardText,{color:"#30B700"}]}>{t("development")}</CustomText>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.card, { backgroundColor: "#F9C3CE" }]}>
                            <Image source={IMAGES.internet} style={styles.cardIcon} />
                            <CustomText type="small" style={[styles.cardText,{color:"#B400A0"}]}>{("internet")}</CustomText>
                        </TouchableOpacity>

                    </View>
                </SafeAreaView>
            </KeyboardAvoidingContainer>
        </GradientBackground>
    );
};

export default HomeScreen;
