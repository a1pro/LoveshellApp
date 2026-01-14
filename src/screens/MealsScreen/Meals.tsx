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

type Props = NativeStackScreenProps<RootStackParamList, 'Meals'>;
const Meals: React.FC<Props> = ({ navigation }) => {
    const [userName, setUserName] = useState("");
    const { t } = useTranslation();
    useEffect(() => {
        fetchUserData();
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
                <Spacer size={20} />
                <View style={styles.gridContainer}>
                        <TouchableOpacity style={[styles.card, { backgroundColor: COLORS.lightyellow }]} onPress={() => navigation.navigate('MealCalendar')}>
                            <Image source={IMAGES.meal} style={styles.cardIcon} />
                            <CustomText type="small" style={[styles.cardText,{color:COLORS.orange}]}>{t("meals")}</CustomText>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.card, { backgroundColor: COLORS.lightred }]} onPress={()=>navigation.navigate('RecipeScreen')}>
                            <Image source={IMAGES.receipe} style={styles.cardIcon} />
                            <CustomText type="small" style={[styles.cardText,{color:COLORS.purple}]}>{t('recipe')}</CustomText>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.card, { backgroundColor: COLORS.lightblue2 }]} onPress={()=>navigation.navigate("FoodChart")}>
                            <Image source={IMAGES.foodboard} style={styles.cardIcon} />
                            <CustomText type="small" style={[styles.cardText,{color:COLORS.navyblue}]}>{t("foodboard")}</CustomText>
                        </TouchableOpacity>

                        {/* <TouchableOpacity style={[styles.card, { backgroundColor: COLORS.lightGreen }]}>
                            <Image source={IMAGES.consltant} style={styles.cardIcon} />
                            <CustomText type="small" style={[styles.cardText,{color:COLORS.green}]}>{t("consultant")}</CustomText>
                        </TouchableOpacity> */}
                </View>

            </View>
        </GradientBackground>
    );
};
export default Meals;