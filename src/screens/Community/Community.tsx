import React, { useEffect, useState, useCallback } from "react";
import { 
  View, 
  TouchableOpacity, 
  Image, 
  ActivityIndicator, 
  FlatList, 
  Alert, 
  TextInput, 
  KeyboardAvoidingView, 
  Modal, 
  Platform,
  ScrollView,
  SafeAreaView 
} from "react-native";
import { CustomText } from "../../components/CustomText";
import GradientBackground from "../../components/GradientBackground";
import styles from "./style";
import VectorIcon from "../../components/VectorIcon";
import COLORS from "../../utils/Colors";
import { useTranslation } from "react-i18next";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ENDPOINTS, { API_URL, IMAGE_URL } from "../../APIService/endPoints";
import axios from "axios";
import moment from "moment";
import Spacer from "../../components/Spacer";
import IMAGES from "../../assets/images";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";

type Props = NativeStackScreenProps<RootStackParamList, "Community">;

interface Comment {
  id: number;
  message: string;
  created_at: string;
  sender: {
    id: number;
    username: string;
    email: string;
    profile_image?: string; // Add profile_image field
  };
  replies: Comment[];
}

interface Post {
  id: number;
  title: string | null;
  content: string | null;
  tags: string[];
  content_type: 'image' | 'video' | 'text';
  created_at: string;
  updated_at: string;
  views: number;
  likes_count: number;
  is_liked_by_current_user: boolean;
  comment_count: number;
  comments: Comment[];
  user: {
    id: number;
    username: string;
    email: string;
    profile_image?: string;
  };
  images: Array<{ id: number; image_url: string; order: string }>;
  videos: Array<any>;
  users_who_liked: Array<any>;
}

