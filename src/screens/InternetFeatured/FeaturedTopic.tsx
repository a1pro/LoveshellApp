import React, { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import {
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { CustomText } from "../../components/CustomText";
import GradientBackground from "../../components/GradientBackground";
import { styles } from "./style";
import VectorIcon from "../../components/VectorIcon";
import COLORS from "../../utils/Colors";
import Spacer from "../../components/Spacer";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import axios from "axios";
import ENDPOINTS, { API_URL } from "../../APIService/endPoints";

type Props = NativeStackScreenProps<RootStackParamList, "FeaturedTopic">;

interface Topic {
  id: number;
  user_id: number;
  title: string;
  description?: string;
  status?: string;
}

interface Comment {
  id: number;
  user_id: number;
  sender_id: number;
  title_id: number;
  message: string;
  parent_id: number | null;
  created_at: string;
  updated_at: string;
}

interface ApiResponse {
  success?: boolean;
  status?: boolean;
  status_code: number;
  message: string;
  tasks?: Topic[];
  comments?: Comment[];
  comment?: Comment;
}

const FeaturedTopic: React.FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredTopics, setFilteredTopics] = useState<Topic[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [replies, setReplies] = useState<{ [key: number]: Comment[] }>({});
  const [commentsLoading, setCommentsLoading] = useState(false);
  
  // Add comment state
  const [addCommentText, setAddCommentText] = useState("");
  const [addingComment, setAddingComment] = useState(false);
  
  // Reply state
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");
  const [addingReply, setAddingReply] = useState(false);

  useEffect(() => {
    fetchTopics();
  }, []);

  useEffect(() => {
    if (searchQuery === "") {
      setFilteredTopics(topics);
    } else {
      const filtered = topics.filter((topic) =>
        topic.title?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredTopics(filtered);
    }
  }, [searchQuery, topics]);

  const fetchTopics = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("Usertoken");
      if (!token) {
        Toast.show({
          type: "error",
          text1: t("errorTitle") || "Error",
          text2: t("userTokenMissing") || "Token missing",
        });
        return;
      }

      const response = await axios.get<ApiResponse>(
        `${API_URL}${ENDPOINTS.FeaturedTopic}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success || response.data.status) {
        console.log("Fetched topics:", response.data.tasks);
        const topicsData = response.data.tasks || [];
        setTopics(topicsData);
        setFilteredTopics(topicsData);
        if (topicsData.length > 0) {
          setSelectedTopic(topicsData[0]);
          fetchComments(topicsData[0].id);
        }
      }
    } catch (error) {
      console.error("Error fetching topics:", error);
      Toast.show({
        type: "error",
        text1: t("errorTitle") || "Error",
        text2: t("failedToLoadData") || "Failed to load topics",
      });
    } finally {
      setLoading(false);
    }
  };

const fetchComments = async (topicId: number) => {
  console.log("topicId",topicId)
  setCommentsLoading(true);
  try {
    const token = await AsyncStorage.getItem("Usertoken");
    if (!token) return;

    const response = await axios.get<ApiResponse>(
      `${API_URL}${ENDPOINTS.getComments}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          topic_id: topicId
        }
      }
    );

    if (response.data.status || response.data.success) {
      setComments(response.data.comments || []);
    }
  } catch (error) {
    console.error("Error fetching comments:", error);
  } finally {
    setCommentsLoading(false);
  }
};

