import React, { FC, useState } from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardTypeOptions,
} from 'react-native';
import { CustomText } from './CustomText';
import {
  horizontalScale,
  responsiveFontSize,
  verticalScale,
} from '../utils/Metrics';
import COLORS from '../utils/Colors';
import { getPlatformFont } from '../assets/fonts';
import VectorIcon from './VectorIcon';
import FontAwesome from '@react-native-vector-icons/fontawesome';

type CustomInputProps = {
  placeholder: string;
  type?: 'text' | 'password' | 'search' | 'date';
  onChangeText: (text: string) => void;
  value: string;
  style?: object;
  isFilterIcon?: boolean;
  onFilterPress?: () => void;
  label?: string;
  heigth?: number;
  disabled?: boolean;
  maxDate?: Date;
  onBtnPress?: () => void;
  keyboardType?: KeyboardTypeOptions;
};

const CustomInput: FC<CustomInputProps> = ({
  placeholder,
  onChangeText,
  value,
  style,
  type = 'text',
  label,
  heigth = 56,
  disabled = false,
  keyboardType,

  onBtnPress,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  return (
    <View
      style={[
        style,
        {
          gap: verticalScale(5),
        },
      ]}
    >
      {label && (
        <CustomText
          type="small"
          color={COLORS.black}
          fontWeight={'500'}
          fontFamily="light"
        >
          {label}
        </CustomText>
      )}

      <View
        style={[
          styles.container,
          type === 'search' && { gap: horizontalScale(10) },
        ]}
      >
        <TouchableOpacity
          onPress={onBtnPress}
          activeOpacity={0.9}
          style={[{ flex: 1, height: heigth }]}
          disabled={disabled ? disabled : type !== 'date'}
        >
          <View
            pointerEvents={type === 'date' ? 'none' : 'auto'}
            style={{ flex: 1, opacity: disabled ? 0.7 : 1 }}
          >
            <TextInput
              keyboardType={keyboardType}
              style={[styles.input]} // Input field style
              placeholder={placeholder} // Placeholder text
              placeholderTextColor={COLORS.placeholder} // Placeholder text color
              secureTextEntry={type === 'password' && !isPasswordVisible} // Hide input text for password type if visibility is off
              onChangeText={onChangeText} // Handle text change
              value={value} // Display current value
              editable={disabled ? false : type !== 'date'}
            />
          </View>
        </TouchableOpacity>

        {/* Toggle password visibility for password type */}
        {type === 'password' && (
          <TouchableOpacity
            style={styles.iconContainer} // Style for the icon container
            onPress={togglePasswordVisibility} // Toggle visibility on icon press
          >
            <FontAwesome
              name={isPasswordVisible ? 'eye' : 'eye-slash'}
              size={18}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    paddingHorizontal: horizontalScale(15),
    borderWidth: 1,
    backgroundColor: COLORS.White,
    borderColor: COLORS.inputBorder,
  },
  input: {
    flex: 1,
    fontSize: responsiveFontSize(14),
    color: COLORS.black,
    fontFamily: getPlatformFont('regular'),
  },
  iconContainer: {
    marginLeft: 10,
  },
});
