import React from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import AppButton from './AppButton';
import {AppColors} from '../utils/color';
import AppFonts from '../utils/appFonts';
import {hp} from '../utils/constants';
import {size} from '../utils/responsiveFonts';

type Props = {
  visible: boolean;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
};

const AppConfirmModal: React.FC<Props> = ({
  visible,
  title = 'Are you sure?',
  message = '',
  confirmText = 'Yes',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  loading = false,
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.backdrop}>
        <Pressable style={StyleSheet.absoluteFill} onPress={loading ? undefined : onCancel} />
        <View style={styles.card}>
          <Text style={styles.title}>{title}</Text>
          {!!message && <Text style={styles.message}>{message}</Text>}
          <View style={styles.actions}>
            <AppButton
              title={cancelText}
              onPress={onCancel}
              disabled={loading}
              style={[styles.button, styles.cancelButton]}
              titleStyle={styles.cancelTitle}
            />
            <AppButton
              title={loading ? 'Please wait...' : confirmText}
              onPress={onConfirm}
              disabled={loading}
              leftIcon={
                loading ? <ActivityIndicator color={AppColors.white} size="small" /> : undefined
              }
              style={styles.button}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AppConfirmModal;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: hp(2),
  },
  card: {
    width: '100%',
    backgroundColor: AppColors.white,
    borderRadius: hp(1.5),
    paddingHorizontal: hp(2),
    paddingVertical: hp(2.5),
  },
  title: {
    fontFamily: AppFonts.NunitoSansBold,
    fontSize: size.lg,
    color: AppColors.black,
    marginBottom: hp(1),
    textAlign: 'center',
  },
  message: {
    fontFamily: AppFonts.NunitoSansRegular,
    fontSize: size.md,
    color: AppColors.lightBlack,
    textAlign: 'center',
    marginBottom: hp(2),
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: hp(1),
  },
  button: {
    flex: 1,
    backgroundColor: AppColors.black,
  },
  cancelButton: {
    backgroundColor: AppColors.lightGrey,
  },
  cancelTitle: {
    color: AppColors.textLightGrey,
  },
});

