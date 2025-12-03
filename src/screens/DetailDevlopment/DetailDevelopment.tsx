import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Image, ActivityIndicator } from "react-native";
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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store/Store";
import ENDPOINTS, { API_URL } from "../../APIService/endPoints";
import axios from "axios";
import { setSelectedChild } from "../../store/slice/childSlice";
type Props = NativeStackScreenProps<RootStackParamList, 'DetailDevelopment'>;
const DetailDevelopment: React.FC<Props> = ({ navigation }) => {
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
                  <CustomText
                               type="heading"
                               fontFamily="semiBold"
                               style={styles.headerTitle}
                             >
                               {selectedChild ? `${selectedChild.name}` : "Zion Meals"}
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
                        <TouchableOpacity style={[styles.card, { backgroundColor: COLORS.lightyellow}]} onPress={()=>navigation.navigate('PrankScreen')} >
                            <Image source={IMAGES.playing} style={styles.cardIcon} />
                            <CustomText type="subHeading" style={[styles.cardText,{color:COLORS.orange}]}>{t("Letsplay")}</CustomText>
                        </TouchableOpacity>
                       

                        <TouchableOpacity style={[styles.card, { backgroundColor: COLORS.lightGreen }]} >
                            <Image source={IMAGES.foodboard} style={styles.cardIcon} />
                            <CustomText type="subHeading" style={[styles.cardText,{color:COLORS.navyblue}]}>{t("importantframeworks")}</CustomText>
                        </TouchableOpacity>
 
                </View>
                </View>
        </GradientBackground>
    );
}
export default DetailDevelopment;