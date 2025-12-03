import React from 'react';
import { Modal, TouchableOpacity, View, StyleSheet } from 'react-native';
import { CustomText } from './CustomText';
import COLORS from '../utils/Colors';

type GenderModalProps = {
  visible: boolean;
  selectedGender: string;
  onSelect: (gender: string) => void;
  onCancel: () => void;
};

const GENDER_OPTIONS = ['male', 'female'];

const GenderModal: React.FC<GenderModalProps> = ({
  visible,
  selectedGender,
  onSelect,
  onCancel,
}) => (
  <Modal
    transparent
    animationType="fade"
    visible={visible}
    onRequestClose={onCancel}
  >
    <View style={styles.overlay}>
      <View style={styles.modal}>
        <CustomText type="subTitle" style={styles.title}>
          Select Gender
        </CustomText>
        {GENDER_OPTIONS.map(option => (
          <TouchableOpacity
            key={option}
            style={[
              styles.option,
              {
                backgroundColor:
                  selectedGender === option
                    ? COLORS.placeholder
                    : COLORS.blue,
              },
            ]}
            onPress={() => onSelect(option)}
          >
            <CustomText
              color={
                selectedGender === option
                  ? COLORS.White
                  : COLORS.black
              }
            >
              {option}
            </CustomText>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          onPress={onCancel}
          style={styles.cancelButton}
        >
          <CustomText color={COLORS.red}>Cancel</CustomText>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modal: {
    backgroundColor: COLORS.White,
    padding: 24,
    borderRadius: 10,
    minWidth: 250,
  },
  title: { marginBottom: 18 },
  option: {
    padding: 12,
    borderRadius: 6,
    marginBottom: 10,
  },
  cancelButton: { alignSelf: 'flex-end', marginTop: 10 },
});

export default GenderModal;