const fetchReplies = async (topicId: number, commentId: number) => {
  try {
    const token = await AsyncStorage.getItem("Usertoken");
    if (!token) return;

    const response = await axios.get<ApiResponse>(
      `${API_URL}${ENDPOINTS.getcommentReplies}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          title_id: topicId,
          comment_id: commentId
        }
      }
    );

    if (response.data.success) {
      setReplies(prev => ({
        ...prev,
        [commentId]: response.data.comments || []
      }));
    }
  } catch (error) {
    console.error("Error fetching replies:", error);
  }
};


  const addComment = async () => {
    if (!addCommentText.trim() || !selectedTopic) return;

    setAddingComment(true);
    try {
      const token = await AsyncStorage.getItem("Usertoken");
      if (!token) return;

      const formdata = new FormData();
      formdata.append("title_id", selectedTopic.id.toString());
      formdata.append("message", addCommentText.trim());

      const response = await axios.post<ApiResponse>(
        `${API_URL}${ENDPOINTS.addComent}`,
        formdata,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          },
        }
      );

      if (response.data.success) {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: response.data.message || "Comment added successfully",
        });
        setAddCommentText("");
        fetchComments(selectedTopic.id);
      }
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.response?.data?.message || "Failed to add comment",
      });
    } finally {
      setAddingComment(false);
    }
  };

  const addReply = async () => {
    if (!replyText.trim() || !selectedTopic || !replyingTo) return;

    setAddingReply(true);
    try {
      const token = await AsyncStorage.getItem("Usertoken");
      if (!token) return;

      const formdata = new FormData();
      formdata.append("title_id", selectedTopic.id.toString());
      formdata.append("parent_id", replyingTo.toString());
      formdata.append("message", replyText.trim());

      const response = await axios.post<ApiResponse>(
        `${API_URL}${ENDPOINTS.addcommentReply}`,
        formdata,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          },
        }
      );

      if (response.data.success) {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: response.data.message || "Reply added successfully",
        });
        setReplyText("");
        fetchReplies(selectedTopic.id, replyingTo);
        fetchComments(selectedTopic.id);
      }
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.response?.data?.message || "Failed to add reply",
      });
    } finally {
      setAddingReply(false);
    }
  };

  const getColorForTopic = (index: number) => {
    const colors = [
      COLORS.lightGreen,
      COLORS.lightyellow,
      COLORS.lightorange,
      COLORS.lightblue2,
      COLORS.lightGrey,
    ];
    return colors[index % colors.length];
  };

  const handleTopicPress = (topic: Topic) => {
    setSelectedTopic(topic);
    setComments([]); 
    setReplies({});  
    fetchComments(topic.id);
  };

  const renderTopicCard = ({ item, index }: { item: Topic; index: number }) => {
    const topicColor = getColorForTopic(index);
    const displayTitle = item.title || "Untitled Topic";
    
    return (
      <TouchableOpacity
        style={[
          styles.topicCard,
          selectedTopic?.id === item.id && styles.selectedTopicCard,
          { 
            borderColor: topicColor,
            backgroundColor: topicColor,
          }
        ]}
        onPress={() => handleTopicPress(item)}
      >
        <CustomText type="subTitle" fontFamily="semiBold" style={styles.topicCardTitle}>
          {displayTitle.length > 20 ? `${displayTitle.substring(0, 20)}...` : displayTitle}
        </CustomText>
      </TouchableOpacity>
    );
  };

  const renderComment = ({ item }: { item: Comment }) => {
    const repliesList = replies[item.id] || [];

    return (
      <View style={styles.commentContainer}>
        <View style={styles.userInfo}>
          <View style={styles.userAvatar} />
          <View style={styles.userDetails}>
            <CustomText type="subTitle" fontFamily="semiBold" style={styles.userName}>
              User {item.sender_id}
            </CustomText>
            <CustomText type="small" style={styles.commentTime}>
              {new Date(item.created_at).toLocaleDateString()}
            </CustomText>
          </View>
        </View>
        <CustomText type="small" style={styles.commentText}>
          {item.message || "No message"}
        </CustomText>
        
        <TouchableOpacity 
          style={styles.replyButton}
          onPress={() => {
            if (replyingTo === item.id) {
              setReplyingTo(null);
              setReplyText("");
            } else {
              setReplyingTo(item.id);
              fetchReplies(item.title_id, item.id);
              setReplyText("");
            }
          }}
        >
          <CustomText style={styles.replyText}>
            {replyingTo === item.id ? "Cancel" : "Reply"}
          </CustomText>
        </TouchableOpacity>
 
        {repliesList.length > 0 && (
          <View style={styles.repliesContainer}>
            {repliesList.map((reply) => (
              <View key={reply.id} style={styles.replyItem}>
                <CustomText type="small" style={styles.replyText}>
                  ↳ {reply.message} 
                  <CustomText style={styles.replyTime}>
                    {" " + new Date(reply.created_at).toLocaleDateString()}
                  </CustomText>
                </CustomText>
              </View>
            ))}
          </View>
        )}
 
        {replyingTo === item.id && (
          <View style={styles.replyInputContainer}>
            <TextInput
              style={styles.replyInput}
              placeholder={t("writeReply")}
              value={replyText}
              onChangeText={setReplyText}
              multiline
              maxLength={500}
            />
            <TouchableOpacity 
              style={[
                styles.addReplyButton,
                (addingReply || !replyText.trim()) && styles.addReplyButtonDisabled
              ]}
              onPress={addReply}
              disabled={addingReply || !replyText.trim()}
            >
              <VectorIcon 
                name="send" 
                type="MaterialIcons" 
                size={20} 
                color={replyText.trim() && !addingReply ? COLORS.blue : COLORS.grey} 
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  if (loading) {
    return (
      <GradientBackground>
        <View style={[styles.container, styles.centerContainer]}>
          <ActivityIndicator size="large" color={COLORS.blue} />
          <Spacer style={{ height: 16 }} />
          <CustomText style={styles.loadingText}>{t("loadingtopics")}</CustomText>
        </View>
      </GradientBackground>
    );
  }

  return (
    <GradientBackground>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
            <VectorIcon type="MaterialIcons" name="arrow-back-ios" size={22} color={COLORS.White} />
          </TouchableOpacity>
          <CustomText type="heading" fontFamily="semiBold" style={styles.headerTitle}>
            {t('FeaturedTopic') || "Featured Topics"}
          </CustomText>
          <TouchableOpacity style={styles.backIcon} onPress={() => navigation.navigate("HomeScreen")}>
            <VectorIcon type="MaterialIcons" name="home" size={28} color={COLORS.White} />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.formContainer} showsVerticalScrollIndicator={false}>
          <Spacer style={{ height: 20 }} />

          <View style={styles.searchContainer}>
            <VectorIcon name="search" type="MaterialIcons" size={24} color={COLORS.grey} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search here..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          <Spacer style={{ height: 24 }} />

          {/* My Topics */}
          <CustomText type="heading" fontFamily="semiBold" style={styles.sectionTitle}>
            {t("myTopic")}
          </CustomText>
          <FlatList
            data={filteredTopics.slice(0, 5)}
            renderItem={renderTopicCard}
            keyExtractor={(item) => `topic-${item.id}`}
            numColumns={2}
            columnWrapperStyle={styles.topicGrid}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />

          <Spacer style={{ height: 32 }} />
 
          {selectedTopic && (
            <>
              <CustomText type="heading" fontFamily="semiBold" style={styles.sectionTitle}>
                {selectedTopic.title?.substring(0, 30) || selectedTopic.title || "Selected Topic"}...
              </CustomText>
              
              {selectedTopic.description && (
                <>
                  <View style={styles.descriptionCard}>
                    <CustomText type="small" style={styles.descriptionText}>
                      {selectedTopic.description}
                    </CustomText>
                  </View>
                  <Spacer style={{ height: 24 }} />
                </>
              )}
 
              <View style={styles.commentsSection}>
                <View style={styles.commentsHeader}>
                  <CustomText type="heading" fontFamily="semiBold" style={styles.commentsTitle}>
                    {t("comments")} ({comments.length})
                  </CustomText>
                </View>

                {commentsLoading ? (
                  <View style={styles.loadingComments}>
                    <ActivityIndicator size="small" color={COLORS.blue} />
                  </View>
                ) : comments.length === 0 ? (
                  <CustomText style={styles.noComments}>{t("nocommentsyet")}</CustomText>
                ) : (
                  <FlatList
                    data={comments.filter(comment => comment.parent_id === null)}
                    renderItem={renderComment}
                    keyExtractor={(item) => `comment-${item.id}`}
                    scrollEnabled={false}
                    showsVerticalScrollIndicator={false}
                  />
                )} 
 
                <View style={styles.addCommentContainer}>
                  <TextInput
                    style={styles.addCommentInput}
                    placeholder={t("addacomment")}
                    value={addCommentText}
                    onChangeText={setAddCommentText}
                    multiline
                    maxLength={500}
                  />
                  <TouchableOpacity 
                    style={[
                      styles.addCommentButton, 
                      (!addCommentText.trim() || addingComment) && styles.addCommentButtonDisabled
                    ]}
                    onPress={addComment}
                    disabled={!addCommentText.trim() || addingComment}
                  >
                    {addingComment ? (
                      <ActivityIndicator size="small" color={COLORS.blue} />
                    ) : (
                      <VectorIcon 
                        name="send" 
                        type="MaterialIcons" 
                        size={20} 
                        color={addCommentText.trim() ? COLORS.blue : COLORS.grey} 
                      />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </>
          )}

          <Spacer style={{ height: 40 }} />
        </ScrollView>
      </View>
    </GradientBackground>
  );
};

export default FeaturedTopic;
