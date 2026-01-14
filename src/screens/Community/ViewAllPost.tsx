
import React, { useEffect, useState, useCallback } from "react";
import { View, TouchableOpacity, Image, FlatList, ActivityIndicator } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import { CustomText } from "../../components/CustomText";
import GradientBackground from "../../components/GradientBackground";
import styles from "./style";
import COLORS from "../../utils/Colors";
import VectorIcon from "../../components/VectorIcon";
import Spacer from "../../components/Spacer";
import IMAGES from "../../assets/images";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";
import Toast from "react-native-toast-message";
import axios from "axios";
import ENDPOINTS, { API_URL, IMAGE_URL } from "../../APIService/endPoints";
import { useFocusEffect } from "@react-navigation/native";

type Props = NativeStackScreenProps<RootStackParamList, "ViewAllPost">;

const ViewAllPost: React.FC<Props> = ({ navigation }) => {
    const [userName, setUserName] = useState("");
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState<"videos" | "photos">("photos");
    const [allPosts, setAllPosts] = useState<any[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<any[]>([]);
    const { t } = useTranslation();
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

    const filterPostsByType = useCallback((posts: any[], type: "videos" | "photos") => {
        return posts.filter(post => post.content_type === (type === "videos" ? "video" : "image"));
    }, []);

    
     useFocusEffect(
        useCallback(() => {
          fetchPosts();
        }, [])
      );

    useEffect(() => {
        if (allPosts.length > 0) {
            const filtered = filterPostsByType(allPosts, activeTab);
            setFilteredPosts(filtered);
        }
    }, [activeTab, allPosts, filterPostsByType]);

    const fetchPosts = async () => {
        try {
            const token = await AsyncStorage.getItem('Usertoken');
            
            if (!token) {
                Toast.show({
                    type: 'error',
                    text1: t("errorTitle"),
                    text2: t("userTokenMissing"),
                });
                return;
            }

            setLoading(true);
            const response = await axios.get(
                `${API_URL}${ENDPOINTS.communitymypost}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            if (response?.data?.success && response?.data?.data) {
                setAllPosts(response.data.data);
                setUserName(response.data.data[0]?.user?.username || "");
                
                const filtered = filterPostsByType(response.data.data, "videos");
                setFilteredPosts(filtered);
            } else {
                console.log("API response error:", response?.data);
                Toast.show({
                    type: 'error',
                    text1: t("errorTitle"),
                    text2:t("FailedFetchposts"),
                });
            }
        } catch (err: any) {
            console.log("Fetch posts error:", err);
            Toast.show({
                type: 'error',
                text1: t("errorTitle"),
                text2: t("Networkerror"),
            });
        } finally {
            setLoading(false);
        }
    };

    const renderItem = ({ item }: { item: any }) => {
        const firstImage = item.images && item.images.length > 0 ? item.images[0] : null;
        const imageUrl = firstImage ? `${IMAGE_URL}${firstImage.image_url}` : null;

        return (
            <TouchableOpacity style={styles.vcard}>
                {imageUrl ? (
                    <Image source={{ uri: imageUrl }} style={styles.vcardIcon} />
                ) : (
                    <View style={[styles.vcardIcon, { backgroundColor: COLORS.grey, justifyContent: 'center', alignItems: 'center' }]}>
                         <VectorIcon type="MaterialIcons" name="play-circle-outline" size={25} color={COLORS.White} />
                    </View>
                )}
            </TouchableOpacity>
        );
    };

    const renderEmptyComponent = () => (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 50 }}>
            <CustomText type="subHeading" color={COLORS.grey}>
                {t(activeTab === "videos" ? "NoVideosFound" : "NoPhotosFound")}
            </CustomText>
        </View>
    );

    if (loading) {
        return (
            <GradientBackground>
                <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                    <ActivityIndicator size="large" color={COLORS.blue} />
                    <Spacer size={16} />
                    
                </View>
            </GradientBackground>
        );
    }

    return (
        <GradientBackground>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
                        <VectorIcon type="MaterialIcons" name="arrow-back-ios" size={25} color={COLORS.White} />
                    </TouchableOpacity>

                    <CustomText type="heading" fontFamily="semiBold" style={styles.headerTitle}>
                      {userData?.username}
                    </CustomText>

                    <TouchableOpacity style={styles.backIcon} onPress={() => navigation.navigate("HomeScreen")}>
                        <VectorIcon type="MaterialIcons" name="home" size={25} color={COLORS.White} />
                    </TouchableOpacity>
                </View>

                <Spacer size={20} />

                <View style={styles.vgridContainer}>
                    <View style={styles.selectcat}>
                        <TouchableOpacity onPress={() => setActiveTab("videos")}>
                            <CustomText
                                type="subHeading"
                                style={[
                                    styles.phovid,
                                    activeTab === "videos" ? styles.activeTab : styles.inactiveTab,
                                ]}
                            >
                                {t("Videos")}
                            </CustomText>
                        </TouchableOpacity>

                        <CustomText style={styles.phovid} type="heading">|</CustomText>

                        <TouchableOpacity onPress={() => setActiveTab("photos")}>
                            <CustomText
                                type="subHeading"
                                style={[
                                    styles.phovid,
                                    activeTab === "photos" ? styles.activeTab : styles.inactiveTab,
                                ]}
                            >
                                {t("Photos")}
                            </CustomText>
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        data={filteredPosts}
                        renderItem={renderItem}
                        numColumns={3}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.gridContainer}
                        ListEmptyComponent={renderEmptyComponent}
                        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
                    />
                </View>

                <TouchableOpacity style={styles.addmore} onPress={() => navigation.navigate('AddPost')}>
                    <CustomText type="subTitle" color={COLORS.White}>{t("AddMore")}</CustomText>
                </TouchableOpacity>
            </View>
        </GradientBackground>
    );
};

export default ViewAllPost;
