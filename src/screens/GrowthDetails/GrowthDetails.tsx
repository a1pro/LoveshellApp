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

type Props = NativeStackScreenProps<RootStackParamList, 'GrowthDetails'>;
const GrowthDetails: React.FC<Props> = ({ navigation }) => {
  
    const { t } = useTranslation();
  const selectedChild = useSelector((state: RootState) => state.child.selectedChild);
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
                        {selectedChild?.name}
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
                        <TouchableOpacity style={[styles.card, { backgroundColor: "#F8EFC6" }]} onPress={() => navigation.navigate('WeightScreen')}>
                            <Image source={IMAGES.child} style={styles.cardIcon} />
                            <CustomText type="subHeading" style={[styles.cardText,{color:"#E97132"}]}>{t("WeightandHeight")}</CustomText>
                        </TouchableOpacity>
                       

                        <TouchableOpacity style={[styles.card, { backgroundColor: "#C3EDBF" }]} onPress={()=>navigation.navigate('PercentaileScreen')}>
                            <Image source={IMAGES.foodboard} style={styles.cardIcon} />
                            <CustomText type="subHeading" style={[styles.cardText,{color:"#156082"}]}>{t("PercentileCharts")}</CustomText>
                        </TouchableOpacity>
 
                </View>

            </View>
        </GradientBackground>
    );
};
export default GrowthDetails;