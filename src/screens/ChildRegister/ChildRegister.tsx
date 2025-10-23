import React, { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import styles from './style';
import GradientBackground from '../../components/GradientBackground';
import { Alert, Platform, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomText } from '../../components/CustomText';
import Spacer from '../../components/Spacer';
import CustomInput from '../../components/CustomInput';
import COLORS from '../../utils/Colors';
import CustomButton from '../../components/CustomButton';
import { KeyboardAvoidingContainer } from '../../components/KeyboardAvoidingComponent';
import VectorIcon from '../../components/VectorIcon';
import DatePicker from 'react-native-date-picker';
import Toast from 'react-native-toast-message';

type Props = NativeStackScreenProps<RootStackParamList, 'ChildRegister'>;

const ChildRegister: React.FC<Props> = ({ navigation }) => {
  const [open, setOpen] = useState(false);
  const [activeChildIndex, setActiveChildIndex] = useState<number | null>(null);
  const [children, setChildren] = useState([
    {
      id: 1,
      name: '',
      email: '',
      date: new Date(),
      sex: 'Male',
      allergies: 'No',
      weight: '',
      weightUnit: 'kg',
      height: '',
      heightUnit: 'cm',
    },
  ]);

  type ChildField = 'name' | 'email';

  const handleInputChange = (
    index: number,
    fieldName: ChildField,
    value: string,
  ) => {
    setChildren(prev => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [fieldName]: value,
      };
      return updated;
    });
  };

  const handleDateChange = (index: number, selectedDate: Date) => {
    setChildren(prev => {
      const updated = [...prev];
      updated[index].date = selectedDate;
      return updated;
    });
  };

  const addChild = () => {
    if (children.length >= 6) {
      if (Platform.OS === 'android') {
        Toast.show({
          type: 'error',
          text1: 'You can add only 6 child',
        });
      } else {
        Alert.alert('You can add only 6 child');
      }
      return;
    }
    const newId = children.length + 1;
    setChildren(prev => [
      ...prev,
      {
        id: newId,
        name: '',
        email: '',
        date: new Date(),
        sex: 'Male',
        allergies: 'No',
        weight: '',
        weightUnit: 'kg',
        height: '',
        heightUnit: 'cm',
      },
    ]);
  };

  const removeChild = (id: number) => {
    setChildren(prev => prev.filter(child => child.id !== id));
  };

  return (
    <GradientBackground>
      <KeyboardAvoidingContainer>
        <SafeAreaView style={styles.container}>
          <Spacer />
          <VectorIcon
            type="MaterialIcons"
            name="arrow-back"
            onPress={() => navigation.goBack()}
          />
          <CustomText type="subHeading" fontFamily="bold" style={styles.txt}>
            CHILD REGISTRATION
          </CustomText>

          {children.map((child, index) => (
            <View key={child.id} style={styles.viewCon}>
              <View style={styles.deleteview}>
                <CustomText
                  type="subTitle"
                  fontFamily="bold"
                  style={[styles.txt, { textAlign: 'left' }]}
                >
                  Child {index + 1}
                </CustomText>
                {children.length > 1 && (
                  <TouchableOpacity onPress={() => removeChild(child.id)}>
                    <VectorIcon
                      type="MaterialIcons"
                      name="remove-circle"
                      size={24}
                      color={COLORS.red}
                    />
                  </TouchableOpacity>
                )}
              </View>
              <Spacer />

              <View style={{ gap: 10 }}>
                <CustomInput
                  label="Name"
                  placeholder="Name"
                  onChangeText={value =>
                    handleInputChange(index, 'name', value)
                  }
                  value={child.name}
                />

                <CustomText
                  type="small"
                  color={COLORS.black}
                  fontWeight={'500'}
                  fontFamily="light"
                >
                  Date of Birth
                </CustomText>

                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => {
                    setActiveChildIndex(index);
                    setOpen(true);
                  }}
                >
                  <CustomText
                    type="small"
                    color={COLORS.black}
                    fontWeight={'500'}
                    fontFamily="light"
                  >
                    {child.date
                      ? child.date.toLocaleDateString()
                      : 'Date of Birth'}
                  </CustomText>
                  <VectorIcon
                    type="MaterialIcons"
                    name="date-range"
                    size={20}
                    color={COLORS.shottxt}
                  />
                </TouchableOpacity>

                <View
                  style={{
                    flexDirection: 'row',
                    gap: 10,
                    alignItems: 'center',
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <CustomInput
                      label="Weight"
                      placeholder="W"
                      keyboardType="numeric"
                      onChangeText={value => {
                        const updated = [...children];
                        updated[index].weight = value;
                        setChildren(updated);
                      }}
                      value={child.weight}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <CustomInput
                      disabled
                      label="Unit"
                      placeholder="U"
                      onChangeText={value => {
                        const updated = [...children];
                        updated[index].weightUnit = value;
                        setChildren(updated);
                      }}
                      value={child.weightUnit}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <CustomInput
                      label="Height"
                      placeholder="H"
                      keyboardType="numeric"
                      onChangeText={value => {
                        const updated = [...children];
                        updated[index].height = value;
                        setChildren(updated);
                      }}
                      value={child.height}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <CustomInput
                      disabled
                      label="Unit"
                      placeholder="U"
                      onChangeText={value => {
                        const updated = [...children];
                        updated[index].heightUnit = value;
                        setChildren(updated);
                      }}
                      value={child.heightUnit}
                    />
                  </View>
                </View>
              </View>
            </View>
          ))}
          <Spacer size={20} />

          <CustomButton onPress={() => {}} title="Continue" />
          <Spacer size={10} />

          <CustomText
            onPress={addChild}
            type="small"
            color={COLORS.black}
            style={{ textAlign: 'center' }}
          >
            Click to add more
          </CustomText>
          <Spacer size={20} />
          <DatePicker
            modal
            mode="date"
            open={open}
            date={
              activeChildIndex !== null
                ? children[activeChildIndex].date
                : new Date()
            }
            onConfirm={date => {
              if (activeChildIndex !== null)
                handleDateChange(activeChildIndex, date);
              setOpen(false);
              setActiveChildIndex(null);
            }}
            onCancel={() => {
              setOpen(false);
              setActiveChildIndex(null);
            }}
          />
        </SafeAreaView>
      </KeyboardAvoidingContainer>
    </GradientBackground>
  );
};

export default ChildRegister;
