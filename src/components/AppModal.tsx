import React from 'react';
import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import AppStyles from '../styles/AppStyles';
import {AppModalProps} from '../types/types';
import {AppColors} from '../utils/color';
import {hp} from '../utils/constants';
import {size} from '../utils/responsiveFonts';
import GlobalIcon from './GlobalIcon';

const AppModal: React.FC<AppModalProps> = ({visible, setVisible}) => {
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <Pressable
        onPress={() => setVisible(false)}
        style={[
          AppStyles.alignJustifyCenter,
          {
            flex: 1,
          },
        ]}>
        <View style={styles.modalContainer}>
          <GlobalIcon
            library="FontelloIcon"
            name="frame11"
            color={AppColors.red}
            size={hp(6)}
          />
          <View style={styles.titleContainer}>
            <Text style={[AppStyles.titleHead, {fontSize: size.xlg}]}>
              Thankyou
            </Text>
            <Text style={AppStyles.subHeading}>For your Feedback</Text>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

export default AppModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  modalContainer: {
    paddingTop: hp(7),
    paddingBottom: hp(10),
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.white,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
    borderRadius: hp(1),
  },
  titleContainer: {alignItems: 'center'},
  // titleContainer: {alignItems: 'center', marginTop: hp(-1)},
});
