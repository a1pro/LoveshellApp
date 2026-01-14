import React, { use, useEffect, useState } from "react";
import { View, TouchableOpacity, Image } from "react-native";
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
import { RootState } from "../../store/store/Store";
import { useSelector } from "react-redux";

type Props = NativeStackScreenProps<RootStackParamList, 'InternetScreen'>;
const InternetScreen: React.FC<Props> = ({ navigation }) => {
  
    const { t } = useTranslation();
  const selectedChild = useSelector((state: RootState) => state.child.selectedChild);
    const [userData, setUserData] = useState<{ username: string } | null>(null);
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
                       {userData?.username}
                    </CustomText>
                    <TouchableOpacity style={styles.backIcon} onPress={() => navigation.navigate('HomeScreen')}>
                        <VectorIcon
                            type="MaterialIcons"
                            name="home"
                            size={25}
                            color={COLORS.White} />
                    </TouchableOpacity>

                </View>
                <Spacer size={20} />
                <View style={styles.gridContainer}>
                        <TouchableOpacity style={[styles.card, { backgroundColor: COLORS.lightorange }]} onPress={() =>navigation.navigate('FeaturedTopic')}>
                            <Image source={IMAGES.internet3} style={styles.cardIcon} />
                            <CustomText type="subHeading" style={[styles.cardText,{color:COLORS.orange2}]}>{t("FeaturedTopic")}</CustomText>
                        </TouchableOpacity>
                       

                        <TouchableOpacity style={[styles.card, { backgroundColor: COLORS.inputBorder}]} onPress={()=>navigation.navigate('MyTopic')}>
                            <Image source={IMAGES.internet1} style={styles.cardIcon} />
                            <CustomText type="subHeading" style={[styles.cardText,{color:COLORS.blue}]}>{t("myTopic")}</CustomText>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.card, { backgroundColor: COLORS.newPink}]} onPress={()=>navigation.navigate('AddnewTopic')}>
                            <Image source={IMAGES.internet2} style={styles.cardIcon} />
                            <CustomText type="subHeading" style={[styles.cardText,{color:COLORS.navyblue}]}>{t("addNewTopic")}</CustomText>
                        </TouchableOpacity>
 
                </View>

            </View>
        </GradientBackground>
    );
};
export default InternetScreen;