const Community: React.FC<Props> = ({ navigation }) => {
  const [userName, setUserName] = useState();
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [commentLoading, setCommentLoading] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [userData, setUserData] = useState<{ username: string } | null>(null);
  const [selectedPostComments, setSelectedPostComments] = useState<Comment[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [replyingTo, setReplyingTo] = useState<{ id: number; username: string } | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    fetchPosts();
  }, []);

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
        `${API_URL}${ENDPOINTS.community}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      if (response?.data?.success) {
        setPosts(response.data.data);
        console.log("Posts loaded:", response?.data?.data);
      } else {
        console.log("Failed to load posts");
        Toast.show({
          type: 'error',
          text1: t("errorTitle"),
          text2: "Failed to load posts"
        });
      }
    } catch (err: any) {
      console.log("Fetch posts error:", err);
      Toast.show({
        type: 'error',
        text1: t("errorTitle"),
        text2: err.message || "Network error"
      });
    } finally {
      setLoading(false);
    }
  };

  const openCommentModal = (postId: string, post: Post) => {
    setSelectedPostId(postId);
    setSelectedPost(post);
    setSelectedPostComments(post.comments || []);
    setShowCommentModal(true);
    setReplyingTo(null);
  };

  const submitComment = async () => {
    if (!commentText.trim() || !selectedPostId) {
      Toast.show({
        type: 'error',
        text1:t("errorTitle"),
        text2: t("writeComment")
      });
      return;
    }

    try {
      setCommentLoading(true);
      const token = await AsyncStorage.getItem('Usertoken');
      const payload: any = {
        message: commentText.trim(),
        post_id: selectedPostId
      };

      if (replyingTo) {
        payload.parent_comment_id = replyingTo.id;
      }

      const response = await axios.post(
        `${API_URL}${ENDPOINTS.addcomment}`,
        payload,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        }
      );

      console.log(response);

      if (response.data.success || response.data.status_code === 200) {
        Toast.show({
          type: 'success',
          text1:t("successTitle"),
          text2: replyingTo ? t("replyposted!") :t("commentSuccess ")
        });
        setCommentText("");
        setReplyingTo(null);
        
        fetchPosts();
        if (selectedPost) {
          const updatedPost = await fetchPostDetails(selectedPost.id.toString());
          if (updatedPost) {
            setSelectedPostComments(updatedPost.comments || []);
          }
        }
      }
    } catch (error: any) {
      console.log("Comment error:", error);
      Toast.show({
        type: 'error',
        text1:t("errorTitle"),
        text2:t("faildpost")
      });
    } finally {
      setCommentLoading(false);
    }
  };

  const fetchPostDetails = async (postId: string) => {
    try {
      const token = await AsyncStorage.getItem('Usertoken');
      const response = await axios.get(
        `${API_URL}${ENDPOINTS.community}/${postId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      if (response?.data?.success) {
        return response.data.data;
      }
    } catch (error) {
      console.log("Error fetching post details:", error);
    }
    return null;
  };

  const handleLikeToggle = async (postId: number) => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('Usertoken');
      if (!token) {
        Toast.show({
          type: 'error',
          text1:t("errorTitle"),
          text2:t("userTokenMissing")
        });
        return;
      }

      const response = await axios.post(
        `${API_URL}${ENDPOINTS.addlike}`,
        { post_id: postId },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      
      if (response?.data.status_code === 200) {
        fetchPosts();
        if (selectedPost && selectedPost.id === postId) {
          const updatedPost = await fetchPostDetails(postId.toString());
          if (updatedPost) {
            setSelectedPost(updatedPost);
          }
        }
      }
    } catch (error: any) {
      console.log("Like error:", error);
      Toast.show({
        type: 'error',
        text1:t("errorTitle"),
        text2:t("faildlike") 
      });
    } finally { 
      setLoading(false);
    }
  };

  const renderCommentItem = ({ item, level = 0 }: { item: Comment; level?: number }) => {
    const marginLeft = level * 20;
    
    return (
      <View style={[styles.commentItem, { marginLeft }]}>
        <View style={styles.commentHeader}>
          <View style={styles.commentUserImage}>
            <Image
              source={
                item.sender.profile_image 
                  ? { uri: `${IMAGE_URL}${item.sender.profile_image}` }
                  : IMAGES.dummyuser
              }
              style={styles.commentProfileImage}
            />
          </View>
          <View style={styles.commentUserInfo}>
            <CustomText type="small" fontFamily="bold" style={{ color: COLORS.blue }}>
              {item.sender.username}
            </CustomText>
            <CustomText type="extraSmall" style={{ color: COLORS.darkgrey, marginLeft: 8 }}>
              {moment(item.created_at).fromNow()}
            </CustomText>
          </View>
        </View>
        <View style={styles.commentTextContainer}>
          <CustomText type="small" style={styles.commentText}>
            {item.message}
          </CustomText>
        </View>
        <View style={styles.commentActions}>
          <TouchableOpacity
            onPress={() => setReplyingTo({ id: item.id, username: item.sender.username })}
            style={styles.replyButton}
          >
            <VectorIcon 
              name="reply" 
              size={14} 
              color={COLORS.blue} 
              type="MaterialIcons" 
            />
            <CustomText type="extraSmall" style={{ color: COLORS.blue, marginLeft: 5 }}>
             {t("reply")}
            </CustomText>
          </TouchableOpacity>
        </View>
        {item.replies && item.replies.length > 0 && (
          <View style={styles.repliesContainer}>
            {item.replies.map((reply) => (
              <View key={reply.id}>
                {renderCommentItem({ item: reply, level: level + 1 })}
              </View>
            ))}
          </View>
        )}
      </View>
    );
  };

  const renderMedia = (item: Post) => {
    if (item.content_type === 'video' && item.images?.[0]) {
      return (
        <View style={[styles.cardIcon, { position: 'relative' }]}>
          <Image source={{ uri: `${IMAGE_URL}${item.images[0].image_url}` }} style={styles.cardIcon} />
          <View style={{
            position: 'absolute',
            top: 10,
            left: 10,
            backgroundColor: COLORS.black,
            padding: 5,
            borderRadius: 15
          }}>
            <VectorIcon name="play-arrow" size={20} color={COLORS.White} type="MaterialIcons" />
          </View>
        </View>
      );
    }

    if (item.images?.[0]) {
      return <Image source={{ uri: `${IMAGE_URL}${item.images[0].image_url}` }} style={styles.cardIcon} />;
    }

    return (
      <View style={[styles.cardIcon, { backgroundColor: COLORS.grey, justifyContent: 'center', alignItems: 'center' }]}>
        <VectorIcon name="image" size={40} color={COLORS.White} type="MaterialIcons" />
      </View>
    );
  };

  const renderPost = ({ item }: { item: Post }) => (
    <View style={styles.gridContainer}>
      <View style={styles.userdetaisl}>
        <TouchableOpacity>
          <Image
            style={styles.profileimg}
            source={IMAGES.dummyuser}
          />
        </TouchableOpacity>
        <View style={styles.username}>
          <CustomText type="subTitle">{item.user.username}</CustomText>
          <CustomText type="extraSmall">{moment(item.created_at).format("MMM Do YY")}</CustomText>
        </View>
      </View>

      <TouchableOpacity style={styles.card}>
        {renderMedia(item)}
      </TouchableOpacity>

      {item.content && (
        <CustomText style={{ marginTop: 10, marginHorizontal: 5 }}>{item.content}</CustomText>
      )}

      <View style={styles.likeshareRow}>
        <TouchableOpacity disabled={loading} style={styles.lcs} onPress={() => handleLikeToggle(item.id)}>
          <VectorIcon
            type="FontAwesome"
            name={item?.is_liked_by_current_user ? "heart" : "heart-o"}
            size={25}
            color={item?.is_liked_by_current_user ? "red" : "gray"}
          />
          <CustomText style={styles.count}>{item?.likes_count}</CustomText>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.lcs}
          onPress={() => openCommentModal(item.id.toString(), item)}
        >
          <VectorIcon
            type="FontAwesome"
            name="comment-o"
            size={20}
            color={COLORS.grey}
          />
          <CustomText style={styles.count}>{item.comment_count}</CustomText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.lcs}>
          <VectorIcon
            type="FontAwesome"
            name="share"
            size={20}
            color={COLORS.grey}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading && posts.length === 0) {
    return (
      <GradientBackground>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.blue} />
          <CustomText style={styles.loadingText}>{t("loading")}...</CustomText>
        </View>
      </GradientBackground>
    );
  }

  return (
    <GradientBackground>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
            <VectorIcon name="arrow-back-ios" type="MaterialIcons" size={22} color={COLORS.White} />
          </TouchableOpacity>

          <View>
            <CustomText type="subHeading" fontFamily="semiBold" style={styles.helloTxt}>
              {userData?.username}
            </CustomText>
            <CustomText type="small" fontFamily="semiBold">
              {t("Where Mothers Share , Learn & Support")}
            </CustomText>
          </View>

          <TouchableOpacity style={styles.backIcon} onPress={() => navigation.navigate("HomeScreen")}>
            <VectorIcon type="MaterialIcons" name="home" size={28} color={COLORS.White} />
          </TouchableOpacity>
        </View>

        <Spacer size={15} />

        <FlatList
          data={posts}
          keyExtractor={item => item.id.toString()}
          renderItem={renderPost}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('ViewAllPost')}>
        <VectorIcon type="MaterialIcons" name="add" size={30} color={COLORS.White} />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showCommentModal}
        onRequestClose={() => {
          setShowCommentModal(false);
          setSelectedPostId(null);
          setSelectedPost(null);
          setCommentText("");
          setReplyingTo(null);
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <View style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            justifyContent: 'flex-end'
          }}>
            <View style={{
              backgroundColor: COLORS.White,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              height: '70%', 
              maxHeight: '70%',
            }}>
              <View style={styles.modalHeader}>
                <View style={{ width: 30 }} />
                <CustomText type="subTitle" fontFamily="bold" style={{ color: COLORS.blue }}>
                  {t("comments")}({selectedPostComments.length})
                </CustomText>
                <TouchableOpacity
                  onPress={() => {
                    setShowCommentModal(false);
                    setSelectedPostId(null);
                    setSelectedPost(null);
                    setCommentText("");
                    setReplyingTo(null);
                  }}
                  style={styles.closeButton}
                >
                  <VectorIcon name="close" size={24} color={COLORS.grey} type="MaterialIcons" />
                </TouchableOpacity>
              </View>
              {selectedPostComments.length > 0 ? (
                <FlatList
                  data={selectedPostComments}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => renderCommentItem({ item })}
                  contentContainerStyle={styles.commentsList}
                  showsVerticalScrollIndicator={false}
                />
              ) : (
                <View style={styles.noCommentsContainer}>
                  <VectorIcon 
                    name="comment-outline" 
                    type="MaterialCommunityIcons" 
                    size={60} 
                    color={COLORS.lightGrey} 
                  />
                  <CustomText type="small" style={{ color: COLORS.darkgrey, marginTop: 10 }}>
                    {t("noComment")}
                  </CustomText>
                </View>
              )}
              {replyingTo && (
                <View style={styles.replyingToContainer}>
                  <View style={styles.replyingToContent}>
                    <CustomText type="extraSmall" style={{ color: COLORS.blue }}>
                      {t("replyto")} @{replyingTo.username}
                    </CustomText>
                    <TouchableOpacity onPress={() => setReplyingTo(null)}>
                      <VectorIcon name="close" size={16} color={COLORS.grey} type="MaterialIcons" />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              <View style={styles.commentInputContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                  <TextInput
                    style={styles.commentInput}
                    placeholder={replyingTo ? `Reply to @${replyingTo.username}...` : "Add a comment..."}
                    placeholderTextColor={COLORS.placeholder}
                    value={commentText}
                    onChangeText={setCommentText}
                    multiline
                    maxLength={500}
                  />
                  <TouchableOpacity
                    style={[
                      styles.postButton,
                      {
                        backgroundColor: commentText.trim() ? COLORS.appLinear2 : COLORS.lightGrey,
                        opacity: commentLoading ? 0.5 : 1
                      }
                    ]}
                    onPress={submitComment}
                    disabled={commentLoading || !commentText.trim()}
                  >
                    {commentLoading ? (
                      <ActivityIndicator size="small" color={COLORS.White} />
                    ) : (
                      <VectorIcon 
                        name="send" 
                        size={20} 
                        color={COLORS.White} 
                        type="MaterialIcons" 
                      />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </GradientBackground>
  );
};

export default Community;