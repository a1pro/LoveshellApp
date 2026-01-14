import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Image, FlatList, Modal, TextInput, ScrollView, Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import { CustomText } from "../../components/CustomText";
import GradientBackground from "../../components/GradientBackground";
import styles from "./style";
import COLORS from "../../utils/Colors";
import VectorIcon from "../../components/VectorIcon";
import Spacer from "../../components/Spacer";
import { requestPermissions } from "../../components/requestpermission";
import { launchCamera, launchImageLibrary, MediaType } from 'react-native-image-picker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";
import Toast from "react-native-toast-message";
import axios from "axios";
import ENDPOINTS, { API_URL } from "../../APIService/endPoints";

type Props = NativeStackScreenProps<RootStackParamList, "AddPost">;

interface MediaItem {
    uri: string;
    type: 'image' | 'video';
    width?: number;
    height?: number;
    id?: string;
}

const AddPost: React.FC<Props> = ({ navigation }) => {
    
    const [activeMode, setActiveMode] = useState<'text' | 'camera' | 'gallery'>('text');
    const [textValue, setTextValue] = useState("");
    const [selectedMedia, setSelectedMedia] = useState<MediaItem[]>([]);
    const [showPreviewModal, setShowPreviewModal] = useState(false);
    const [caption, setCaption] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [newTag, setNewTag] = useState("");
    const [category, setCategory] = useState("");
    const [loading, setLoading] = useState(false);
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

    const submitTextPost = async () => {
        if (!textValue.trim()) {
            Toast.show({
                type: 'error',
                text1: t("errorTitle"),
                text2: t("EmptyTextbox"),
            });
            return;
        }

        setLoading(true);
        try {
            const token = await AsyncStorage.getItem('Usertoken');
            if (!token) {
                Toast.show({ type: 'error', text1: t("errorTitle"), text2: t("userTokenMissing") });
                return;
            }

            const formData = new FormData();
            formData.append('title', textValue.trim()); 
            formData.append('tags[]', tags);
            formData.append('category', category);
            formData.append('content_type', 'text');

            const response = await axios.post(
                `${API_URL}${ENDPOINTS.addpost}`,
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            if (response.data.success) {
                Toast.show({ type: 'success', text1: t("successTitle") , text2: t("postAdded") });
                setTextValue("");
                setTags([]);
                setCategory("");
            }
        } catch (error: any) {
            console.log("Text post error:", error);
            Toast.show({ type: 'error', text1: t("errorTitle") , text2:t("Networkerror")});
        } finally {
            setLoading(false);
        }
    };

    const openCamera = () => {
        const options = {
            mediaType: 'mixed' as MediaType,
            quality: 1,
        };

        launchCamera(options, (response) => {
            if (response.didCancel) return;
            if (response.errorCode) {
                console.log('Camera Error: ', response.errorMessage);
                return;
            }
            if (response.assets && response.assets[0]) {
                const asset = response.assets[0];
                const mediaType = (asset.type === 'video/mov' || asset.type === 'video/mp4') ? 'video' : 'image';
                
              
                setSelectedMedia([{
                    uri: asset.uri || '',
                    type: mediaType,
                    width: asset.width,
                    height: asset.height,
                }]);
                setShowPreviewModal(true);
            }
        });
    };

    const openGallery = () => {
        const options = {
            mediaType: 'mixed' as MediaType,
            selectionLimit: 10,
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) return;
            if (response.errorCode) {
                console.log('Gallery Error: ', response.errorMessage);
                return;
            }
            if (response.assets) {
                let mediaItems: MediaItem[] = [];
                
                
                const videos = response.assets.filter(asset => 
                    asset.type === 'video/mov' || asset.type === 'video/mp4'
                );
                const images = response.assets.filter(asset => 
                    asset.type !== 'video/mov' && asset.type !== 'video/mp4'
                );

                if (videos.length > 0) {
              
                    const videoAsset = videos[0];
                    mediaItems = [{
                        uri: videoAsset.uri || '',
                        type: 'video',
                        width: videoAsset.width,
                        height: videoAsset.height,
                    }];
                } else if (images.length > 0) {
                   
                    mediaItems = images.map(asset => ({
                        uri: asset.uri || '',
                        type: 'image',
                        width: asset.width,
                        height: asset.height,
                    }));
                }

                setSelectedMedia(mediaItems);
                setShowPreviewModal(true);
            }
        });
    };

    const addTag = () => {
        if (newTag.trim() && !tags.includes(newTag.trim())) {
            setTags([...tags, newTag.trim()]);
            setNewTag("");
        }
    };

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const submitMediaPost = async () => {
        if (selectedMedia.length === 0) {
            Toast.show({
                type: 'error',
                text1: t("errorTitle"),
                text2:t("MediaSelection"),
            });
            return;
        }
        const mediaTypes = new Set(selectedMedia.map(m => m.type));
        if (mediaTypes.size > 1) {
            Toast.show({
                type: 'error',
                text1: t("errorTitle"),
                text2:t("mixmedia"),
            });
            return;
        }

        setLoading(true);
        try {
            const token = await AsyncStorage.getItem('Usertoken');
            if (!token) {
                Toast.show({ type: 'error', text1:t("errorTitle"), text2:t('userTokenMissing') });
                return;
            }

            const formData = new FormData();
            formData.append('title', caption);
            tags.forEach(tag => formData.append('tags[]', tag));
            formData.append('category', category);
            formData.append('content_type', selectedMedia[0].type);
            if (selectedMedia[0].type === 'image') {
                selectedMedia.forEach((media, index) => {
                    formData.append('images[]', {
                        uri: media.uri,
                        type: 'image/jpeg',
                        name: `image_${index}.jpg`,
                    } as any);
                });
            } else {
                const media = selectedMedia[0];
                formData.append('media[]', {
                    uri: media.uri,
                    type: 'video/mp4',
                    name: 'video.mp4',
                } as any);
            }

            console.log('FormData prepared for submission');

            const response = await axios.post(
                `${API_URL}${ENDPOINTS.addpost}`,
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            if (response.data.success) {
                Toast.show({ type: 'success', text1: t("successTitle"), text2: t("postAdded") });
                setShowPreviewModal(false);
                setSelectedMedia([]);
                setCaption("");
                setTags([]);
                setCategory("");
                navigation.goBack();
            }
        } catch (error: any) {
            console.log("Media post error:", error);
            Toast.show({ type: 'error', text1: t("errorTitle"), text2:t("Networkerror")});
        } finally {
            setLoading(false);
        }
    };

    const renderMediaPreview = ({ item }: { item: MediaItem }) => (
        <View style={{ margin: 5, width: 100, height: 100, borderRadius: 8, overflow: 'hidden' }}>
            <Image 
                source={{ uri: item.uri }} 
                style={{ width: '100%', height: '100%' }} 
                resizeMode="cover" 
            />
            {item.type === 'video' && (
                <View style={{
                    position: 'absolute',
                    top: 5,
                    right: 5,
                    backgroundColor:COLORS.black,
                    padding: 4,
                    borderRadius: 4
                }}>
                    <VectorIcon name="play-circle-outline" size={16} color={COLORS.White} type="MaterialIcons" />
                </View>
            )}
        </View>
    );

    return (
        <GradientBackground>
            <ScrollView showsVerticalScrollIndicator={false}>
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

                    <View style={styles.postselect}>
                        <TouchableOpacity
                            style={[
                                styles.selbutton,
                                activeMode === 'text' && { backgroundColor: COLORS.appLinear1 }
                            ]}
                            onPress={() => setActiveMode('text')}
                        >
                            <CustomText color={activeMode === 'text' ? 'white' : undefined} fontWeight={activeMode === 'text' ? 'bold' : 'normal'}>
                                {t("Text")}
                            </CustomText>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.selbutton,
                                activeMode === 'camera' && { backgroundColor: COLORS.appLinear1 }
                            ]}
                            onPress={() => {
                                setActiveMode('camera');
                                openCamera();
                            }}
                        >
                            <CustomText color={activeMode === 'camera' ? 'white' : undefined} fontWeight={activeMode === 'camera' ? 'bold' : 'normal'}>
                              {t("Camera")}
                            </CustomText>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.selbutton,
                                activeMode === 'gallery' && { backgroundColor: COLORS.appLinear1 }
                            ]}
                            onPress={() => {
                                setActiveMode('gallery');
                                openGallery();
                            }}
                        >
                            <CustomText color={activeMode === 'gallery' ? 'white' : undefined} fontWeight={activeMode === 'gallery' ? 'bold' : 'normal'}>
                                 {t("Gallery")}
                            </CustomText>
                        </TouchableOpacity>
                    </View>

                    {activeMode === 'text' && (
                        <View style={{ flex: 1, alignItems: "center", marginTop: 20 }}>
                            <View style={{
                                backgroundColor: "white",
                                width: "100%",
                                padding: 10,
                                borderRadius: 12,
                            }}>
                                <TextInput
                                    placeholder={t('placeholderText')}
                                    placeholderTextColor="gray"
                                    value={textValue}
                                    onChangeText={setTextValue}
                                    multiline
                                    style={{
                                        borderWidth: 1,
                                        borderColor: "gray",
                                        borderRadius: 8,
                                        padding: 10,
                                        height: 280,
                                        color: COLORS.black,
                                        textAlignVertical: "top",
                                    }}
                                />
                                <TouchableOpacity onPress={submitTextPost} style={styles.submit} disabled={loading}>
                                    <CustomText color={COLORS.White} fontWeight="bold">
                                        {loading ? "Posting..." : "Submit Text"}
                                    </CustomText>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </View>
            </ScrollView>


            <Modal visible={showPreviewModal} animationType="slide" presentationStyle="pageSheet">
                <GradientBackground>
                    <ScrollView style={{ flex: 1 }}>
                        <View style={{ padding: 20 }}>
                            <View style={styles.header}>
                                <TouchableOpacity onPress={() => {
                                    setShowPreviewModal(false);
                                    setSelectedMedia([]);
                                }}>
                                    <VectorIcon type="MaterialIcons" name="close" size={30} color={COLORS.White} />
                                </TouchableOpacity>
                                <CustomText type="heading" style={{ color: COLORS.White }}>
                                   {t(" Preview")} {selectedMedia[0]?.type === 'video' ? 'Video' : 'Images'} Post
                                </CustomText>
                                <View style={{ width: 30 }} />
                            </View>

                            <Spacer size={20} />
 
                            {selectedMedia.length > 0 && (
                                <View>
                                    <CustomText type="subHeading" color={COLORS.White} style={{ marginBottom: 10 }}>
                                        {selectedMedia[0].type === 'video' ? 'Video' : `Images (${selectedMedia.length})`}
                                    </CustomText>
                                    <FlatList
                                        data={selectedMedia}
                                        renderItem={renderMediaPreview}
                                        numColumns={selectedMedia[0].type === 'video' ? 1 : 3}
                                        scrollEnabled={false}
                                    />
                                </View>
                            )}

                            <Spacer size={20} />
 
                            <View style={{ backgroundColor: 'white', padding: 15, borderRadius: 12 }}>
                                <CustomText type="subHeading" style={{ marginBottom: 10 }}>{t("title")}</CustomText>
                                <TextInput
                                    placeholder={t("Addtitle")}
                                    value={caption}
                                    onChangeText={setCaption}
                                    multiline
                                    style={{
                                        borderWidth: 1,
                                        borderColor: COLORS.bordercolor,
                                        borderRadius: 8,
                                        padding: 12,
                                        minHeight: 80,
                                        textAlignVertical: 'top',
                                    }}
                                />
                            </View>

                            <Spacer size={15} />
 
                            <View style={{ backgroundColor: 'white', padding: 15, borderRadius: 12 }}>
                                <CustomText type="subHeading" style={{ marginBottom: 10 }}>  {t("Category")}</CustomText>
                                <TextInput
                                    placeholder={t("Entercategory")}
                                    value={category}
                                    onChangeText={setCategory}
                                    style={{
                                        borderWidth: 1,
                                        borderColor: COLORS.bordercolor,
                                        borderRadius: 8,
                                        padding: 12,
                                    }}
                                />
                            </View>

                            <Spacer size={15} />

                            {/* Tags */}
                            <View style={{ backgroundColor: 'white', padding: 15, borderRadius: 12 }}>
                                <CustomText type="subHeading" style={{ marginBottom: 10 }}>{t("Tags")}</CustomText>
                                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                    <TextInput
                                        placeholder={t("Addtag")}
                                        value={newTag}
                                        onChangeText={setNewTag}
                                        onSubmitEditing={addTag}
                                        style={{
                                            flex: 1,
                                            borderWidth: 1,
                                            borderColor:COLORS.bordercolor,
                                            borderRadius: 8,
                                            padding: 12,
                                            marginRight: 10,
                                        }}
                                    />
                                    <TouchableOpacity onPress={addTag} style={[styles.submit, { paddingHorizontal: 20 }]}>
                                        <CustomText color={COLORS.White}>{t("Add")}</CustomText>
                                    </TouchableOpacity>
                                </View>
                                <FlatList
                                    data={tags}
                                    renderItem={({ item }) => (
                                        <View style={{
                                            backgroundColor: COLORS.appLinear1,
                                            paddingHorizontal: 12,
                                            paddingVertical: 6,
                                            borderRadius: 20,
                                            marginRight: 10,
                                            marginBottom: 8,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }}>
                                            <CustomText color={COLORS.White} type="subTitle">#{item}</CustomText>
                                            <TouchableOpacity onPress={() => removeTag(item)} style={{ marginLeft: 8 }}>
                                                <VectorIcon name="close" size={16} color={COLORS.White} type="MaterialIcons" />
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                />
                            </View>

                            <Spacer size={30} />

                            <TouchableOpacity 
                                style={[styles.submit, { marginBottom: 20 }]} 
                                onPress={submitMediaPost}
                                disabled={loading}
                            >
                                {loading ? (
                                    <VectorIcon name="hourglass-empty" size={20} color={COLORS.White} type="MaterialIcons" />
                                ) : (
                                    <CustomText color={COLORS.White} fontWeight="bold">{t("PostNow")}</CustomText>
                                )}
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </GradientBackground>
            </Modal>
        </GradientBackground>
    );
};

export default AddPost;

