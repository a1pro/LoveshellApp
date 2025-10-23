import React, { FC } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import COLORS from '../utils/Colors';
import { horizontalScale, verticalScale } from '../utils/Metrics';
import { CustomText } from '../components/CustomText';

type CustomButtonProps = {
  title: string;
  onPress: () => void;
  backgroundColor?: string;
  isLoading?: boolean;
  textColor?: string;
  style?: ViewStyle;
  disabled?: boolean;
  border?: boolean;
  textSize?:
    | 'heading'
    | 'subHeading'
    | 'title'
    | 'subTitle'
    | 'default'
    | 'small'
    | 'extraSmall';
};

const CustomButton: FC<CustomButtonProps> = ({
  title,
  onPress,
  backgroundColor = COLORS.blue,
  textColor = COLORS.White,
  style,
  textSize = 'small',
  disabled = false,
  isLoading = false,
  border = false,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.7}
      style={[
        styles.button,
        {
          backgroundColor: backgroundColor,
          opacity: disabled ? 0.5 : 1,
          borderWidth: border ? 1 : 0,
          borderColor: COLORS.black,
        },
        style,
      ]}
      onPress={onPress}
    >
      {isLoading ? (
        <ActivityIndicator
          style={{ height: verticalScale(20) }}
          color={COLORS.White}
        />
      ) : (
        <CustomText type={textSize} color={textColor} fontFamily="bold">
          {title}
        </CustomText>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    paddingVertical: verticalScale(18),
    paddingHorizontal: horizontalScale(20),
    borderRadius: verticalScale(15),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
