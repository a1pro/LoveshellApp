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

type Props = NativeStackScreenProps<RootStackParamList, 'PrankScreen'>;
const PrankScreen: React.FC<Props> = ({ navigation }) => {
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
                        <TouchableOpacity style={[styles.card, { backgroundColor: COLORS.lightyellow }]} >
                            <Image source={IMAGES.prank1} style={styles.cardIcon} />
                            <CustomText type="small" style={[styles.cardText,{color:"#E97132"}]}>{t("PrankIdeas")}</CustomText>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.card, { backgroundColor: COLORS.lightred }]} >
                            <Image source={IMAGES.prank2} style={styles.cardIcon} />
                            <CustomText type="small" style={[styles.cardText,{color:"#B400A0"}]}>{t('PrankIdeas')}</CustomText>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.card, { backgroundColor: COLORS.lightblue2 }]}>
                            <Image source={IMAGES.prank3} style={styles.cardIcon} />
                            <CustomText type="small" style={[styles.cardText,{color:"#156082"}]}>{t("PrankIdeas")}</CustomText>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.card, { backgroundColor: COLORS.lightGreen }]}>
                            <Image source={IMAGES.prank4} style={styles.cardIcon} />
                            <CustomText type="small" style={[styles.cardText,{color:"#018D61"}]}>{t("PrankIdeas")}</CustomText>
                        </TouchableOpacity>
                </View>

            </View>
        </GradientBackground>
    );
};
export default PrankScreen;