import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import { View, TouchableOpacity, ScrollView, TextInput } from "react-native";
import { CustomText } from "../../components/CustomText";
import CustomInput from "../../components/CustomInput";
import GradientBackground from "../../components/GradientBackground";
import { styles } from "./style";
import VectorIcon from "../../components/VectorIcon";
import COLORS from "../../utils/Colors";
import Spacer from "../../components/Spacer";
import { useTranslation } from "react-i18next";
import CustomButton from "../../components/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import axios from "axios";
import ENDPOINTS, { API_URL } from "../../APIService/endPoints";

type Props = NativeStackScreenProps<RootStackParamList, "AddnewTopic">;

const AddnewTopic: React.FC<Props> = ({ navigation }) => {
    const { t } = useTranslation();

    const [topicTitle, setTopicTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    // Validation check
    const isFormValid = () => {
        return topicTitle.trim().length > 0 && description.trim().length > 0;
    };

    const handleAddTopic = async () => {
        if (!isFormValid()) {
            Toast.show({
                type: "error",
                text1: t("errorTitle") || "Error",
                text2: "Title and description are required",
            });
            return;
        }

        setLoading(true);

        try {
            const token = await AsyncStorage.getItem("Usertoken"); // Fixed token key
            if (!token) {
                Toast.show({
                    type: "error",
                    text1: t("errorTitle") || "Error",
                    text2: t("userTokenMissing") || "Token missing",
                });
                return;
            }

            const response = await axios.post(
                `${API_URL}${ENDPOINTS.addnewTopic}`,
                {
                    title: topicTitle.trim(),
                    description: description.trim(),
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data.success) {
                Toast.show({
                    type: "success",
                    text1: "Success",
                    text2: response.data.message || "Topic added successfully",
                });  
                setTopicTitle("");
                setDescription("");
                navigation.goBack();
            } else {
                Toast.show({
                    type: "error",
                    text1: "Error",
                    text2: response.data.message || "Failed to add topic",
                });
            }
        } catch (error: any) {
            console.error("Add topic error:", error);
            
            let errorMessage = "Failed to add topic";
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.message) {
                errorMessage = error.message;
            }

            Toast.show({
                type: "error",
                text1: t("errorTitle") || "Error",
                text2: errorMessage,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <GradientBackground>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backIcon}
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
                        {t("newTopic")}
                    </CustomText>

                    <TouchableOpacity
                        style={styles.backIcon}
                        onPress={() => navigation.navigate("HomeScreen")}
                    >
                        <VectorIcon
                            type="MaterialIcons"
                            name="home"
                            size={28}
                            color={COLORS.White}
                        />
                    </TouchableOpacity>
                </View>

                <Spacer style={{ height: 16 }} />

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.formContainer}
                >
                    <CustomText style={styles.title} type="subHeading">
                        {t("title")} *
                    </CustomText>
                    <CustomInput
                        placeholder={t("title") || "Enter topic title"}
                        value={topicTitle}
                        onChangeText={setTopicTitle}
                        
                    />
                    <Spacer style={{ height: 20 }} />
                    
                    <CustomText style={styles.title} type="subHeading">
                        {t("description")} *
                    </CustomText>
                    <View style={[styles.viewInput, topicTitle.trim().length === 0 && !loading ? { borderColor: COLORS.bordercolor } : {}]}>
                        <TextInput
                            placeholder={t("description") || "Enter topic description"}
                            value={description}
                            multiline
                            numberOfLines={5}
                            style={styles.input}
                            onChangeText={setDescription}
                            maxLength={1000}
                            textAlignVertical="top"
                        />
                    </View>

                    <Spacer style={{ height: 30 }} />

                    <CustomButton
                        style={{ width: "80%", alignSelf: "center" }}
                        title={loading ? (t("saving") || "Saving") : (t("saved") || "Save Topic")}
                        disabled={loading || !isFormValid()}
                        onPress={handleAddTopic}
                    />

                    <Spacer style={{ height: 40 }} />
                </ScrollView>
            </View>
        </GradientBackground>
    );
};

export default AddnewTopic;
