import React, { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from '../../types';
import styles from './style';
import GradientBackground from '../../components/GradientBackground';
import { KeyboardAvoidingContainer } from '../../components/KeyboardAvoidingComponent';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomText } from '../../components/CustomText';
import Spacer from '../../components/Spacer';
import IMAGES from '../../assets/images';
import VectorIcon from '../../components/VectorIcon';
import COLORS from '../../utils/Colors';
import CustomButton from '../../components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../../i18n';
import { useTranslation } from 'react-i18next';
type Props = NativeStackScreenProps<RootStackParamList, 'SelectLanguages'>;

const languageOptions = [
  { id: '1', label: 'Portuguese', image: IMAGES.potig },
  { id: '2', label: 'English', image: IMAGES.eng },
  { id: '3', label: 'Spanish', image: IMAGES.spanish },
  { id: '4', label: 'French', image: IMAGES.french },
  { id: '5', label: 'Italian', image: IMAGES.italy },
];

const SelectLanguages: React.FC<Props> = ({ navigation }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const { t } = useTranslation();

  const onSave = async () => {
    navigation.navigate('Login');
    if (selectedLanguage) {
      await AsyncStorage.setItem('selectedLanguage', selectedLanguage);
      i18n.changeLanguage(selectedLanguage);
      navigation.navigate('Login');
    }
  };

  const renderItem = ({
    item,
  }: {
    item: { id: string; label: string; image: any };
  }) => (
    <TouchableOpacity
      style={styles.btns}
      onPress={() => setSelectedLanguage(item.label)}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <Image
          source={item.image}
          resizeMode="contain"
          style={{ width: 30, height: 30 }}
        />
        <CustomText>{item.label}</CustomText>
      </View>
      <VectorIcon
        type="MaterialIcons"
        name={
          selectedLanguage === item.label
            ? 'check-box'
            : 'check-box-outline-blank'
        }
        color={
          selectedLanguage === item.label ? COLORS.blue : COLORS.placeholder
        }
      />
    </TouchableOpacity>
  );

  return (
    <GradientBackground>
      <KeyboardAvoidingContainer>
        <SafeAreaView style={styles.container}>
          <Spacer size={40} />
          <CustomText type="subHeading" fontFamily="bold" style={styles.txt}>
            {t('select_language')}
          </CustomText>
          <View style={styles.viewCon}>
            <Spacer size={15} />
            <FlatList
              data={languageOptions}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
            <Spacer size={15} />
            <CustomButton onPress={onSave} title="Saved" />
          </View>
        </SafeAreaView>
      </KeyboardAvoidingContainer>
    </GradientBackground>
  );
};

export default SelectLanguages;
